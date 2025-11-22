let userStore = JSON.parse(sessionStorage.getItem("xxur"));
let dataURL;
if (userStore === null ) {
  window.location.assign("/login.html");
} 

const HandleResenVerificationLink = ()=>{  
    document.querySelector(".resend-btn").innerHTML = "Sending..."
  axios.get("https://server.lmnurse.ca/nurse/resendverification",{
    headers:{
      "content-type": "application/json",
      "token":sessionStorage.getItem("xxtk")
    }
  }).then(({data})=>{
    setTimeout(()=>{
      document.querySelector(".resend-btn").innerHTML = "Resend Link"
    },3000)
    document.querySelector(".resend-btn").innerHTML = "Sent !"
  }).catch((Error)=>{
    alert(Error.message)
    document.querySelector(".resend-btn").innerHTML = "Resend Link"
  })
}
const HandleIsverified =()=>{
  if(userStore.isVerified !== true){
    document.querySelector(".note").style="display:block"
  }else{
    document.querySelector(".note").style="display:none"
  }
}
const HandleProgress = () =>{
    axios.get(`https://server.lmnurse.ca/nurse/proccesslevel`,{
      headers:{
        "content-type": "application/json",
        "token":sessionStorage.getItem("xxtk")
      }
    }).then(({data})=>{
    
   
    let progress = document.querySelectorAll(".employer-item")
    let status = document.querySelectorAll(".progress-status")
    let action_btn = document.querySelectorAll(".progress-btn")
    let status_message = "PENDING"
    switch (data.proccessLevel) {
        case 0:
            progress[0].classList.add("inactive")
            status[0].innerHTML = status_message 
            progress[1].classList.add("inactive")
            status[1].innerHTML = status_message
            progress[2].classList.add("inactive")
            status[2].innerHTML = status_message
            action_btn[0].disabled = true;
            action_btn[1].disabled = true;
            action_btn[2].disabled = true;
            break; 
       case 1:
            progress[1].classList.add("inactive")
            status[1].innerHTML = status_message
            progress[2].classList.add("inactive")
            status[2].innerHTML = status_message
            status[0].classList.remove("two")
            action_btn[1].disabled = true;
            action_btn[2].disabled = true;
            break; 
        case 2:
            progress[2].classList.add("inactive")
            status[1].classList.remove("two")
            status[0].classList.remove("two")
            status[1].innerHTML = "SUCCESSFUL"
            status[2].innerHTML = "PENDING"
            action_btn[2].disabled = true;
            break;   
         case 3:
            progress[1].classList.remove("inactive")
            status[1].classList.remove("two")
            status[0].classList.remove("two")
            status[1].innerHTML = "SUCCESSFUL"
            progress[2].classList.remove("inactive")
            status[2].classList.remove("two")
            status[2].innerHTML = "SUCCESSFUL"
            action_btn[2].disabled = false;
            return
            break;
    
        default:
            break;
    }
  }).catch((err)=>{console.log(err)})
}

const HandleProfile =()=>{
  let sideView = document.querySelector(".profile-item")
  sideView.innerHTML = `<img src="${userStore.avater}" alt="profile-avater">
  <h2>${userStore.fullName}</h2>
  <span>Practising Nurse</span>`
  let profileInputs = document.querySelectorAll(".profile-input")
  for(input in profileInputs) {
    profileInputs[input].value = userStore[profileInputs[input].name] === undefined ? "" : userStore[profileInputs[input].name]
  }
}

const UpdateProfile =(e)=>{
  try {
    
  document.querySelector(".dashboard-btn").innerHTML = "Submitting..."
  e.preventDefault()
  let profileForm = document.querySelectorAll(".profile-input");
  let formArray = Array.from(profileForm);
  // let error = HandleInputValues(formArray);
  // if (error) {
  //   // Toast(error);
  //   alert(error)
  //   return false;
  // }
  let data = {};
  for (input in formArray) {
    data[formArray[input].name] = formArray[input].value;
  } 
  data["avater"] = dataURL || userStore.avater
  axios.put(`https://server.lmnurse.ca/nurse/updateUserProfile`, data,{
    headers:{
      "content-type": "application/json",
      "token":sessionStorage.getItem("xxtk")
    }
  }).then(({data})=>{

    if(data.message === "success"){
      document.querySelector(".dashboard-btn").innerHTML = "Success !..."
      window.sessionStorage.setItem("xxur",JSON.stringify(data.user))
      window.location.assign("/dashboard.html")
    }
  }).catch((res)=>{
    document.querySelector(".dashboard-btn").innerHTML = "Save Your Information"

  })

  return false;
} catch (error) {
    console.log(error)
    return false;
}
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

function HandleLogout(){
  sessionStorage.removeItem("xxtk")
  sessionStorage.removeItem("xxur");
  window.location.assign("/login.html")
}

let readImage = function (file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function () {
    dataURL = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
};



HandleIsverified()
HandleProfile()
HandleProgress()
document.querySelector(".dashboard-btn").addEventListener("click", UpdateProfile)
document.querySelector("#avater").addEventListener("change", readImage)