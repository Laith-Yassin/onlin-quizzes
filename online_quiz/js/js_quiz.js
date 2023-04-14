// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount); //obj currentIndex

      // Start CountDown
      countdown(60, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(60, qCount);

        // Show Results
        showResults(theRightAnswer, qCount);

        
      };
    }
  }; 

  myRequest.open("GET", "exam_data.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }

}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(rAnswer, count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<h2 class="good">Good</h2> ${rightAnswers} From ${count} <div>  keep going  </div>`;
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "green";
      resultsContainer.style.color = "white";
      resultsContainer.style.opacity = "0.7";
      resultsContainer.style.marginLeft = "25%";
      resultsContainer.style.fontWeight = "600";
      resultsContainer.style.width = "50%";
      resultsContainer.style.textAlign = "center";
     
    } else if (rightAnswers === count) {
      theResults = `<h2 class="perfect">Perfect </h2> ${rightAnswers} From ${count} <div> stay in top </div>`;
      
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "green";
      resultsContainer.style.color = "white";
      resultsContainer.style.opacity = "0.7";
      resultsContainer.style.marginLeft = "25%";
      resultsContainer.style.fontWeight = "600";
      resultsContainer.style.width = "50%";
      resultsContainer.style.textAlign = "center";
      resultsContainer.style.ra = "center";
    } else { 
      theResults = `<h2 class="bad">Bad</h2> ${rightAnswers} From ${count} <h3> never stop trying </h3>`;
      // resultsContainer.innerHTML = theResults;
      // resultsContainer.style.padding = "10px";
      // resultsContainer.style.backgroundColor = "red";
      // resultsContainer.style.color = "black";
      // resultsContainer.style.opacity = "0.7";
      // resultsContainer.style.marginLeft = "25%";
      // resultsContainer.style.fontWeight = "600";
      // resultsContainer.style.width = "50%";
      // resultsContainer.style.textAlign = "center";
      // resultsContainer.style.borderRadius = "10px";
      theResults = document.createElement("h2");
      theResults.innerHTML = `Bad, ${rightAnswers} out of ${count} <h3> never stop trying </h3>`;
      theResults.classList.add("bad");
      theResults.style.backgroundColor = "red";
      theResults.style.color = "black";
      theResults.style.width = "50%";
      theResults.style.opacity = "0.7";
      theResults.style.marginLeft = "25%";
      theResults.style.fontWeight = "600";
      theResults.style.width = "50%";
      theResults.style.textAlign = "center";
      theResults.style.borderRadius = "10px";
      theResults.style.padding = "10px";

      
    }

    document.body.appendChild(theResults);

    // resultsContainer.innerHTML = theResults;
    // resultsContainer.style.padding = "10px";
    // resultsContainer.style.backgroundColor = "red";
    // resultsContainer.style.marginTop = "10px";


    
    
  }
  
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}