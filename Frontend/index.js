const BackendUrl="http://localhost:4000";


const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");



signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});


// RegisterForm

const registerName=document.getElementById("registerName")
const registerEmail=document.getElementById("registerEmail")
const registerPassword= document.getElementById("registerPassword")
const registerBtn= document.getElementById("registerBtn");

registerBtn.addEventListener("click", async(e)=>{
e.preventDefault();
const user={
    name:registerName.value,
    email:registerEmail.value,
    password:registerPassword.value
}



try {
    const response= await fetch(`${BackendUrl}/register`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const data=await response.json();
   
    if(response.status==200) 
    {
        console.log(data)
        alert("Register SUccessful")
    }

} catch (error) {
    console.log(error)
}

})


// Login

const loginEmail= document.getElementById("loginEmail");
const loginPassword= document.getElementById("LoginPassword");
const btnLogin=document.getElementById("LoginBtn");


btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault();
    const user={
       
        email:loginEmail.value,
        password:loginPassword.value
    }
  
    
    
    try {
        const response= await fetch(`${BackendUrl}/login`,{
            method:"POST",
            body:JSON.stringify(user),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data=await response.json();
       
        if(response.status==200) 
        {
            console.log(data)
            alert(data.msg)
        }
    
    } catch (error) {
        console.log(error)
    }
    
    })
