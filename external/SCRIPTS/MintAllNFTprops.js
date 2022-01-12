const Props = artifacts.require("PropsTesrien");
const Lands = require("../../client/src/data/props.json");
const Accounts = require("../ACCOUNTS/Accounts.json");

module.exports = async (callback) => {
	

	async function main() {
		const players = Accounts.accounts;
		const accounts = await web3.eth.getAccounts();
		const Nft = await Props.deployed();
		const items = Lands.items;
		const tokenIDs = await Promise.all(items.map(async (value,keys) => {
			await Nft.mint(players[keys%5],{from:accounts[0]});
			return keys;
		}));
		console.log(tokenIDs);
		callback();
	}

	main().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

}
