let userStore = JSON.parse(sessionStorage.getItem("xxur"));
if (userStore !== null ) {
  window.location.assign("/");
}
const HandleRegisterForm = (e)=> {
  e.preventDefault();
  document.querySelector("#register-btn").innerHTML = "Sending..."
  let registerForm = document.querySelectorAll(".register-input");
  let formArray = Array.from(registerForm);
  let error = HandleInputValues(formArray);
  if (error) {
    // Toast(error);
    alert(error)
    return false;
  }
  let data = {};
  for (input in formArray) {
    data[formArray[input].name] = formArray[input].value;
  } 
  delete data.confirmPassword
  axios.post(`https://server.lmnurse.ca/nurse/signup`, data,{
    headers:{
      "content-type": "application/json"
    }
  }).then((res)=>{
    console.log(res)
    if(res.data?.message !== "user Account created sucessfully"){
      document.querySelector("#register-btn").innerHTML = "Register"
      alert(res.data?.message)
      return;
    }
    setTimeout(()=>{
      document.querySelector("#register-btn").innerHTML = "Register"
    },3000)
    document.querySelector("#register-btn").innerHTML = "Success"
    alert("Account Verification Link has been sent to your mail")
    window.location.assign("/login.html")
    for (input in formArray) {
     formArray[input].value = ""
    } 
  }).catch((err)=>{console.log(err)})
  return false;
}

const HandleLoginForm = (e)=> {
    e.preventDefault();
    document.querySelector("#login-btn").innerHTML = "Sending..."

    let loginForm = document.querySelectorAll(".login-input");
    let formArray = Array.from(loginForm);
    let error = HandleInputValues(formArray);
    if (error) {
      // Toast(error);
      alert(error)
      return false;
    }
    let data = {};
    for (input in formArray) {
      data[formArray[input].name] = formArray[input].value;
    } 
    axios.post(`https://server.lmnurse.ca/nurse/login`, data,{
      headers:{
        "content-type": "application/json"
      }
    }).then(({data})=>{
      if(data != "user not found" && data.message  === "success"){
      setTimeout(()=>{
        document.querySelector("#login-btn").innerHTML = "Login Here"
      },3000)
      document.querySelector("#login-btn").innerHTML = "Success"
      window.sessionStorage.setItem("xxtk",data.token)
      window.sessionStorage.setItem("xxur",JSON.stringify(data.user))
      window.location.replace("dashboard.html")
      for (input in formArray) {
       formArray[input].value = ""
      } 
    }else{

      alert(data)
    }

    }).catch((err)=>{console.log(err)})
    return false;
  }

  const HandleForgotPassword = ()=>{
    let value = document.querySelector(".forgetpassword").value;
    axios.post(`https://server.lmnurse.ca/nurse/forgotpassword`, {email:value},{
      headers: {'Content-Type': 'application/json'},
    }).then((res)=>{
      if (res.data === "sent"){
       return document.querySelector(".info").innerHTML = "Reset Password link has been sent to your Email"
      }else{
        return document.querySelector(".info").innerHTML = res.data

      }

    }).catch((err)=>{
      console.log(err)
      alert(err.message)
    })

  }
if(window.location.pathname.includes("/login")){
  document.querySelector("#login-btn").addEventListener("click", HandleLoginForm);
}else if(window.location.pathname.includes("/register")){
  document.querySelector("#register-btn").addEventListener("click", HandleRegisterForm);
}

 


function HandleInputValues(ArrayOfValue) {
    formArray = Array.from(ArrayOfValue);
    let error = null;
  
    for (input in formArray) {
      if (formArray[input].type !== "checkbox") {
        if (formArray[input].value === "" || formArray[input].length < 3) {
          error = `${formArray[input].name} required ! `;
          return error;
        }
      }
    }
  }