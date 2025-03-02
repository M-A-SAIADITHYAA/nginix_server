const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000

const server = http.createServer((req,res)=>{
    const filePath = path.join(__dirname,req.url ==='/' ? "index.html":req.url)
    console.log(req.url)
    const extName = String(path.extname(filePath).toLowerCase())

    const mimeTypes = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream'
    fs.readFile(filePath,(error,content) =>{
        if(error){
            if(error.code === "ENOENT"){
                res.writeHead(404,{"content-type":contentType})
                res.end("FILE NOT FOUND")
            }
            
        }else{
            res.writeHead(200,{'content-type' : contentType})
            res.end(content,"utf-8")

        }

    })
})

server.listen(port,() =>{
    console.log(`server is listening on ${port}`)
})

