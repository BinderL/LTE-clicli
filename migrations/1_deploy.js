var MagicButton = artifacts.require("MiningButton");

module.exports = async function(deployer, network, accounts) {
	await deployer.deploy(MagicButton);

};
