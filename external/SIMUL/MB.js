
const engine = require("./engine.js");

const MB = artifacts.require("./MiningButton");

module.exports = async function(callback) {
async function main() {	
	
	async function play(){
		run = async (pushed, n) => {
			if (pushed < n){
				await _MB.pushButton({from:accounts[1]});
				await engine.run(web3.eth.sendTransaction, accounts[0], 0, 20);
				pushed++;
				await run(pushed,n);
			}
		}
		await run(0,10);
	}

	const accounts = await web3.eth.getAccounts();

		const _MB = await MB.deployed();
		console.log("let the game begin");
		var winner = await _MB.winner();
		console.log("before push button winner is ", winner); 
		await play();
		winner = await _MB.winner();
		const balance = await _MB.balanceOf(accounts[1]);
		console.log("after push button winner is ", winner, balance.toNumber());
		callback();
	}

	main().catch((error) => {
  	console.error(error);
  	process.exitCode = 1;
	});
};

