//getting all required elements
var start_btn = document.querySelector('.start_btn');
var info_part = document.querySelector('.info_part');
var title = document.querySelector('#title');
var quiz_box = document.querySelector('.quiz_box');
var option_list = document.querySelector(".option_list"); 
var next_btn = quiz_box.querySelector('.next_btn')
var result_box = document.querySelector('.result_box');
var submit = document.querySelector('#submit');
var initials = document.querySelector("#initials");
var highscoresDiv = document.querySelector("#highscores");
var navhighscorelink = document.querySelector("#viewHighscores");  
var navlink = document.getElementById("viewHighscores");
var count=60;
var que_count = 0;
var userScore = 0;

// if start quiz button clicked
start_btn.onclick = ()=>{
    // info_part.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");  
    info_part.setAttribute("class","info_part activePart");
    timerCounter();
    showQuestions(0);
}

//countdown timer
function timerCounter()
{

var interval = setInterval(function(){
    // document.getElementById('timeSpan').innerHTML=count;
    // count--;
    if(count >= 0)
    {
        document.getElementById('timeSpan').innerHTML=count;
        count--;
    }
    else if(count === -1)
    {
        console.log(count);
        clearInterval(interval);
        document.getElementById('timeSpan').innerHTML='Done';
        showResultBox();
        // alert('You time is done');
    }
},1000);
}

next_btn.onclick = () => {
    if(que_count < questions.length - 1)
    {
    que_count++;
    showQuestions(que_count);
    next_btn.style.display = "none";
    }
    else{
        console.log("Questions completed");
     //   clearInterval(interval);
        showResultBox();
    }
}

//getting questions and options from array

function showQuestions(index){
   var que_text = document.querySelector(".que_text"); 
   var que_tag = '<span>'+questions[index].numb + "." + questions[index].question+'</span>';
   var option_tag ='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                    + '<div class="option">'+questions[index].options[1]+'<span></span></div>'
                    + '<div class="option">'+questions[index].options[2]+'<span></span></div>'
                    + '<div class="option">'+questions[index].options[3]+'<span></span></div>';
   que_text.innerHTML = que_tag;
   option_list.innerHTML = option_tag;

   var option = option_list.querySelectorAll(".option");
   for (i = 0; i < option.length; i++){
       option[i].setAttribute("onclick","optionselected(this)");
   }
   console.log(questions[index].length);
}

function optionselected(answer)
{
    var userAns = answer.textContent;
    var correctAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    if(userAns == correctAns)
    {
        userScore +=1;
        answer.classList.add("correct");
        console.log("Answer is correct");
    }
    else{
        answer.classList.add("incorrect");
        count -=3;

        console.log("Answer is wrong");

        // //if answer is incorrect then automatically selected the correct answer
        // for (let i = 0; i < allOptions; i++) {
        //     if(option_list.children[i].textContent == correctAns){
        //         option_list.children[i].setAttribute("class","option correct");
        //     }
        // }
    }

    //once user selected then disabled all option
    for(i = 0; i < allOptions; i++)
    {
        option_list.children[i].classList.add("disable");
    }
    next_btn.style.display = "block";
}


function showResultBox(){
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
  document.getElementById('finalscore').innerHTML=userScore;
  clearInterval(count);
  submit.addEventListener("click",Scores);
}

function Scores(event){
    event.preventDefault();
    var userName = initials.value.trim();

    if(userName === null || userName === '') {
        alert("Please enter user name");
        return;
     }

      //Create user object for storing highscore
        var user = {
            name : userName,
            score : userScore
        }

        console.log(user);

        highScores = JSON.parse(localStorage.getItem("previousScores"));    //get User highscores array in localStorage if exists
        
        if(highScores){
            highScores.push(user); //Push new user scores in array in localStorage
        }
        else{
            highScores = [user];    //If No user scores stored in localStorage, create array to store user object
        }
        
        // set new submission
        localStorage.setItem("highScores",JSON.stringify(highScores));

        showHighScores(); // Called function to display highscores

}



//function to show highscores
function showHighScores(){
   
    title.innerHTML = "Highscores";
    title.setAttribute("class","text-center text-info");
    title.style.display = "block";
    
    // quizContent.style.display = "none";
    result_box.style.display = "none";

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        tbl.setAttribute("id","table");
        tbl.style.textAlign = "center";

        var tblBody = document.createElement("tbody");

        var row = document.createElement("tr");
        
        var heading1 = document.createElement("th");    //table heading 1
        var headingText1 = document.createTextNode("Name");
        heading1.setAttribute("class","bg-info");
        heading1.appendChild(headingText1);
        row.appendChild(heading1);

        var heading2 = document.createElement("th");    //table heading 2
        var headingText2 = document.createTextNode("Score");
        heading2.appendChild(headingText2);
        heading2.setAttribute("class","bg-info");
        row.appendChild(heading2);

        tblBody.appendChild(row);
       
        var userLength = 0;
        if(highScores) {
            userLength = highScores.length;     //highScores array length stored in localStorage 
        }
        
        // creating all cells
        for (var i = 0; i < userLength ; i++) {
            
            // creates a table row
             var row = document.createElement("tr");
        
            var uname = highScores[i].name;
            var uscore = highScores[i].score;
            
            // Create a <td> element and a text node, make the textnode the contents of the <td>, and put the <td> at the end of the table row
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(uname);
            cell1.appendChild(cellText1);
            row.appendChild(cell1);

            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(uscore);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);
      
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        if(userLength > 0){
            tbl.appendChild(tblBody);
        }
        // appends <table> into <body>

        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width","100%");
        
        highscoresDiv.appendChild(tbl);

        var btnDiv = document.createElement("div");
        btnDiv.style.textAlign = "center";
        highscoresDiv.appendChild(btnDiv);
 
    navlink.style.display = "none";

    // Go Back button to go to start page
    var goback = document.createElement("button");
    goback.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    goback.textContent = "Go Back";
    btnDiv.appendChild(goback);
    
    // Event listener for go back button opens index.html page
    goback.addEventListener("click",function(){
        window.location= "index.html";
    });

    // Clear Highscores button : clears localStorage
    var clearscores = document.createElement("button");
    clearscores.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    clearscores.textContent = "Clear Highscores";
    btnDiv.appendChild(clearscores);
    
    // Event Listener for clear highscores button
    clearscores.addEventListener("click",function(){
        localStorage.clear();
        var table = document.querySelector("#table");
        table.style.display = "none";
    });
   
}

// Navigation link 'Highscores' event listener
navhighscorelink.addEventListener("click",function(){
    
    info_part.style.display = "none";  
    navlink.style.display = "none";
    
    highScores = JSON.parse(localStorage.getItem("highScores"));
    
    showHighScores(); //Calls function to show highscores

});

