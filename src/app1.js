import jwt from "jsonwebtoken"
// import fs from "fs"
// import { fileURLToPath } from 'url'
// import path from "path"
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


const header = {
    kid : "6f597b7-fd81-44c7-956f-6937ea94cdf6",
    alg: 'HS256', // Algorithm
    typ: 'JWT' ,   // Type
    jku : 'https://webhook.site/ef25db63-2fb1-4961-8eec-8e75d4dff6df'
};
const token = jwt.sign({"isadmin": "true"},'yxwbWAgScjCTF6xE1lXkiQ',{algorithm: 'RS256',expiresIn: '5d' ,header })

// // console.log(token)
// const decodedToken = jwt.decode(token, { complete: true });
// const header1 = decodedToken.header
// console.log(header1)
// // console.log(path.join(__dirname,'/helper/key/',header1.kid))
// fs.readFile(path.join(__dirname,'/helper/key/',header1.kid),'utf-8' ,function(err,data){
//     // console.log(data)
// })

// const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc2FkbWluIjoidHJ1ZSIsImlhdCI6MTcxNDEzMTA0NCwiZXhwIjoxNzE0NTYzMDQ0fQ.k6hRCKxo3IFif1Fe9RyD6DyxK5n5blifZTxs0uqd5ls"
console.log(token)
const decoded = jwt.verify(token, 'yxwbWAgScjCTF6xE1lXkiQ')
console.log(decoded)