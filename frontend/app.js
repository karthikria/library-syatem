import { auth } from "./firebase.js"

let books=[]

/* LOAD BOOKS */

async function loadBooks(){

try{

const res=await fetch("http://localhost:5000/books")

books=await res.json()
document.getElementById("bookCount").textContent = books.length;
display(books)

}catch(err){

console.error("Failed to load books",err)

}

}

/* DISPLAY BOOK CARDS */

function display(list){

let html=""

list.forEach((b,i)=>{

html+=`

<div class="card">

<div class="card-top">

<div class="file-icon">📕</div>

<span class="badge">${b.category}</span>

</div>

<h3 class="book-title">${b.title}</h3>

<div class="card-buttons">

<button class="btn-preview" onclick="preview(${i})">
Preview
</button>

<button class="btn-download" onclick="download(${i})">
Download
</button>

${auth.currentUser?.email === "s.karthikria@gmail.com" ? 
`<button class="btn-delete" onclick="deleteBook(${i})">Delete</button>` 
: ""}

</div>

</div>

`

})

document.getElementById("books").innerHTML=html

}

/* PDF PREVIEW */

function preview(id){

const user=auth.currentUser?.email

if(!user){

alert("Please login")

return

}

/* FIXED ERROR */

// window.open(`http://localhost:5000/download/${id}?user=${user}`,"_blank")
window.open(`viewer.html?id=${id}&user=${user}`,"_blank")
}

/* DOWNLOAD FILE */

function download(id){

const user=auth.currentUser?.email

if(!user){

alert("Please login")

return

}

/* CHECK SERVER RESPONSE */

fetch(`http://localhost:5000/download/${id}?user=${user}`)
.then(res=>{

if(res.headers.get("content-type")?.includes("application/json")){
return res.json().then(data=>alert(data.error))
}

window.open(`http://localhost:5000/download/${id}?user=${user}`)

})

}

/* SEARCH FUNCTION */

function initSearch(){

const search=document.getElementById("searchBox")

if(!search) return

search.addEventListener("input",(e)=>{

const fuse=new Fuse(books,{
keys:["title","category"]
})

const results=fuse.search(e.target.value)

if(e.target.value===""){

display(books)

}else{

display(results.map(r=>r.item))

}

})

}

/* FILE UPLOAD */

async function upload(){

const file=document.getElementById("file").files[0]

const category=document.getElementById("category").value

const user=auth.currentUser?.email

if(!file){

alert("Select a file")

return

}

const formData=new FormData()

formData.append("file",file)
formData.append("category",category)
formData.append("user",user)

const progress=document.getElementById("progressBar")

const xhr=new XMLHttpRequest()

xhr.open("POST","http://localhost:5000/upload")

xhr.upload.onprogress=function(e){

if(progress){

let percent=(e.loaded/e.total)*100

progress.style.width=percent+"%"

}

}

/* FIXED ERROR */

xhr.onload=function(){

try{

const res=JSON.parse(xhr.responseText)

if(res.error){
alert(res.error)
return
}

}catch(e){}

alert("Upload completed")

loadBooks()

}

xhr.onerror=function(){

alert("Upload failed")

}

xhr.send(formData)

}

/* DRAG DROP UPLOAD */

const dropZone=document.getElementById("dropZone")

if(dropZone){

dropZone.addEventListener("dragover",(e)=>{
e.preventDefault()
dropZone.style.background="#1e293b"
})

dropZone.addEventListener("dragleave",()=>{
dropZone.style.background=""
})

dropZone.addEventListener("drop",(e)=>{

e.preventDefault()

document.getElementById("file").files=e.dataTransfer.files

dropZone.style.background=""

})

}

/* DARK MODE */

function toggleDark(){

document.body.classList.toggle("dark")

}

/* AUTO LOAD */

window.onload=function(){

loadBooks()

initSearch()

}

/* EXPOSE FUNCTIONS */

window.loadBooks = loadBooks
window.preview = preview
window.download = download
window.upload = upload
window.toggleDark = toggleDark


async function deleteBook(id){

    if(!confirm("Delete this book?")) return
    
    const user=auth.currentUser?.email

    await fetch(`http://localhost:5000/delete/${id}?user=${user}`,{
    method:"DELETE"
    })
    
    alert("Book deleted")
    
    loadBooks()
    
    }
    
    window.deleteBook = deleteBook

    function removeFromUI(id){

        const cards=document.querySelectorAll(".card")

        if(cards[id]){
        cards[id].style.opacity="0"
        cards[id].style.transform="scale(0.9)"
        }
        
        setTimeout(()=>{
        
        books.splice(id,1)
        
        display(books)
        
        },300)
        
        }
        
        window.removeFromUI = removeFromUI



    document.addEventListener("DOMContentLoaded",()=>{

        const filter=document.getElementById("categoryFilter")
        
        if(filter){
        filter.addEventListener("change",filterByCategory)
        }
        
        })

    
    function filterByCategory(){

        const category=document.getElementById("categoryFilter").value
        
        if(category==="all"){
        display(books)
        return
        }
        
        const filtered=books.filter(b=>b.category===category)
        
        display(filtered)
        
        }


        //voice assistant code 
     /* VOICE ASSISTANT */

const voiceBtn = document.getElementById("voiceAssistant")

if(voiceBtn){

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition

if(SpeechRecognition){

const recognition = new SpeechRecognition()

recognition.lang = "en-US"

voiceBtn.onclick = () => {

recognition.start()

}

recognition.onresult = (event) => {

const command = event.results[0][0].transcript.toLowerCase()

console.log("Voice command:", command)
if(command.includes("upload page")){
    window.location="upload.html"
    }
    
    else if(command.includes("library")){
    window.location="library.html"
    }
    
  
/* CLEAN COMMAND TEXT */

const cleanCommand = command
.replace("please","")
.replace("book","")
.replace("notes","")
.replace("pdf","")
.trim()

/* SEARCH COMMAND */

if(command.includes("search") || command.includes("show")){

let query = cleanCommand
.replace("search","")
.replace("show","")
.replace("books","")
.trim()

document.getElementById("searchBox").value = query

document.getElementById("searchBox")
.dispatchEvent(new Event("input"))

}

/* OPEN BOOK */

else if(command.includes("open")){

let name = cleanCommand.replace("open","").trim()

const normalizedCommand = name
.toLowerCase()
.replace(/[_\-\.]/g," ")
.replace(/\s+/g," ")
.trim()

const index = books.findIndex(b => {

const normalizedTitle = b.title
.toLowerCase()
.replace(/[_\-\.]/g," ")
.replace(/\s+/g," ")
.trim()

return normalizedTitle.includes(normalizedCommand)

})

if(index !== -1){

preview(index)

}else{

alert("Book not found")

}

}

/* DOWNLOAD BOOK */

else if(command.includes("download")){

let name = cleanCommand.replace("download","").trim()

const normalizedCommand = name
.toLowerCase()
.replace(/[_\-\.]/g," ")
.replace(/\s+/g," ")
.trim()

const index = books.findIndex(b => {

const normalizedTitle = b.title
.toLowerCase()
.replace(/[_\-\.]/g," ")
.replace(/\s+/g," ")
.trim()

return normalizedTitle.includes(normalizedCommand)

})

if(index !== -1){

download(index)

}else{

alert("Book not found")

}

}

/* COUNT BOOKS */

else if(command.includes("how many books")){

alert("Total books in library: " + books.length)

}

/* UNKNOWN COMMAND */

else{

alert("Command not recognized")

}

}

}else{

voiceBtn.style.display="none"

}

}