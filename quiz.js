// //select all elements
// const start = document.querySelector("#start");
// const quiz = document.querySelector("#quiz");
// const question = document.querySelector("#question");
// const choiceA = document.querySelector("#A");
// const choiceB = document.querySelector("#B");
// const choiceC = document.querySelector("#C");
// const counter = document.querySelector("#counter");

//create questions
var questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  }
];

//countdown timer
// var count=60;
// var interval = setInterval(function(){
//     document.getElementById('timeSpan').innerHTML=count;
//     count--;
//     if(count === -1)
//     {
//         clearInterval(interval);
//         document.getElementById('timeSpan').innerHTML='Done';
//         alert('You time is done');
//     }
// },1000);
