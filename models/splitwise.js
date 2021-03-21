const sw = require('splitwise');

// const API_KEY = 'xVyQJ5Tqeerl8mfYa3djmooGku774JLvweNSsTU9';
const CONSUMER_KEY = 'Qp42OJhghuxyIPhgIxq784RGbQVukYy6BpQ1pA2Y';
const CONSUMER_SECRET = '9VIWlKySIAcmuaPUJLB77jAO51dMN9lysL9NCWWt';


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