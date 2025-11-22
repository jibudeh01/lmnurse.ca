let params = new URLSearchParams(window.location.search);
let code = params.get("code");
let token = params.get("token");
const HandleVerifyCode = () => {
  axios.post(`https://server.lmnurse.ca/nurse/verifyforgetpasswordcode`,{code},{
    headers:{
        "content-type": "application/json",
        "token":`${token}`
    }
  }).then((response) => {
    if(response.data == "code Verified"){
      document.querySelector(".content").style="display:block"
    }else{
       document.querySelector(".info").innerHTML = response.data;
    }

  })
};

const HandleResetPassword = (e) =>{
  alert("okk")
  document.querySelector("#reset-btn").innerHTML = "Submitting..."

  let newPassword = document.querySelector(".reset-input").value
  axios.post(`https://server.lmnurse.ca/nurse/resetpassword`,{newPassword},{
    headers:{
        "content-type": "application/json",
        "token":`${token}`
    }
  }).then((res)=>{
    if(res.data === "success"){
      setTimeout(()=>{
        window.location.assign("/login.html")
      },3000)
      document.querySelector("#reset-btn").innerHTML = "SUCCESS !"
    }

  }).catch((err)=>{
    alert(err.message)
  })
  return false;
}

HandleVerifyCode();
