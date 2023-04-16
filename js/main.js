let log_text = document.getElementById("log_text_btn");
let if_dont_log = document.getElementById("if_dont_log");
let html_butn = document.getElementById("html_butn");


html_butn.addEventListener("click", function (e) {
    e.preventDefault();

    let currentSessionObj = window.sessionStorage.getItem("users_log_1");
    
     if(currentSessionObj === ""){
        window.location.href = "sign-up.html";
     } else {
    // console.log(currentSessionObj);
    window.location.href = "qiuz.html";
     }
});

log_text.addEventListener("click", function () {
    window.sessionStorage.clear();
});


