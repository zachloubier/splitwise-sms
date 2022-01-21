const sw = require('splitwise');

// const API_KEY = '';
const CONSUMER_KEY = '';
const CONSUMER_SECRET = '';


class Splitwise {
	currentUser;

	constructor() {
		this.sw = sw({
			consumerKey: CONSUMER_KEY,
			consumerSecret: CONSUMER_SECRET
		});
	}

	async getCurrentUser() {
		if (!this.currentUser) {
			this.currentUser = await this.sw.getCurrentUser();
		}
		
		return this.currentUser;
	}
}

module.exports = Splitwise;