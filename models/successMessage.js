const MessagingResponse = require('twilio').twiml.MessagingResponse;

class SuccessMessage {
	prepareSuccessMessage(expense, group) {
		const twiml = new MessagingResponse();

		let message = `Yay! You just added an expense of ${expense.description} to group ${group.name}`;

		twiml.message(message);

		return twiml;
	}
}

module.exports = SuccessMessage;