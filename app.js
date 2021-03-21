const express = require('express');


// const Splitwise = require('./models/splitwise');
const Group = require('./models/group');

// const groupId = 23084090;


// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/sms', async (req, res) => {
	console.log('text message', req);

	const group = await Group.find('Miso');
	
	Group.createExpense(group, 10, 'test expense via text');

	// res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end();
  });

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});