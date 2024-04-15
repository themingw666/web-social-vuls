import db from '../config/database.js'

async function getTimelinePage(req,res){
    const { id } = req.query;
    let data, result
    if (!id) {
        return res.render('timelineerror', {data: "Missing id parameter"})
    }
    try {
        result = await db.Client.query("SELECT * FROM \"user_info\" WHERE userid = '" + id + "'")
        if (result.rows.length === 0) {
          res.render('timelineerror', {data: "User not found"})
        }
        data = result.rows[0]
        res.render('timeline', {data})
    } catch (err) {
        res.render('timelineerror', {data: "Error executing query"})
    }    
}

export default {getTimelinePage}