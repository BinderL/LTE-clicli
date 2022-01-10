//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BST is ERC20 {

    address owner;
    address masterchef;
    address stkBST;

    constructor() ERC20("Bliiitz Swap Token", "BST") {
        owner = msg.sender;
    }

    function setMinter(address _masterchef, address _stkBST) public {
        require(msg.sender == owner);
        masterchef = _masterchef;
        stkBST = _stkBST;
    }

    function mint(address _address, uint256 _amount) public {
        require(msg.sender == masterchef || msg.sender == stkBST);
        _mint(_address, _amount);
    }
}
