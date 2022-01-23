// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Rogue is ERC20 {

	address private timonier;
	address private boucanier;
	address public owner;

  constructor() ERC20("MP swap Token", "MPs") {
		owner = msg.sender;
	}
	
	modifier onlyMinter() {
		require(msg.sender == timonier || msg.sender == boucanier, "Rogue :minting is not enable matelot");
		_;
	}

	function mint(address to, uint256 amount) public onlyMinter{
		_mint(to, amount);
	}

	function allow(address masterchef, address staking) public{
		require(msg.sender == owner,"Rogue: only owner");
		timonier = staking;
		boucanier = masterchef;
	}
}
