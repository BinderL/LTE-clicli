// SPDX-License-Identifier: Creative Commons
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Seed.sol";
import "./MPs.sol";

contract MiningButton  is ERC20, Killer {

	address public owner;
	address public winner;
	address public seed;
	Rogue rogue;

	uint public lastPush;
	bool drone;

	event Push(address winner);

	mapping (address => uint) public pushed;
	
	constructor(address _token) ERC20("MBs","MB tokens") {
		rogue = Rogue(_token);
		drone = false;
		owner = msg.sender;
		seed = address(this);
	}
			    
	function pushButton() external{
		require(_computeSeed() - lastPush > 0, "MagicButton: you can't push the button");
		if(!drone){
			drone=true;
			uint amount;
			if(pushed[msg.sender] == 0)
				amount = 1e18;
			else{
				uint _in = balanceOf(msg.sender)*totalSupply();
				uint _under = pushed[msg.sender]*lastPush;
				amount = _in/_under;
				amount = 1e12;
			}
			_mint(msg.sender, amount);
			rogue.mint(msg.sender, amount);
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
