import {main} from  "../helper/initdata.js"
//bây giờ ở đọc data từ db import 
const getFakedata = (req,res) => 
 {
    main()
    .then(data => {
      res.render('fakedata', { layout: false })
   })
    
 }
 export default {getFakedata}