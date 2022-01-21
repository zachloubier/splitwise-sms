const Splitwise = require('./splitwise');

class Group extends Splitwise {
	group;
	allGroups;

	constructor(group) {
		super();
		
		if (group) {
			this.setGroup(group);
		}
	}

	setGroup(group) {
		this.group = group;
	}

	async find(groupName) {
		const groups = await this.getAllGroups();

		this.setGroup(groups.find(g => {
			return g.name.toLowerCase() === groupName.toLowerCase();
		}));

		return this;
	}

	async getAllGroups() {
		if (!this.allGroups) {
			this.allGroups = await this.sw.getGroups();
		}

		return this.allGroups;
	}

	async getOtherMemberInGroup() {
		const me = await this.getCurrentUser();

		return this.group.members.find(user => {
			return user.id !== me.id;
		});
	}

	async createExpense(amount, description) {
		const me = await this.getCurrentUser();
		const otherUser = await this.getOtherMemberInGroup(this.group);
	
		return await this.sw.createDebt({
			from: me.id,
			to: otherUser.id,
			group_id: this.group.id,
			description: description,
			amount: amount
		});
	}
}

module.exports = Group;