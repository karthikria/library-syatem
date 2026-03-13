const express=require("express")
const multer=require("multer")
const archiver=require("archiver")
const fs=require("fs")
const path=require("path")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const upload=multer({dest:"uploads/"})

const STORAGE="C:/Users/Nandhakumar/Documents/libraryStorage"

if(!fs.existsSync(STORAGE)){
fs.mkdirSync(STORAGE)
}

const DB="library.json"

let library=[]
let verifiedUsers=[]

if(fs.existsSync(DB)){

const data=JSON.parse(fs.readFileSync(DB))

/* SUPPORT OLD AND NEW DB FORMAT */

if(Array.isArray(data)){
library=data
verifiedUsers=[]
}else{
library=data.books || []
verifiedUsers=data.verifiedUsers || []
}

}

let userUploads={}

function saveDB(){

const data={
books:library,
verifiedUsers:verifiedUsers
}

fs.writeFileSync(DB,JSON.stringify(data,null,2))

}

app.post("/upload",upload.single("file"),(req,res)=>{

const user=req.body.user
const category=req.body.category

if(!userUploads[user]) userUploads[user]=0

userUploads[user]++

/* FIRST TIME RULE */

if(!verifiedUsers.includes(user) && userUploads[user] < 3){
return res.json({error:"You must upload at least 3 files first"})
}

/* USER VERIFIED */

if(userUploads[user] >= 3 && !verifiedUsers.includes(user)){
verifiedUsers.push(user)
}

const zipName=req.file.filename+".zip"
const zipPath=path.join(STORAGE,zipName)

const output=fs.createWriteStream(zipPath)
const archive=archiver("zip")

archive.pipe(output)
archive.file(req.file.path,{name:req.file.originalname})
archive.finalize()

library.push({
title:req.file.originalname,
category:category,
file:zipName
})

saveDB()

res.json({message:"uploaded",count:userUploads[user]})

})

app.get("/books",(req,res)=>{
res.json(library)
})

app.get("/download/:id",(req,res)=>{

const user=req.query.user

if(!verifiedUsers.includes(user)){
return res.json({error:"Upload 3 documents first"})
}

const book=library[req.params.id]

res.download(path.join(STORAGE,book.file))

})

app.delete("/delete/:id",(req,res)=>{

    const user=req.query.user
    
    if(user !== "s.karthikria@gmail.com"){
    return res.json({error:"Only admin can delete books"})
    }
    
    const id = parseInt(req.params.id)
    
    if(isNaN(id) || id < 0 || id >= library.length){
    return res.json({error:"Invalid book id"})
    }
    
    library.splice(id,1)
    
    saveDB()
    
    res.json({message:"deleted"})
    
    })
app.listen(5000,()=>{
console.log("Server running http://localhost:5000")
})



const unzipper=require("unzipper")

app.get("/preview/:id",(req,res)=>{

const user=req.query.user

if(!verifiedUsers.includes(user)){
return res.json({error:"Upload 3 documents first"})
}

const book=library[req.params.id]

const zipPath=path.join(STORAGE,book.file)

fs.createReadStream(zipPath)
.pipe(unzipper.ParseOne())
.pipe(res)

})