
const { liquidity, mint } = require("./liquidityPlayer.js");
const engine = require("./engine.js");


const Rogue = artifacts.require("Rogue");
const Factory = artifacts.require("UniswapV2Factory");
const Router = artifacts.require("UniswapV2Router02");
const Pair = artifacts.require("UniswapV2Pair");
const WMatic =  artifacts.require("./WMATIC");
const Masterchef = artifacts.require("./MasterChef");


module.exports = async function(callback) {

	async function main() {	
		const accounts = await web3.eth.getAccounts();

		const MPs = await Rogue.deployed();
		const factory = await Factory.deployed();
		const router = await Router.deployed();
		const wMatic = await WMatic.deployed();
		const masterchef = await Masterchef.deployed();
		await mint({
			account : accounts[1],
			wMatic : wMatic,
			token : MPs,
			amount : 5,
			BN : web3.utils.toWei
			});

		const pair = await liquidity({
			Pair : Pair,
			account : accounts[1],
			factory : factory,
			token1 : wMatic,
			token2 : MPs,
			amount : [2,1],
			BN : web3.utils.toWei
			});
		const LpTokenAmount = await pair.balanceOf(accounts[1]);
		let poolInfo0 = await masterchef.poolInfo(0);
		await pair.approve(masterchef.address, LpTokenAmount.toString(),{from:accounts[1]});
		await masterchef.deposit(0, LpTokenAmount.toString(),{from:accounts[1]});
		
		var earn = await masterchef.pendingBst(0, accounts[1]);
		console.log("before run claimable MPs = ", earn.toString()) 
		await engine.run(web3.eth.sendTransaction, accounts[0], 0, 100);
		earn = await masterchef.pendingBst(0, accounts[1]);
		console.log("after run claimable MPs = ", earn.toString()) 
		callback();
	}

	main().catch((error) => {
  	console.error(error);
  	process.exitCode = 1;
	});
};

