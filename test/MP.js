const {expectRevert, expectEvent} = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

const MP = artifacts.require('MiningProtocol');
const MB = artifacts.require("MiningButton");
const MPs = artifacts.require("Rogue");
const Treasure = artifacts.require("PropsTesrien");

contract('MP.sol', function (accounts) {

	beforeEach(async() => {
		treasure = await Treasure.new();
		await treasure.mint(accounts[1], 0);
		mps = await MPs.new();
		mb = await MB.new(mps.address);
		mp = await MP.new(mps.address, mb.address, treasure.address);
		await mps.allow(accounts[0],mb.address);
		await mps.mint(accounts[1], 10000);
	});

	context("... Unit test", async() => {
		
		const puits = async (_amount, _id) => {
			await mps.mint(accounts[1],_amount);
			await treasure.mint(accounts[1], _id);
			await mps.approve(mp.address, _amount, {from:accounts[1]});
			await treasure.approve(mp.address, _id, {from:accounts[1]});
		}

		const run = async(_id, _idM) => {
			if(_id < _idM){
				await treasure.mint(accounts[1],_id);
				await puits(10, _id);
				await mp.pourParler(10, _id, {from:accounts[1]});
				run(_id+1, _idM);
			}
		}

		it("random number", async () => {
			await mp._digit();
			const digits = await mp.digits
		});

		it("Bourse", async () => {
			const bourse = await mp.bourse();
			expect(bourse.toNumber(), 0, "pirate not good without consent");
		});

		it("Deposit", async() => {
			await puits(100, 1);
			const result = await mp.pourParler(100, 1, {from:accounts[1]});
			await expectEvent(result, 'Depot', { player:accounts[1], tokenId:"1", amount:"100"});
			var lock = await treasure.balanceOf(mp.address);
			expect(lock, 1, "treasure was not embed");
			lock = await mps.balanceOf(mp.address);
			expect(lock, 100, "pirate you don't pay the right");
		});

		it("Run", async () => {
			await mp.cale(0);
			var mined = await mb.balanceOf(mp.address);
			expect(mined, 100000, "boarding failed");
		});

		it("Prime", async () => {
			await puits(10, 1);
			await mp.pourParler(10, 1, {from:accounts[1]});
			const tokensId = await mp.prime(0);
			expect(tokensId[0], 0, "Sometime treasure is lost");
		});

		it("delete asset from the protocol", async () => {
			await puits(10, 1);
			expectRevert(mp.marcheSurLaPlanche(0,0), "MP: have you ever dream about saying what you want moussaillon ?");
			var land = await mp.lordLand(accounts[1]);	
			expect(land["treasures"].toNumber(), 0, "already deposed");
			land = await treasure.balanceOf(accounts[1]);
			await mp.pourParler(10, 1, {from:accounts[1]});
			land = await mp.lordLand(accounts[1]);	
			expect(land["treasures"].toNumber(), 1, "has not been deposed");
			await mp.marcheSurLaPlanche(1,0,{from:accounts[1]});
			land = await mp.lordLand(accounts[1]);	
			expect(land["treasures"].toNumber(), 1, "has not been burn");
		
		});

		it("get pending reward for next interact with MP ", async() => {
			const pendingMPs = await mp.pendingMPs(0, accounts[1]);
			console.log(pendingMPs.toNumber());

		});
	});
})
