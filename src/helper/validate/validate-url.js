import url from "url"
const check_url_easy = (addr) =>{
  let url_decoding = decodeURIComponent(addr)
  //blacklist 
  const q = url.parse(url_decoding, true);
  if (q.hostname === "localhost"){
       return false;
  }
  return true
}
const check_url_medium = (addr) => {
    //step1 decoding 
  let url_decoding = decodeURIComponent(addr)
    //whitelist 
    const q = url.parse(url_decoding, true);
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
export {check_url_easy,check_url_standard,check_url_medium}