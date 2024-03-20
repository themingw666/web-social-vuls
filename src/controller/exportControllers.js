import * as service from "../service/renderPDF.js"
const getPdfPage = async(req,res) =>{
    const url = req.get("Referer")
   try {
    const pdfBuffer  = await service.renderPDF(url)
    res.status(200)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    })
    res.send(pdfBuffer);
   } catch (error) {
    console.log(error)
    res.status(404).render('404', { layout: false })
    return;
   }
}
   export {getPdfPage}