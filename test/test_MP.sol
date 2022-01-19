
// SPDX-License-Identifier: CC

pragma solidity ^0.8.11;

import "../contracts/MP.sol";
import "../contracts/MPs.sol";
import "../contracts/MPNft.sol";
import "../contracts/MagicButton.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract MPtesting is MiningProtocol{

	PropsTesrien generator;

	constructor()MiningProtocol(
		Rogue(DeployedAddresses.Rogue()), 
		DeployedAddresses.MiningButton(),
		ERC721Burnable(DeployedAddresses.PropsTesrien())){}

	function testRemoveElementFromArray() public {
		Item memory _item;
		_item.tokenId = 0;
		pirates[0].coffre.push() = _item;
		_item.tokenId = 1;
		pirates[0].coffre.push() = _item;
		_item.tokenId = 2;
		pirates[0].coffre.push() = _item;

    Assert.equal(pirates[0].coffre[1].tokenId, 1, "Should store the value 1.");
		_remove(1,0);
    Assert.equal(pirates[0].coffre[1].tokenId, 2, "Should store the value 2.");
    Assert.equal(pirates[0].coffre.length, 2, "Should be size 2.");
	}


	function testRandom() public{
		uint random = _charnier();
		uint random1 = random%100;
		uint random2 = random%1000/10;
		Assert.isBelow(random1,100,"should return int between 0 and 100");
		Assert.notEqual(random1, random2,"not equal");
	} 

	function testDigitExtractionFromRandom() public{
		_digit();
	}

	function testIncreaseOldness() public {	
		_hire(0,40);
		Assert.equal(pirates[2].coffre[2].tokenId, 10 , "It should be 10.");
		_digit();
		_bamboche(0,2);
		uint oldestOf = pirates[2].coffre[0].amarrer;
		Assert.equal(oldestOf, 2, "should be advanced round 2");
	}

	function testScoring() public {
		_hire(0, 1);
		_cale(0);
	}

	function _hire(uint id, uint idM) internal {
		if(id < idM){
			uint tokenId = id;
			Item memory _item;
			_item.tokenId = tokenId;
			_item.amarrer = 1;
			_item.value = 10;
			_item.lordLand = msg.sender;
			pirates[id % 4].coffre.push() = _item;
			_hire(id + 1, idM);
		}
	}

}




