//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";



contract PropsTesrien is ERC721Enumerable{

	address owner;
	uint burned;

	constructor()ERC721("Lord's Land", "LL"){
		owner = msg.sender;
	}
	
	function mint(address to) external {
		require(msg.sender == owner, "PropsTesrien: caller is not owner"); 
		_safeMint(to, totalSupply()+burned);
	} 
	
  function burn(uint256 tokenId) public virtual {
  	require(_isApprovedOrOwner(msg.sender, tokenId), "PropsTesrien: caller is not owner nor approved");
    _burn(tokenId);
		burned++;
	} 


}



