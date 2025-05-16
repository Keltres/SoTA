// Вопросы и ответы
const questions = [
    {
        question: "Столица Франции?",
        type: "single",
        answers: ["Берлин", "Париж", "Мадрид"],
        correct: 1 // Индекс правильного ответа (Париж)
    },
    {
        question: "Какие языки программирования вы знаете?",
        type: "multiple",
        answers: ["Python", "JavaScript", "PHP"],
        correct: [0, 1] // Правильные: Python и JavaScript
    }
];

// Показываем вопросы на странице
function renderQuiz() {
    let html = '';
    questions.forEach((q, i) => {
        html += `<div class="question" id="q${i}">
            <h3>${q.question}</h3>`;
        
        q.answers.forEach((a, j) => {
            if (q.type === "single") {
                html += `<input type="radio" name="q${i}" value="${j}"> ${a}<br>`;
            } else {
                html += `<input type="checkbox" name="q${i}" value="${j}"> ${a}<br>`;
            }
        });
        
        html += `</div>`;
    });
    
    document.getElementById("quiz").innerHTML = html;
}

// Проверяем ответы
function checkAnswers() {
    questions.forEach((q, i) => {
        const questionDiv = document.getElementById(`q${i}`);
        
        if (q.type === "single") {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) {
                questionDiv.classList.add("correct");
            } else {
                questionDiv.classList.add("wrong");
            }
        } else if (q.type === "multiple") {
            const selected = document.querySelectorAll(`input[name="q${i}"]:checked`);
            const selectedValues = Array.from(selected).map(el => parseInt(el.value));
            
            // Проверяем, совпадают ли ответы
            const isCorrect = 
                selectedValues.length === q.correct.length &&
                q.correct.every(val => selectedValues.includes(val));
            
            if (isCorrect) {
                questionDiv.classList.add("correct");
            } else {
                questionDiv.classList.add("wrong");
            }
        }
    });
}

// Кнопка "Проверить"
document.getElementById("check-btn").addEventListener("click", checkAnswers);

// Запускаем тест при загрузке страницы
renderQuiz();