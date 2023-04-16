const progress = document.querySelector("#progress");
const next = document.querySelector("#next");
const circles = document.querySelectorAll(".circle");

const update = () => {
    circles.forEach((circle, i) => {
        i < currActive
            ? circle.classList.add("active")
            : circle.classList.remove("active");
    });

    const actives = document.querySelectorAll(".active");
    const width = ((actives.length - 1) / (circles.length - 1)) * 100;
    progress.style.width = `${width}%`;
};

let currActive = 1;

next.addEventListener("click", () => {
    currActive++;

    if (currActive > circles.length) {
        currActive = circles.length;
    }
    update();
});

var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");

function myFunction() {
    if (q1.style.display === "none") {
        q2.style.display = "none";
        q3.style.display = "none";
        q4.style.display = "none";
        q1.style.display = "block";
    }
    else if (q2.style.display === "none") {
        q2.style.display = "block";
        q1.style.display = "none";
        q3.style.display = "none";
        q4.style.display = "none";
    }
    else if (q3.style.display = "none") {
        q3.style.display = "block";
        q1.style.display = "none";
        q2.style.display = "none";
        q4.style.display = "none";
    }
    else if (q4.style.display = "none") {
        q4.style.display = "block";
        q1.style.display = "none";
        q2.style.display = "none";
        q3.style.display = "none";
    }
}
