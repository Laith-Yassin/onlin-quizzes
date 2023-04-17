let log_text = document.getElementById("log_text_btn");
let if_dont_log = document.getElementById("if_dont_log");
let html_butn = document.getElementById("html_butn");
let css_butn = document.getElementById("css_butn");
let js_butn = document.getElementById("js_butn");



html_butn.addEventListener("click", function (e) {
    e.preventDefault();

    let currentSession = window.sessionStorage.getItem("users_log_1");
    let currentSessionObj = JSON.parse(currentSession);
    
     if(currentSessionObj === null){
        window.location.href = "sign-up.html";
     } else {
    
    window.location.href = "qiuz.html";
     }
});


css_butn.addEventListener("click", function (e) {
    e.preventDefault();

    let currentSession = window.sessionStorage.getItem("users_log_1");
    let currentSessionObj = JSON.parse(currentSession);
    
     if(currentSessionObj === null){
        window.location.href = "sign-up.html";
     } else {
    
    window.location.href = "qiuz - css.html";
     }
});


js_butn.addEventListener("click", function (e) {
    e.preventDefault();

    let currentSession = window.sessionStorage.getItem("users_log_1");
    let currentSessionObj = JSON.parse(currentSession);
    
     if(currentSessionObj === null){
        window.location.href = "sign-up.html";
     } else if (currentSessionObj !== null) {
    
    window.location.href = "qiuz - js.html";
     }
});



log_text.addEventListener("click", function () {
    window.sessionStorage.clear();
    if_dont_log.textContent = "plz log in to get the Quizez";

});


