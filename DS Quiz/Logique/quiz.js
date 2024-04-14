//Par Pierre Philippe MINTOGHE

document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');
    const numContainer = document.getElementById('num');
    let currentQuestionIndex = 0;
    let score = 0;
    let numquestion = 0;

// La fonction qui nous permet de sélectionner toutes les questions du fichier JSON.
    function loadQuestion(questionData) {
        const question = questionData.question;
        const options = questionData.options;
        let optionsHTML = '';
        options.forEach(option => {
            optionsHTML += `<label><input type="radio" name="option" value="${option}">${option}</label><br>`;
        });
        quizContainer.innerHTML = `<div>${question}</div><br>${optionsHTML}`;
        numquestion++;
        numContainer.innerHTML = `Question ${numquestion}/${questions.length}.`;
    }

// La foncction qui permet de nous afficher le score aprés avoir répondu aux questions. 
    function showResult() {
        if (score < 10) {
            resultContainer.innerHTML = `Malheuresement votre score est de ${score}/${questions.length}.`;
        }
        if (score >= 10 & score < 13 ) {
            resultContainer.innerHTML = `Bien, votre score est de ${score}/${questions.length}.`;
        }
        if (score >= 13 & score < 17 ) {
            resultContainer.innerHTML = `Bien joué, votre score est de ${score}/${questions.length}.`;
        }
        if (score >= 17 & score < 20 ) {
            resultContainer.innerHTML = `Très Bien , votre score est de ${score}/${questions.length}.`;
        }
        if (score = 20 ) {
            resultContainer.innerHTML = `Félicitation, vous avez trouvé toutes les réponses (${question.length}/${questions.length}).`;

        }
    }

// La foncction qui permet de nous afficher un popup au cas ou on voudrait sauter une question. 
    function showPopup(duration) {
        const popup = document.getElementById("popup-1");
        document.getElementById("popup-1").classList.toggle("active")        
        popup.style.display = 'block';
        setTimeout(function() {
            popup.style.display = 'none';
        }, duration);
    }

// La fonction qui vérifie si notre réponse est correct ou non.
    function checkAnswer() {
        const userAnswer = document.querySelector('input[name="option"]:checked');
        if (!userAnswer) {
            showPopup(2500); // Affiche le popup pendant 2.5 secondes
            return;
        }   else {
                const userAnswer = document.querySelector('input[name="option"]:checked').value;
                const correctAnswer = questions[currentQuestionIndex].answer;        
                if (userAnswer === correctAnswer) {
                score++;
            }
        }
        
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(questions[currentQuestionIndex]);
        } else {
            quizContainer.style.display = 'none';
            submitButton.style.display = 'none';
            numContainer.style.display = 'none';
            showResult();
        }

    }
    submitButton.addEventListener('click', checkAnswer);

// Ici charger les questions à partir du fichier JSON
    fetch('Questions/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion(questions[currentQuestionIndex]);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement des questions :', error)
        });
});
