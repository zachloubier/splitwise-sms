const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

const Group = require('./models/group');
const ChaseCharge = require('./models/charge/chase');
const SuccessMessage = require('./models/successMessage');

const PORT = 80;

const app = express();
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

let originalMessage;

app.post('/sms', async (req, res) => {
	const body = req.body.Body;

	console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

	let responseMessage;
	if (body.startsWith('Chase acct')) {
		const message = new ChaseCharge(body);
		originalMessage = message;
		responseMessage = await message.prepareConfirmationMessage();
	} else if (!isNaN(body[0])) {
		const groupNum = body[0];
		const expenseDescription = body.substring(1).trim();

		const group = new Group();
		const allGroups = await group.getAllGroups();
		
		group.setGroup(allGroups[groupNum]);

		const expense = await group.createExpense(originalMessage.dollarAmount, expenseDescription == ''? originalMessage.retailer : expenseDescription);

		const successMessage = new SuccessMessage();
		responseMessage = successMessage.prepareSuccessMessage(expense, group.group);
	}

	if (responseMessage) {
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(responseMessage.toString());
	}

	// const group = await Group.find('Miso');
	
	// Group.createExpense(group, 10, 'test expense via text');

	// res.writeHead(200, {'Content-Type': 'text/xml'});
	// res.end();
  });

http.createServer(app).listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
});