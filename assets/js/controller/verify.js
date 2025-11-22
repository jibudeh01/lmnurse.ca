let params = new URLSearchParams(window.location.search)
let code = params.get('code');
let id = params.get('id');
const HandleUserVerify = ()=>{
  
    // axios.get(`http://localhost:2080/nurse/verifyuser/${code}`,{
    axios.get(`https://server.lmnurse.ca/nurse/verifyuser/${code}`,{
        headers:{
            "content-type": "application/json",
            "token":id
        }
    }).then((res)=>{
        console.log(res)
        if(res.data === "success"){
         document.querySelector(".container").innerHTML=`        <div class="wrapper">
         <div class="img-wrapper"><img src="/assets/img/verified.jpg" alt="Verified"/></div>
         <p>Email Successfully Verified</p>
         <a href="javascript:void;" onclick="HandleGetUser(); return false;"class="mybtn">Go to Dashboard</a>
     </div>`
        }else{
            document.querySelector(".container").innerHTML=""
            alert(res.data)
        }
    }).catch((err)=>{console.log(err)})
}

const HandleGetUser = ()=>{
    // axios.get(`http://localhost:2080/nurse/current-user`,{
    axios.get(`https://server.lmnurse.ca/nurse/current-user`,{
        headers:{
            "content-type": "application/json",
            "token":id
        }
    }).then((res)=>{
        if(res.data === "login to continue"){
          return  window.location.assign("/login.html")
        }
        window.sessionStorage.setItem("xxtk",id)
        window.sessionStorage.setItem("xxur",JSON.stringify(res.data))
        window.location.replace("/dashboard.html")
    }).catch((err)=>{
        alert(err.message)
    })
}



HandleUserVerify()
   
