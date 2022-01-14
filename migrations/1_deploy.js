var MPs = artifacts.require("Rogue");
var WMATIC  = artifacts.require("./WMATIC.sol");
var UniswapV2Factory = artifacts.require("./UniswapV2Factory.sol");
var UniswapV2Router02 = artifacts.require("./UniswapV2Router02.sol");
var MasterChief = artifacts.require("./MasterChef");
var stMPs = artifacts.require("Tairreux");
var MPNft = artifacts.require("PropsTesrien");
var MagicButton = artifacts.require("MiningButton");
var MP = artifacts.require("MiningProtocol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(UniswapV2Factory, accounts[0]);
	const _factory = await UniswapV2Factory.deployed();
	await deployer.deploy(WMATIC);
	const _WMATIC = await WMATIC.deployed();
	await deployer.deploy(UniswapV2Router02, _factory.address, _WMATIC.address);
	await deployer.deploy(MPs);
	const _MPs = await MPs.deployed();
	await deployer.deploy(MasterChief, _MPs.address, accounts[0],100000000 ,10 , 100000000);
	const _masterchief = await MasterChief.deployed();
	await _MPs.allow(accounts[0], _masterchief.address);
  await _factory.createPair(_WMATIC.address, _MPs.address);
  const PairAddr = await _factory.getPair(_WMATIC.address, _MPs.address);
  await _masterchief.add(20, PairAddr, false);
  await deployer.deploy(stMPs, _MPs.address);
  console.log(PairAddr);
	await deployer.deploy(MPNft);
	await deployer.deploy(MagicButton);
	await deployer.deploy(MP, _MPs.address);
}
