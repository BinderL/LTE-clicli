const Props = artifacts.require('PropsTesrien');
const {expectRevert} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');

contract("MPNft.sol", function (accounts){
	const owner = accounts[0];
	const player1 = accounts[1];
	const player2 = accounts[2];

	let MPNft;
	context("Unit test", function(){

		beforeEach(async () => {
			MPNft = await Props.new();
		});
		
		it("... test de la fonction mint", async () => {
			await expectRevert(MPNft.mint(player1,{from:player1}), "PropsTesrien: caller is not owner");
			await MPNft.mint(player1,{from:owner});
			const balance = await MPNft.balanceOf(player1);
			expect(balance.toNumber()).to.equal(1,"balance != what has been minted")
		});

		it("... test de la fonction burn", async () => {
			await MPNft.mint(player1,{from:owner});
			var balance = await MPNft.balanceOf(player1);
			expect(balance.toNumber()).to.equal(1,"balance != what has been minted")
			await expectRevert(MPNft.burn(0,{from:owner}),"PropsTesrien: caller is not owner nor approved.");
			await MPNft.burn(0, {from:player1});
			balance = await MPNft.balanceOf(player1);
			expect(balance.toNumber()).to.equal(0,"balance != what has been minted")
		});

	});
	context("integration test", function(){
		it("... multiple mint burn", async () => {
			MPNft = await Props.new();
			await MPNft.mint(player1);
			var balance = await MPNft.balanceOf(player1);
			var burned = balance.toNumber();
			await MPNft.burn(0, {from:player1});
			await MPNft.mint(player1);
			var tokenID = await MPNft.tokenByIndex(0);

			expect(burned + 1).to.equal(tokenID.toNumber()+1,"tokenID != what has been minted and burned")
		});
	});
	
})
