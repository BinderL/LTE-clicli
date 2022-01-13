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

	event Push(address winner);

	mapping (address => uint) public pushed;
	
	constructor() ERC20("MiningButton", "MB") {
		drone = false;
		owner = msg.sender;
		seed=address(this);
	}
			    
	function pushButton() external{
		require(_computeSeed() - lastPush > 0, "MagicButton: you can't push the button");
		if(!drone){
			drone=true;
			uint amount;
			if(pushed[msg.sender] == 0)
				amount = 1;
			else{
				uint _in = balanceOf(msg.sender)*totalSupply();
				uint _under = pushed[msg.sender]*lastPush;
				amount = _in/_under;
			}
			_mint(msg.sender, amount);
			lastPush = block.number;
			pushed[msg.sender]++;
			winner = msg.sender;
			drone=false;
			emit Push(winner);
		}
	}	


	function seeding(address _contract) external{
		require(msg.sender != owner,"MagicButton: you already code the seed fullish"); 
		seed = _contract;
	}

	function _computeSeed() internal view returns(uint){
		if (seed==address(this)){
			if(lastPush == 0)
				return 1;
			else
				return block.number + 10;
		}
		else
			return computeSeed();
	}

}
