//   ......................... start login ..............................

// Start Login
let username_log = document.getElementById("username_log");
let pass_log = document.getElementById("pass_log");
let sub2 = document.getElementById("sub2");
let getStorge = window.localStorage.getItem("user_data");
let log_err = document.getElementById("log_err");
let getStorge_p = JSON.parse(getStorge);

sub2.addEventListener("click", function() {
    for(let i = 0; i < getStorge_p.length; i++) {
        if(username_log.value === getStorge_p[i].user_mail && pass_log.value === getStorge_p[i].user_pass) {
            console.log("You got it!");
            window.sessionStorage.setItem(`users_log_${i+1}`, getStorge_p[i].id, getStorge_p[i].user_name);
            return;
        }
    }
    log_err.textContent = "Invalid Email or Password";
    log_err.style.color = "red";
});

// End Login


