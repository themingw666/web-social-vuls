import db from "../config/database.js"

// [GET] /settings
const setting = async (req,res) => {
    const query = `SELECT name, status FROM public."vulnerable"`
    await db.Client.query(query, (err, result) =>{
        if(err) res.send('Error!')
        else{
            let vuls = result.rows
            res.render('settingvul',{ vul: vuls, layout: false })
        }
    }) 
}

// [PUT] /settings/submit
const submit = (req, res) => {
    const obj = req.body
    console.log(obj.XSS)
    res.send("OK")
}

export default {setting, submit}