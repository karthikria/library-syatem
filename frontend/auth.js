import { auth } from "./firebase.js"

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
updateProfile,
signOut
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"


window.signup = async function(){

const username = document.getElementById("username").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

if(!username || !email || !password){
alert("Please fill all fields")
return
}

if(password.length < 6){
alert("Password must be at least 6 characters")
return
}

try{

const userCredential =
await createUserWithEmailAndPassword(auth,email,password)

await updateProfile(userCredential.user,{
displayName:username
})

alert("Account created")

window.location="library.html"

}
catch(error){

if(error.code==="auth/email-already-in-use"){
alert("This email already exists. Please login.")
}

else if(error.code==="auth/invalid-email"){
alert("Invalid email address")
}

else{
alert(error.message)
}

}

}


window.login = async function(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(!email || !password){
alert("Enter email and password")
return
}

try{

await signInWithEmailAndPassword(auth,email,password)

window.location="library.html"

}
catch(error){

if(error.code==="auth/user-not-found"){
alert("No account found with this email")
}

else if(error.code==="auth/wrong-password"){
alert("Incorrect password")
}

else{
alert(error.message)
}

}

}


window.logout = function(){

signOut(auth)

window.location="login.html"

}