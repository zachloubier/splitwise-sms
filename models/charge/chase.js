const Charge = require('../charge');

class ChaseCharge extends Charge {
	cardName;

	constructor(messageText) {
		super(messageText);

		this.cardName = 'Chase'
	}

	parseDollarAmount() {
		const regex = /\$(\d+\.\d+)/m;
		let m;

		if ((m = regex.exec(this.messageText)) !== null) {
			return m[1];
		}

		return false;
	}

	parseRetailer() {
		const regex = /\$\d+\.\d+\sat\s(\S+)\son/m;
		let m;

		if ((m = regex.exec(this.messageText)) !== null) {
			return m[1];
		}

		return false;
	}
}

module.exports = ChaseCharge;