let currentQuestion = 0;
let scores = {};

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  const choice = selected.value;
  scores[choice] = (scores[choice] || 0) + 1;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showQuestion() {
  const q = questions[currentQuestion];
  const container = document.getElementById('question-box');
  container.innerHTML = `<h2>${q.question}</h2>`;

  for (const [character, label] of Object.entries(q.answers)) {
    container.innerHTML += `
      <label>
        <input type="radio" name="answer" value="${character}" />
        ${label}
      </label><br/>
    `;
  }
}

function showResult() {
  document.getElementById('question-box').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';

  const topCharacter = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];

  document.getElementById('result-box').innerHTML =
    `<h2>You are: ${topCharacter}!</h2>`;
}

window.onload = showQuestion;
