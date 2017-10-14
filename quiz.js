// Required files
var inquirer = require('inquirer');
var flashCards = require('./fCards.js');
var questions = require('./myquestions.js').questions;

var clozeQuest = [];
var currentQuestion = 0;
var correctAns = 0;
var wrongAns = 0;

for (var i = 0; i < questions.length; i++) {
	var quest = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
	clozeQuest.push(quest);
}

function quizMe() {
	inquirer.prompt([
		{
			type: 'input',
			message: clozeQuest[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Confirm guess is correct
		if (answers.userGuess.toLowerCase() === clozeQuest[currentQuestion].cloze.toLowerCase()) {
			console.log('Yes, right!');
			correctAns++;
		} else {
			console.log('Sorry, wrong!');
			wrongAns++;
		}

		// Show answer
		console.log(clozeQuest[currentQuestion].full);
		console.log('**************************************\n');
        console.log('**************************************\n');

		// Go to next
		if (currentQuestion < clozeQuest.length - 1) {
			currentQuestion++;
			quizMe();
		} else {
			console.log('Game Complete...');
			console.log('Your Correct Answers = ' + correctAns);
			console.log('Your Incorrect Answers = ' + wrongAns);

			console.log('**************************************\n');
            console.log('**************************************\n');

			// Check to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
				
					currentQuestion = 0;
					correctAns = 0;
					wrongAns = 0;
					quizMe();
				} else {
					// Exit the game
					console.log('TERMINATED NODE SESSION.');
				}
			})
		}
	})
}


quizMe();

