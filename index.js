const quizData = [
  {
    question: 'Which data type is used to create a variable that should store text?',
    options: ['String', 'string', 'myString', 'txt'],
    answer: 'String',
  },
  {
    question: 'Which method can be used to return a string in upper case letters?',
    options: ['UpperCase()', 'toupperCase()', 'toUpperCase()', 'Touppercase()'],
    answer: 'toUpperCase()',
  },
  {
    question: 'To declare an array in Java, define the variable type with ?',
    options: ['{}', '()', '[]', '([])'],
    answer: '[]',
  },
  {
    question: 'How do you create a method in Java?',
    options: ['methodName.', 'methodName()', 'methodName[]', 'methodName{}'],
    answer: 'methodName()',
  },
  {
    question: 'Which operator can be used to compare two values?',
    options: ['> <','=', '< >','=='],
    answer: '==',
  },
  {
    question: 'How do you create a variable with the floating number 2.8?',
    options: ['byte x=2.8', ' x = 2.8f', 'int x= 2.8f', 'float x=2.8f;'],
    answer: 'float x=2.8f;',
  },
  {
    question: 'Which method can be used to find the length of a string?',
    
    options: [
      'getSize()',
      'len()',
      'length()',
      'getlength()',
    ],
    answer: 'length()',
  },
  {
    question: 'How do you create a variable with the numeric value 5?',
    options: ['float x=5;', 'int x=5', 'int x=5;', 'x=5;'],
    answer: 'int x=5;',
  },
  {
    question: 'What is a correct syntax to output "Hello World" in Java ?',
    options: [
      'echo("Hello World");    ',
      'System.out.println("Hello World"); ',
      'println("hello World")',
      'System.out.println("Hello World")',
    ],
    answer: 'System.out.println("Hello World"); ',
  },
  {
    question:'How do you start writing a while loop in Java?',
    options: ['while x>y {', 'while(x>y)', 'while x>y;', 'x>y while {'],
    answer: 'while(x>y)',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion(); 