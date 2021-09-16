import fetch from 'node-fetch';
import fs from 'fs';

const COMMIT_REGEX = /#[0-9]+ - .*/;

checkCommitMessage();

async function userAction(issueNumber) {
	const response = await fetch('https://api.github.com/repos/hamurabiaraujo/sisbank/issues');
	const data = await response.json();
	const issueFound = data.find(issue => {
		return issue.number == issueNumber;
	});
	return issueFound;
}

async function checkCommitMessage() {
	
	const message = fs.readFileSync(process.argv[2], 'utf8').trim();
	let issueNumber;
	try {
		issueNumber = parseInt(message.match(/#([0-9]+) -/ig)[0].replace( /[^\d]/g, '' ), 10)
	} catch {
		handleBadCommitMessage();
	}

	const issueFound = await userAction(issueNumber);

	if(!COMMIT_REGEX.test(message)){
		handleBadCommitMessage();
	}
	
	if(!issueFound){
		handleNotFoundGithubIssue();
	}

  	process.exit(0);
}

function handleBadCommitMessage() {
	console.log('There is something wrong with your commit message');
	console.log('Your commit message is not following the pattern #NUM_ISSUE – MESSAGE');
	console.log('your commit will be rejected. Please re-commit your work again with a proper commit message.');
	process.exit(1);
}

function handleNotFoundGithubIssue() {
	console.log('There is something wrong with your commit message');
	console.log('Your commit message has a not found issue number');
	console.log('your commit will be rejected. Please re-commit your work again with a proper commit message.');
	process.exit(1);
}
