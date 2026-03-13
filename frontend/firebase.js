import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

const firebaseConfig={

    apiKey: "AIzaSyB1GXRvWYsbI8TUIeMKVSthPRsHl1yAnqg",
    authDomain: "library-system-7ecf1.firebaseapp.com",
    projectId: "library-system-7ecf1",
    storageBucket: "library-system-7ecf1.firebasestorage.app",
    messagingSenderId: "25340411348",
    appId: "1:25340411348:web:8662c20bf6f98686606a41",
    measurementId: "G-BRHWF4N5HX"

}

const app=initializeApp(firebaseConfig)

export const auth=getAuth(app)