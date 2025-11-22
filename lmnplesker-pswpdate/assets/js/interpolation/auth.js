let isloggedIn = JSON.parse(sessionStorage.getItem("xxur"));
if (isloggedIn !== null) {
let nav = document.querySelector(".auth")
nav ? nav['innerHTML']=`	<a href="dashboard.html" class="elementor-button-link elementor-button elementor-size-sm elementor-animation-shrink" role="button">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">Dashboard</span>
</span>
</a>`: document.querySelector(".contact-auth")['innerHTML']=`<a class="job-right " href="dashboard.html">
Dashboard
</a>`
}else{
    let nav = document.querySelector(".auth")

   nav ? nav['innerHTML']=`<a href="login.html" class="elementor-button-link elementor-button elementor-size-sm elementor-animation-shrink" role="button">
    <span class="elementor-button-content-wrapper">
    <span class="elementor-button-text">Login</span>
</span>
</a>`:document.querySelector(".contact-auth")['innerHTML']=`<a class="job-right " href="login.html">
Login
</a>`
}