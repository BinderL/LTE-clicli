const Props = artifacts.require("PropsTesrien");
const Lands = require("../../client/src/data/props.json");
const Accounts = require("../ACCOUNTS/Accounts.json");

module.exports = async (callback) => {
	

	async function main() {
		const players = Accounts.accounts;
		const accounts = await web3.eth.getAccounts();
		const Nft = await Props.deployed();
		const items = Lands.items;
		for(var i=0;i<items.length;i++){
			await Nft.mint(players[i%5],i ,{from:accounts[0]});
		}
		callback();
	}

	main().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

}
