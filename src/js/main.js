$(function() {
  // wait for document ready
  // init
  var controller = new ScrollMagic.Controller();

  // define movement of panels
  var wipeAnimation = new TimelineMax()
    .fromTo(
      'section.panel.log-2',
      1,
      { x: '-100%' },
      { x: '0%', ease: Linear.easeNone }
    ) // in from left
    .fromTo(
      'section.panel.log-3',
      1,
      { x: '100%' },
      { x: '0%', ease: Linear.easeNone }
    ) // in from right
    .fromTo(
      'section.panel.log-4',
      1,
      { y: '-100%' },
      { y: '0%', ease: Linear.easeNone }
    ); // in from top

  // create scene to pin and link animation
  new ScrollMagic.Scene({
    triggerElement: '#pinContainer',
    triggerHook: 'onLeave',
    duration: '300%'
  })
    .setPin('#pinContainer')
    .setTween(wipeAnimation)
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
});

// Log zero form

// Questions Array
let questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password' }
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
let inputProgress = document.querySelector('#input-progress');
let progress = document.querySelector('#progress-bar');

const login = document.querySelector('#login');

const signup = document.querySelector('#sign-up');
const allmem = document.querySelector('#all-mem');
let contain1 = document.getElementById('container1');
let log0 = document.querySelector('.log-0 ');
// EVENTS

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);
// Next Button Click
nextBtn.addEventListener('click', validate);
prevBtn.addEventListener('click', previous);
login.addEventListener('click', getQuestion2);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

function getQuestion2() {
  position = 0;
  questions = [
    { question: 'Enter Username' },
    { question: 'Enter Password', type: 'password' }
  ];
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus On Elementdfs
  inputField.focus();
  progress.style.width = (position * 100) / questions.length + '%';

  let reg = document.querySelector('#reg');
  reg.innerHTML = `<button id="register" class="btn btn-primary">Register</button>`;
  log0.style.background = 'linear-gradient(#fff, #909722)';

  login.classList.add('invisible');
  signup.innerHTML = 'Login';
  allmem.innerHTML = 'Need to create an account?';
  inputProgress.style.borderBottom = '3px solid #909722';
  progress.style.background = '#cdd37d';
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field Input Passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

function previous() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position--;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.classList.add('close');
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

// All Fields Complete - Show h1 end
function formComplete() {
  let h1 = document.getElementById('complete');
  contain1.className = 'close';
  h1.innerHTML = `Thanks ${questions[0].answer} You are registered and will get an email shortly`;

  setTimeout(() => {
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}

// Second Page of login

// My Crappy JS Skills :/

$('.sign-up').on('click', function() {
  $('.button').addClass('expanded');
  $('.sign-up').addClass('hidden');
  $('.content').addClass('background');
  $('button').removeClass('hidden');
  $('form').toggleClass('hidden');
});

$('#button').on('click', function() {
  $(this).addClass('fab');
  $('form').addClass('hidden');
  $('.button').addClass('full');
  $('.text').remove();
  $('.header').removeClass('hidden');
});

// form number 3

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.overlay-container');
const signInContainer = document.querySelector('.sign-in-container');
const signUpContainer = document.querySelector('.sign-up-container');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
signInButton.addEventListener('click', () => {
  container.classList.add('move');
  signUpContainer.classList.add('move-left');
  signInContainer.classList.add('move-right');
  right.classList.add('move-down');
});

signUpButton.addEventListener('click', () => {
  container.classList.remove('move');
  signUpContainer.classList.remove('move-left');
  signInContainer.classList.remove('move-right');
  right.classList.remove('move-down');
});
