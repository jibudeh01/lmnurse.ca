


  function generateREF() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    var ref = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return ref;
  }
  async function getAmount() {
    const api = "https://api.exchangerate-api.com/v4/latest/USD";
   let data = await fetch(`${api}`),
   json = await data.json(),
   converter = convert(json);

   return converter;
       
}
 
function convert(currency) {
    let fromRate = currency.rates['USD'];
    let toRate = currency.rates['NGN'];
    let amount = 5000;
    return Math.round(((toRate / fromRate) * amount).toFixed(2));
   
}
const HandleCheckout = async () => {
    let userToken = JSON.parse(sessionStorage.getItem("xtk"));
    let userDetails = JSON.parse(sessionStorage.getItem("xxur"));
    let amount =  await getAmount()
    var handler = PaystackPop.setup({
      key: "pk_live_d0783f229d7126c3d7a97c988c3867477597233e",
      // key: "pk_test_ec2b67386c295facf3f439167c544a09897e6dcd",
      email: userDetails.email,
      amount:amount * 100,
      ref: generateREF(),
      callback: function (response) {
        
    axios
      .post(`https://server.lmnurse.ca/nurse/pay/${response.trxref}`, {
        headers: {
          "content-type": "application/json",
          token: `${userToken}`,
        },
      }).then((res)=>{
    
        
      }).catch((err)=>console.log(err))
    },
    onClose: function () {
      alert("Transaction cancelled");
    },
  });
  handler.openIframe();
  };
  document.querySelector(".pay").addEventListener('click',HandleCheckout)
  