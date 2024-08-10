const regForm = document.querySelector("#form-register"),
logForm = document.querySelector("#form-login")



const regWrap = document.querySelector(".reg")
const logWrap = document.querySelector(".log")
const form = document.querySelector(".container")
const contentData = document.querySelector(".content-data")
const logOut = document.querySelector(".bxs-user-circle")
const logBtn = document.querySelector(".btn-login")
const signUpBtn = document.querySelector(".btn-signup")

logOut.addEventListener("click" , () => {
    localStorage.removeItem("token")
    contentData.style.display = "none"
    showLogin()
})

const light = document.querySelector(".bx-sun")
const dark = document.querySelector(".bx-moon")

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.style.backgroundImage = savedTheme === 'dark' ? "url(./images/img-night.jpg)" : "url(./images/img-day.jpg)";
});

light.addEventListener("click", () => {
    document.querySelector("body").style.backgroundImage = "url(./images/img-day.jpg)"
    localStorage.setItem('theme', 'light');
});

dark.addEventListener("click", () => {
    document.querySelector("body").style.backgroundImage = "url(./images/img-night.jpg)"
    localStorage.setItem('theme', 'dark');
});






// if(!document.querySelector("body").style.backgroundImage){
//     document.querySelector("body").style.backgroundImage = "url(./images/img-day.jpg)"
// }

// light.addEventListener("click", () => {
    
//     document.querySelector("body").style.backgroundImage = "url(./images/img-day.jpg)"
// })


// dark.addEventListener("click", () => {
//     document.querySelector("body").style.backgroundImage = "url(./images/img-night.jpg)"
// })


async function regUser(regData) {
    try{
        const res = await fetch("https://students-login-data.onrender.com/register" , {
            method : "POST" , 
            headers : { 
                "Content-type" : "application/json"
            }, 
            body : JSON.stringify(regData)
        })
        if(res.ok){
            showLogin()
        }
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
    
}


async function logUser(logData) {
    try{
        const res = await fetch("https://students-login-data.onrender.com/login" , {
            method : "POST" , 
            headers : { 
                "Content-type" : "application/json"
            }, 
            body : JSON.stringify(logData)
        })
        const data = await res.json()
        if(res.ok) {
            localStorage.setItem("token" , data.token)
        }
        console.log(data)
    }catch(err){
        console.log(err)
    }
    
}


async function getStudentData() {
    const token = localStorage.getItem("token")
    if(!token) {
        showLogin()
    }else{
    console.log(token)
        try {
            const res = await fetch("https://students-login-data.onrender.com/students" , {
                method : "GET" , 
                headers : { 
                    "Content-type" : "application/json",
                    "Authorization" :  `Bearer ${token}`
                } 
            })
            const data = await res.json()
            contentData.style.display = "flex"
            contentData.textContent = JSON.stringify(data , null , 2)
            console.log(data)
        }catch(err){
            console.log(err)
        }

    }
}

getStudentData()





regForm.addEventListener("submit" , (e) => {
    e.preventDefault()
    const regData = {
        username  : e.target["user-name"].value.trim(),
        email : e.target["email"].value.trim(),
        password : e.target["password"].value.trim()
    }
    regUser(regData)
    console.log(regData)
    regForm.reset()
})




logForm.addEventListener("submit" , (e) => {
    e.preventDefault()
    const valueEmail = e.target["email"].value.trim()
    const valuePass = e.target["password"].value.trim()
    const logData = {
        email : valueEmail,
        password : valuePass
    }
    console.log(logData)
    logForm.reset()
    logUser(logData)
})





function showLogin() { 
    form.style.display = "flex"
    regWrap.style.display = "none"
    logWrap.style.display = "block"
}




logBtn.addEventListener("click" , () => {
    form.style.display = "flex"
    regWrap.style.display = "none"
    logWrap.style.display = "block"
    contentData.style.display = "none"
})


signUpBtn.addEventListener("click" , () => {
    form.style.display = "flex"
    regWrap.style.display = "block"
    logWrap.style.display = "none"
    contentData.style.display = "none"

})