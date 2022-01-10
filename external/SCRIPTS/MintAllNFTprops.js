const Props = artifacts.require("PropsTesrien");
const Lands = require("../../client/public/images/PROPS/props.json");

module.exports = async (callback) => {
	

	async function main() {
		const accounts = await web3.eth.getAccounts();
		const Nft = await Props.deployed();
		const items = Lands.items;
		const tokenIDs = await Promise.all(items.map(async (value,keys) => {
			await Nft.mint(accounts[keys%5]);
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
