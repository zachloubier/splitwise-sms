const MessagingResponse = require('twilio').twiml.MessagingResponse;
const Group = require('./group');

class Charge {
	messageText;
	dollarAmount;
	retailer;
	cardName;

	constructor(messageText) {
		this.messageText = messageText;
		this.dollarAmount = this.parseDollarAmount();
		this.retailer = this.parseRetailer();
	}

	parseDollarAmount() {
		throw new Error('Cannot parse dollar amount of non specific message');
	}
	
	parseRetailer() {
		throw new Error('Cannot parse retailer of non specific message');
	}

	async prepareConfirmationMessage() {
		if (this.dollarAmount) {
			const twiml = new MessagingResponse();

			const group = new Group();
			const allGroups = await group.getAllGroups();
			
			let confirmationMessageText = `A charge was just posted to your ${this.cardName} card for ${this.dollarAmount} at ${this.retailer}. Would you like to add it to one of these splitwise groups?`;
			allGroups.forEach((g, i) => {
				if (g.name !== 'Non-group expenses') {
					confirmationMessageText += `\n ${i} - ${g.name}`;
				}
			})
			
			twiml.message(confirmationMessageText);
			
			return twiml;
		}

		return false;
	}
}

module.exports = Charge;