const HandleContactForm = (e)=> {
    e.preventDefault();
    document.querySelector("#contact-btn").innerHTML = "Sending..."

    let contactForm = document.querySelectorAll("#contact-input");
    let formArray = Array.from(contactForm);
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
    axios.post(`https://server.lmnurse.ca/nurse/contact`, data,{
      headers:{
        "content-type": "application/json"
      }
    }).then(({data})=>{
      setTimeout(()=>{
        document.querySelector("#contact-btn").innerHTML = "Send Message"
      },3000)
        document.querySelector("#contact-btn").innerHTML = "Success !"


    }).catch((err)=>{
        document.querySelector("#contact-btn").innerHTML = "Send Message"

        console.log(err)
    })
    return false;
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

  document.querySelector("#contact-btn").addEventListener("click",HandleContactForm);