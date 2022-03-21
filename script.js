//getting all required elements
var start_btn = document.querySelector('.start_btn');
var info_part = document.querySelector('.info_part');
var quiz_box = document.querySelector('.quiz_box');
var option_list = document.querySelector(".option_list"); 
var next_btn = quiz_box.querySelector('.next_btn')
var result_box = document.querySelector('.result_box');
var submit = document.querySelector('#submit');
var initials = document.querySelector("#initials");
var count=60;

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

var que_count = 0;
var userScore = 0;



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
}

submit.addEventListener("click", function(event){
event.preventDefault();
var result ={
    initialsname : initials.value.trim()
};
localStorage.setItem('user',JSON.stringify(result));
window.location.reload();
});


// submit.addEventListener("click", addToHighscores);
// function addToHighscores() {
//     var highScoreElement = document.createElement("li");
//     var highscoreStr = initials.value + " - " + correctScore;
//     localHighscoresArray.push(highscoreStr);
//     var highscoreArrayStr = localHighscoresArray.toString();
//     highScoreElement.textContent = highscoreStr;
//     highScoresList.append(highScoreElement);
//     localStorage.setItem("highscore", localHighscoresArray);
//     justRegistered = true;
//     initials.value = "";
//     // Modal
//     $("#staticBackdrop").modal("show");
//   }