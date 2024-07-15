import { prisma } from '../config/prisma.js';
import pug from 'pug';
import libxmljs from 'libxmljs'
import { XMLParser } from 'fast-xml-parser';

const getStatusPage = async (req,res) => {
    const { id } = req.query
    if (!id) {
        return res.render('timelineerror', {data: "Missing id parameter"})
    }
    const id1 = Number(id)
    if (isNaN(id1))
        return res.render('timelineerror', {data: "id is not valid"})

    try {
        const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SSTI'`

        //data status have comment
        let data1 = await prisma.$queryRaw`
        SELECT * FROM \"post\" INNER JOIN \"user_info\" ON post.authorid=user_info.userid WHERE post.id=${id1}` 
        
        //data status no comment (handle XSS vul)
        let data4 = await prisma.$queryRaw`
        SELECT id FROM \"post\" INNER JOIN \"user_info\" ON post.authorid=user_info.userid WHERE post.id=${id1}` 
        
        //my data (name + avatar)
        let data2 = await prisma.$queryRaw`SELECT * FROM \"user_info\" WHERE userid=${req.decoded.id}`
        
        //code fetch comment data
        for (let i = 0; i < data1.length; ++i) {
            //data3 is comment (add data3 to data1)
            let data3 = await prisma.$queryRaw`
            SELECT * FROM "post_comment" INNER JOIN "user_info" ON post_comment.authorid=user_info.userid WHERE postid=${data1[i].id} ORDER BY commentid ASC`
            if (data3[0]) {
                data1[i].comment = data3
                if (setting.status === 'Medium'){
                    for (let j = 0; j < data3.length; ++j) {
                        try {
                            //code vul SSTI in post comment
                            data3[j].content = pug.render(`|${data3[j].content}`)
                        } catch (error) {
                        }
                    }
                }
            }
        }

        //handle time
        const now = new Date()
        for (let i = 0; i < data1.length; ++i) {
            const specificTime = new Date(data1[i].create_at);
            const diffInSeconds = Math.floor((now - specificTime) / 1000);
            const seconds = diffInSeconds % 60;
            const minutes = Math.floor(diffInSeconds / 60) % 60;
            const hours = Math.floor(diffInSeconds / (60 * 60)) % 24;
            const days = Math.floor(diffInSeconds / (60 * 60 * 24));
            if (days > 0) {
                data1[i].post_time = `${days} days ago`;
            }
            else if (hours > 0) {
                data1[i].post_time = `${hours} hours ago`;
            }
            else if (minutes > 0) {
                data1[i].post_time = `${minutes} minutes ago`;
            }
            else {
                data1[i].post_time = `${seconds} seconds ago`;
            }
        }
        if (setting.status === 'Medium'){
            //Have vul, after commenting will refresh the page (statuspost1)
            return res.render('statuspost1', {data1, data2: data2[0], data4})
        }
        else {
            return res.render('statuspost', {data1, data2: data2[0], data4})
        }
        
    } catch (error) {
        //console.error("Error: ", error.message);
        return res.render('timelineerror', {data: "Status not found"})
    }
}

const documentfile = async (req,res) => {
    const { id } = req.query
    if (!id) {
        return res.render('timelineerror', {data: "Missing id parameter"})
    }
    const id1 = Number(id)
    if (isNaN(id1))
        return res.render('timelineerror', {data: "id is not valid"})

    try {
        const result = await prisma.post.findUnique({
            where: {
            id: id1,
            },
        })
        if (result === null)
            next()

        //xxe vul
        try {
            let data
            const ext = result.document_name.split('.').pop().toLowerCase();
            if (ext === 'xml') {
                const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='XXE'`
                if (setting.status === 'Easy' || setting.status === 'Medium' ){
                    const xmlDoc = libxmljs.parseXml(result.document_data, {
                        replaceEntities: true,  
                        dtdload: true 
                    });
                    data = xmlDoc.toString()
                }
                else {
                    const options = {
                        ignoreDTD: true,
                        ignoreEntityReferences: true,
                        entityProcessors: {
                            generalEntity: { maxRepetition: 10 },
                            parameterEntity: { maxRepetition: 10 }
                        }
                    };
                    const parser = new XMLParser(options);
                    const jsonObj = await parser.parse(result.document_data);
                    data = JSON.stringify(jsonObj, null, 2)
                }
            }
            else {
                data = result.document_data
            }
            return res.status(200).send(data);

        } catch (parseError) {
            return res.status(500).send('Error parsing XML file.');
        }

    } catch (error) {
        return res.render('timelineerror', {data: "File not found"})
    }
}

export default {getStatusPage, documentfile}