// SPDX-License-Identifier: Creative Commons
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Seed.sol";

contract MiningButton  is ERC20, Killer {

	address public winner;
	address public seed;
	address owner;
	
	uint lastPush;
	bool drone;
	
	mapping (address => uint) public pushed;
	
	constructor() ERC20("MiningButton", "MB") {
		drone = false;
		owner = msg.sender;
		seed=address(this);
	}
			    
	function pushButton() external{
		require(lastPush - _computeSeed() > 0, "MagicButton: you can't push the button");
		if(!drone){
			drone=true;
			pushed[msg.sender]++;
			uint amount;
			if(totalSupply() == 0)
				amount = 1;
			else
				amount=balanceOf(msg.sender)*totalSupply();
			_mint(msg.sender, amount);
			lastPush = block.timestamp;
			pushed[msg.sender]++;
			drone=false;
		}
	}	


	function seeding(address _contract) external{
		require(msg.sender != owner,"MagicButton: you already code the seed fullish"); 
		seed = _contract;
	}

	function _computeSeed() internal view returns(uint){
		if (seed==address(0)){
			return block.timestamp-10;
		}
		else
			return computeSeed();
	}
}
