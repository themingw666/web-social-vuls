import {PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import ogs from 'open-graph-scraper';
import moment from 'moment-timezone';
import axios from 'axios'
import mammoth from 'mammoth'
import mime from 'mime-types'
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs/promises'

const getLastestId = async function() {
    const LastestId = await prisma.post.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
    if (LastestId.length > 0) {
      return LastestId[0].id;
    } else {
      return 1;
    }
}

/*const getLastestId = async function() {
    const LastestId = await prisma.post.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
    if (LastestId.length > 0) {
      return LastestId[0].id;
    } else {
      return 1;
    }
}*/

const getHomePage = async (req,res) => {
    try {
        //data status have comment
        let data1 = await prisma.$queryRaw`
        SELECT * FROM \"post\" INNER JOIN \"user_info\" ON post.authorid=user_info.userid WHERE viewingobject='Public' ORDER BY post.id DESC`
        
        //data status no comment (handle XSS vul)
        let data4 = await prisma.$queryRaw`
        SELECT id FROM \"post\" INNER JOIN \"user_info\" ON post.authorid=user_info.userid WHERE viewingobject='Public' ORDER BY post.id DESC`
        
        //my data (name + avatar)
        let data2 = await prisma.$queryRaw`SELECT * FROM \"user_info\" WHERE userid=${req.decoded.id}`
        
        //code fetch comment data
        for (let i = 0; i < data1.length; ++i) {
            //data3 is comment (add data3 to data1)
            let data3 = await prisma.$queryRaw`
            SELECT * FROM "post_comment" INNER JOIN "user_info" ON post_comment.authorid=user_info.userid WHERE postid=${data1[i].id} ORDER BY commentid ASC`
            if (data3[0]){
                data1[i].comment = data3
            }
        }
        //code fetch document data
        for (let i = 0; i < data1.length; ++i) {
            let data3 = await prisma.$queryRaw`
            SELECT * FROM "document" INNER JOIN "post" ON document.postid=post.id WHERE postid=${data1[i].id} ORDER BY documentid ASC`
            if (data3[0]){
                data1[i].document = data3
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
        return res.render('feed', {data1, data2: data2[0], data4})
        
      } catch (error) {
        console.error("Error: ", error.message);
        return res.status(500).send('Internal Server Error');
    }
}

const handleHome = async (req,res) =>{
    try {
        const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SSRF'`
        const content = await req.body.contentstatus
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const urls = content.match(urlRegex);
        let url = 'None', html6
        let description = "No description available", view_image = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
        if (urls && urls.length > 0) {
            url = urls[0]
            function isValidUrl(url) {
                const validUrlRegex = /(https?:\/\/[^\s]+)/g
                if (!validUrlRegex.test(url)) {
                  return false;
                }
                try {
                  const parsedUrl = new URL(url);
                  const isLocalhost = parsedUrl.hostname === 'localhost';
                  const isLocalIP = /^127\.\d+\.\d+\.\d+$/g.test(parsedUrl.hostname);
                  return !(isLocalhost || isLocalIP);
                } catch (error) {
                  return false;
                }
            }
            if (!isValidUrl(url)) {
                return res.status(500).send('Internal Server Error');
            }
            if (setting.status !== 'Hard') {
                let locationHeader
                await axios.get(url, { maxRedirects: 0 })
                    .then((response) => {
                        locationHeader = response.headers.location
                    })
                    .catch((error) => {
                        if (error.response) {
                            locationHeader = error.response.headers.location
                        } else {
                            console.error('Error:', error.message);
                        }
                    });
                if (locationHeader && !isValidUrl(locationHeader)) {
                    return res.status(500).send('Internal Server Error');
                }
            }
            try {
                const { result, html } = await ogs({ url });
                const { ogImage, ogDescription } = result
                html6 = html
                description = ogDescription
                view_image = ogImage[0].url
            } catch (error) {
                console.error("Error: ", error.message);
            }
        }
        const currentTime = moment().toISOString()
        const LastestId = await getLastestId() + 1

        //document file
        let document_data = null, document_name = null, document_ext = null, document_filename = "None"
        
        const [setting1] = await prisma.$queryRaw`Select status from vulnerable where name='OS Command Injection'`
        //os command
        if (setting1.status === 'Easy' || setting.status === 'Medium') {
            if (req.files['docfile']) {
                const file = req.files['docfile'][0]
                document_filename = file.filename
                document_name = file.originalname
                document_ext = mime.extension(file.mimetype)
                if (document_ext === 'txt' || document_ext === 'xml') {
                    document_data = "None"
                } 
                else if (document_ext === 'doc' || document_ext === 'docx') {
                    const path6 = path.join(__dirname, '../../uploads', document_filename)
                    document_data = "None"
                    document_data = await mammoth.extractRawText({ path: path6 })
                    document_data = document_data.value
                    await fs.writeFile(path6, document_data)
                    document_data = "None"
                }
            }
        }
        else {
            if (req.files['docfile']) {
                const file = req.files['docfile'][0]
                document_name = file.originalname
                document_ext = mime.extension(file.mimetype)
                if (document_ext === 'txt' || document_ext === 'xml') {
                    document_data = file.buffer.toString('utf-8')
                } 
                else if (document_ext === 'doc' || document_ext === 'docx') {
                    document_data = await mammoth.extractRawText({ buffer: file.buffer })
                    document_data = document_data.value
                }
            }
        }
        
        await prisma.$queryRaw`INSERT INTO \"post\" (id, authorid, content, create_at, feeling, checkin, image, video, viewingobject, url, view_image, description) 
        VALUES (${LastestId}, ${req.decoded.id}, ${content}, ${currentTime}, 'None', 'None', 'None', 'None', 'Public', ${url}, ${view_image}, ${description});`
        await prisma.$queryRaw`INSERT INTO \"document\" (postid, document_name, document_data, document_ext, document_filename)
        VALUES (${LastestId}, ${document_name}, ${document_data}, ${document_ext}, ${document_filename});`
        if (setting.status === 'Hard') {
            return res.send(html6);
        }

    } catch (error) {
        //console.error("Error: ", error.message);
        return res.status(500).send('Internal Server Error');
    }
}

export default {getHomePage, handleHome}