document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br><br>' + quiz.score + ' puncte</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Felicitari!<br>Rezultatul obtinut demonstreaza ca ai invatat bine la Religie!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu prea ai invatat bine la Religie!</h2>';
			} else {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu ai invatat nimic la Religie!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('Care este cea mai importanta localitate din Israel?', ['Ierusalim', 'Nazaret', 'Betleem', 'Capernaum'], 'Ierusalim'),
		new FormatQuestion('Cine stapanea Tara Sfanta pe vremea Mantuitorului?', ['Fenicienii', 'Egiptenii', 'Grecii', 'Romanii'], 'Romanii'),
		new FormatQuestion('In ce localitate se afla Biserica Nasterii Domnului?', ['Ierusalim', 'Nazaret', 'Betleem', 'Ierihon'], 'Betleem'),
		new FormatQuestion('Pe ce data se sarbatoreste Nasterea Domnului?', ['6 decembrie', '24 decembrie', '25 decembrie', '1 ianuarie'], '25 decembrie'),
		new FormatQuestion('Cine este cel care l-a botezat pe Domnul Iisus?', ['Sfantul Apostol Andrei', 'Sfantul Proroc Ioan', 'Sfantul Apostol Petru', 'Sfantul Proroc Ilie'], 'Sfantul Proroc Ioan'),
		new FormatQuestion('In ce râu a avut loc Botezul Domnului Iisus?', ['Eufrat', 'Cherit', 'Iordan', 'Nipru'], 'Iordan'),
		new FormatQuestion('La cate zile dupa Rastignire a inviat Domnul Iisus?', ['3 zile', '7 zile', '40 de zile', '50 de zile'], '3 zile'),
		new FormatQuestion('La cate zile dupa Inviere a avut loc Inaltarea Domnului?', ['5 zile', '7 zile', '40 de zile', '50 de zile'], '40 de zile'),
		new FormatQuestion('Cum se numeste Taina prin care ni se iarta pacatele?', ['Mirungerea', 'Spovedania', 'Cununia', 'Maslul'], 'Spovedania'),
		new FormatQuestion('De ce „Tatal nostru” este cea mai importanta rugaciune?', ['Ne ferim de ispite', 'E rostita de Domnul Iisus', 'Este adresata Tatalui', 'Contine 7 cereri'], 'E rostita de Domnul Iisus')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});