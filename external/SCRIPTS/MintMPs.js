const Rogue = artifacts.require("Rogue");
const Accounts = require("../ACCOUNTS/Accounts.json");

module.exports = async (callback) => {
	

	async function main() {
		const players = Accounts.accounts;
		const accounts = await web3.eth.getAccounts();
		const MPs = await Rogue.deployed();
		const tx = await Promise.all(players.map(async (value,keys) => {
			await MPs.mint(value, 1000000,{from:accounts[0]});
			return keys;
		}));
		console.log(tx);
		callback();
	}

	main().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

}
