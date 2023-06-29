const questions = [
  {
    question: 'Какой язык работает в браузере?',
    answers: ['Java', 'C', 'Python', 'JavaScript'],
    correct: 4,
  },
  {
    question: 'Что означает CSS?',
    answers: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    correct: 2,
  },
  {
    question: 'Что означает HTML?',
    answers: [
      'Hypertext Markup Language',
      'Hypertext Markdown Language',
      'Hyperloop Machine Language',
      'Helicopters Terminals Motorboats Lamborginis',
    ],
    correct: 1,
  },
  {
    question: 'В каком году был создан JavaScript?',
    answers: ['1996', '1995', '1994', 'все ответы неверные'],
    correct: 2,
  },
];

//Game const
const headerContainer = document.querySelector('#header'),
  listContainer = document.querySelector('#list'),
  submitButton = document.querySelector('#submit');

////////////////////////////////////////////////////////////////
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitButton.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = ``;
  listContainer.innerHTML = ``;
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    '%title%',
    questions[questionIndex]['question']
  );
  headerContainer.innerHTML = title;

  let answerNumber = 1;

  for (answer of questions[questionIndex]['answers']) {
    const questionTemplate = `
				<li>
					<label>
						<input value="${answerNumber}" type="radio" class="answer" name="answer" />
						<span>${answer}</span>
					</label>
				</li>`;

    listContainer.innerHTML += questionTemplate;
    answerNumber++;
  }
}
function checkAnswer() {
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
  if (!checkRadio) {
    submitButton.blur();
    return;
  }
  const userAnswer = +checkRadio.value;

  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  }
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}
function showResults() {
  let title, message;
  if (score === questions.length) {
    title = 'Молодец';
    message = 'Вы ответели на все вопросы!!!🥳🥳🥳';
  } else if ((score * 100) / questions.length >= 50) {
    title = 'Хорошо справились,но надо ще постараться😉😉😉';
    message = 'Вы ответели на половину  вопросов!!!🥳🥳🥳';
  } else {
    title = 'Не растраивайся,в следующий раз обязательно получится😉';
    message = 'Вы ответели на малую часть  вопросов!!!🥳🥳🥳';
  }
  const resTemplate = `
  	<h2 class="title">${title}</h2>
  	<h3 class="summary">${message}</h3>
  	<p class="result">${score}/${questions.length}</p>`;
  listContainer.innerHTML += resTemplate;

  submitButton.blur();
  submitButton.innerHTML = `Начать занаво`;
  submitButton.onclick = () => {
    history.go();
  };
}
