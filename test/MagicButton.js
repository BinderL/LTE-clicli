const {expectRevert, expectEvent} = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

const MagicButton = artifacts.require('MiningButton');
const Rogue = artifacts.require("Rogue");
contract('MagicButton', function (accounts) {

	const _accounts = accounts;

	beforeEach(async() => {
		_MPs = await Rogue.new();
		_MB = await MagicButton.new(_MPs.address);
		await _MPs.allow(accounts[0],_MB.address);
	});

	context("... MagicButton testing", async() => {
		
		it("push button testing", async() => {
			const result = await _MB.pushButton({from:accounts[1]});
			var balance = await _MB.balanceOf(accounts[1]);
			balance = web3.utils.fromWei(balance.toString(),"ether");
			var expected = web3.utils.fromWei(1e18.toString(),"ether");
			expect(balance,expected,"pushButton fulfield");
			_winner = await _MB.winner();
			expect(_winner,accounts[1],"curent winner is not the last pusher");
			await expectEvent(result, 'Push', { winner:accounts[1] });
		});
	});
})
