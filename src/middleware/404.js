const get404page = (req,res) => {
    res.render('404',{layout:false})
}
export {get404page}