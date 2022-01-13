const {expectRevert, expectEvent} = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

const MagicButton = artifacts.require('MiningButton');

contract('MagicButton', function (accounts) {

	const _accounts = accounts;

	beforeEach(async() => {
		_MB = await MagicButton.new();
	});

	context("... MagicButton testing", async() => {
		
		it("push button testing", async() => {
			const result = await _MB.pushButton({from:accounts[1]});
			const balance = await _MB.balanceOf(accounts[1]);
			expect(balance.toNumber(),1,"pushButton fulfield");
			_winner = await _MB.winner();
			expect(_winner,accounts[1],"curent winner is not the last pusher");
			await expectEvent(result, 'Push', { winner:accounts[1] });
		});
	});
})
