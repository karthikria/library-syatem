const {google}=require("googleapis")
const fs=require("fs")

const auth=new google.auth.GoogleAuth({
keyFile:"service-account.json",
scopes:["https://www.googleapis.com/auth/drive"]
})

const drive=google.drive({
version:"v3",
auth
})

async function uploadFile(path,name){

const response=await drive.files.create({

requestBody:{
name:name+".zip",
mimeType:"application/zip"
},

media:{
mimeType:"application/zip",
body:fs.createReadStream(path)
}

})

return `https://drive.google.com/file/d/${response.data.id}/view`

}

module.exports=uploadFile