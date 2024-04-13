
import db from "../config/database.js"

// prisma

/*
const search = async (req,res) => {
    const obj = req.query
    console.log(obj.name);
    const users = await prisma.$queryRaw`SELECT firstname, lastname from "User_info" WHERE lastname = ${obj.name}`
    res.json(users)
}
*/

// pg

var users = [
    {firstname : "Đặng",lastname :"Khánh",university:"KMA",live:"Hà Nội",job:"Sinh viên",role:0,userid:1},
    {firstname : "Dương",lastname :"Hào",university:"PTIT",live:"Hà Nội",job:"Sinh viên",role:0,userid:2},
    {firstname : "Nguyễn",lastname :"Trọng" ,university:"KMA",live:"Hà Nội",job:"Sinh viên",role:0,userid:5},
    {firstname : "Nguyễn",lastname :"Minh",university:"Chăn rau ",live:"Hà Nội",job:"Sinh viên",role:0,userid:3},
    {firstname : "Đặng ",lastname :"Phúc",university:"FPTU",live:"Hà Nội",job:"Sinh viên",role:0,userid:4}
];

const search = async (req, res) => {

    const obj = req.query

    var chr = ["'", "-", '"', "union", "select", "drop"]
    let kiemtra = true
    for(let i = 0; i < chr.length; i++)
    {
        let check = obj.name.indexOf(chr[i])
        if(check != -1) 
        {
            kiemtra = false
            break
        }
    }

    if(!kiemtra){
        res.send("Error Input!!!")
    }
    else{
        const query = `SELECT firstname, lastname, university, live, job FROM public."user_info" where lastname LIKE '%${obj.name}%'`

        const findUser = await db.Client.query(query, (err, result) => {
            if(err) console.error("Error!")
            else{
                let arrUser = result.rows

                var fUser = users.filter( (user) => {
                    return (user.lastname).toLowerCase().indexOf(obj.name.toLowerCase()) !== -1
                })

                if(obj.name != '')
                {
                    console.log(fUser)
                    res.send(fUser)
                }
            }
            
        })
    }
}

const search2 = async (req, res) => {
    const obj = req.query
    var chr = ["'", "-", '"', "union", "select", "drop", "#", "select"]
    let kiemtra = true
    for(let i = 0; i < chr.length; i++)
    {
        let check = obj.name.indexOf(chr[i])
        if(check != -1) 
        {
            kiemtra = false
            break
        }
    }

    if(!kiemtra){
        res.send("Error Input!!!")
    }
    else{
        const query = `SELECT firstname, lastname, university, live, job FROM public."user_info"  where lastname LIKE '%${obj.name}%'`

        const findUser = await db.Client.query(query, (err, result) => {
        if(err) console.error("Error!")
        else{
            let arrUser = result.rows

            var fUser = users.filter( (user) => {
                return (user.lastname).toLowerCase().indexOf(obj.name.toLowerCase()) !== -1
            })

            if(obj.name != '')
            {
                console.log(fUser)
                res.render('search', {userinfo: fUser})
            }
        }   
        })
    }
}

/*
const search2 = async (req, res) => {
    const obj = req.query
    const query = `SELECT firstname, lastname, university, live, job FROM public."user_info"  where lastname LIKE '%${obj.name}%'`
    const findUser = await db.Client.query(query, (err, result) => {
        if(err) console.error("Error!")
        else{
            let arrUser = result.rows
            var fUser = users.filter( (user) => {
                return (user.lastname).toLowerCase().indexOf(obj.name.toLowerCase()) !== -1
            })

            if(obj.name != '')
            {
                console.log(arrUser)
                res.render('search', {userinfo: arrUser})
            }
        }
    })
}
*/



export default {search, search2}