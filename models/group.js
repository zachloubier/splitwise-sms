const Splitwise = require('./splitwise');

class Group extends Splitwise {
	async find(groupName) {
		const groups = await this.sw.getGroups();

		return groups.find(g => {
			return g.name.toLowerCase() === groupName.toLowerCase();
		});
	}

	async getOtherMemberInGroup(group) {
		const me = await this.getCurrentUser();

		return group.members.find(user => {
			return user.id !== me.id;
		});
	}

	async createExpense(group, amount, description) {
		const me = await this.getCurrentUser();
		const otherUser = await this.getOtherMemberInGroup(group);
	
		const expense = await this.sw.createDebt({
			from: me.id,
			to: otherUser.id,
			group_id: group.id,
			description: description,
			amount: amount
		});
	
		console.log('expense', expense)
	}
}

module.exports = Group;