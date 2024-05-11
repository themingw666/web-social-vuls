import url from "url"
const check_url_easy= (addsr) => {
 let addr ="file://C:/Windows/System32/drivers/etc/hosts%25%32%33@web-vul.com:3000/timeline?id=1"
    //step1 decoding 
  let url_decoding = decodeURIComponent(addr)
    //whitelist 
    const q = url.parse(url_decoding, true);
    console.log(q)
    if (q.hostname === "web-vul.com"){
         return true;
    }
    return false 
}

const check_url_standard = (addr) =>{
    //scheme, port, domain 
   while(addr.includes("%")){
    addr =decodeURIComponent(addr)
   }
    let url_decoding = decodeURIComponent(addr)
    const q = url.parse(url_decoding, true);
    //protocol 
    if (['http:','https:'].indexOf(q.protocol) < 0) {
      return false
    }
    if (q.hostname !== "web-vul.com"){
      return false;
    }
    if (q.port !== "3000") {
      return false
    }
    return true
}
check_url_easy()
export {check_url_easy,check_url_standard}