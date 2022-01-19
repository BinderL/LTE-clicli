// SPDX-License-Identifier: CC

pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "./IMagicButton.sol";
import "./MPs.sol";


contract MiningProtocol{

	bool drone;
	
	struct Landlubber{
		uint treasures;
		uint rewardDebt;
		uint idp;
	}

	struct Pirate{ 
		Item[] coffre;
		uint score;
		uint accMPsPerTreasure;
		uint lastTreasuresBurn;
		uint allocPoint;
	}

	struct Item{
		uint tokenId;
		uint value;
		uint amarrer;
		address lordLand;
	}
	address public captaine;
	address void;
	address bachiBouzouk;

	ERC721Burnable treasure;
	Rogue MPs;

	uint MPsPerTreasure;
	uint totalAllocPoint;

	uint[] public digits;	
	
	mapping(address => Landlubber) public lordLand;

	Pirate[4] public pirates;

	event Depot(uint tokenId, uint amount, address player);

	constructor(Rogue token, address game, ERC721Burnable asset){
		captaine = msg.sender;
		drone = false;
		MPs = token; 
		bachiBouzouk = game;
		treasure = asset;
		void = 0x4c5b3736e059b60b8D2f476dec45Ab9B721baDcD;
		MPsPerTreasure=1;
	}

	function pourParler(uint amount, uint tokenId) external {
		require(treasure.balanceOf(address(this)) < 100, "MP: you can't speak here this is full Moussaillon.");
		if(!drone){ 
			drone=true;
			MPs.transferFrom(msg.sender, address(this), amount);
			treasure.safeTransferFrom(msg.sender, address(this), tokenId);
			emit Depot(tokenId, amount, msg.sender);
			lordLand[msg.sender].treasures++;
			uint _idp = _loot(tokenId, amount);
			_cale(_idp);
		}  
	} 

	function cale(uint id) external{
		require(msg.sender == captaine,"MP: you are not the captain of this flotte");
		_cale(id);
	}

	function pendingMPs(uint _idp, address _user) external view returns(uint){
		uint accMPsPerTreasure = pirates[_idp].accMPsPerTreasure;
		uint treasureSupply = treasure.balanceOf(address(this));
		if(pirates[_idp].lastTreasuresBurn > 0 && treasureSupply != 0){
			uint multiplier = getMultiplier(pirates[_idp].lastTreasuresBurn);
			uint MPsReward = multiplier * MPsPerTreasure * pirates[_idp].allocPoint/totalAllocPoint;
			accMPsPerTreasure = accMPsPerTreasure + (MPsReward * 1e12/treasureSupply);
		}
		return (lordLand[_user].treasures * accMPsPerTreasure /1e12) - lordLand[_user].rewardDebt;
	}

	function getMultiplier(uint lastTreasuresBurn) public pure returns(uint){
		return lastTreasuresBurn;	

	}

	function prime(uint _id) public view returns(Pirate memory){
		return pirates[_id];
	}

	function marcheSurLaPlanche(uint _id, uint _idp) public {
		require(lordLand[msg.sender].treasures > 0, "MP: have you ever dream about saying what you want moussaillon ? ");
		if(!drone){
			drone=true;
				uint _tokenId = pirates[_idp].coffre[_id].tokenId;
				_marcheSurLaPlanche(_tokenId, _id, _idp);
				lordLand[msg.sender].treasures--;
			drone=false;
		}
	}

	function purge() public {
		require(lordLand[msg.sender].treasures > 0, "MP: have you ever dream about saying what you want moussaillon ? ");
		_cale(lordLand[msg.sender].idp);
	}

	function _caviste(uint start, uint tokenId, uint idp) internal pure returns(uint) {
		return start+tokenId+idp;
	}


	function _marcheSurLaPlanche(uint _tokenId, uint _id, uint _idp) internal{
		treasure.burn(_tokenId);
		_remove(_id, _idp);	
		MPs.transferFrom(address(this), void, bourse());
		_boujaron();
	}

	function mutinerie(uint _idp, uint _id) external {
		if (!drone){
			drone = true;
			Landlubber storage _lordLand = lordLand[msg.sender];
			uint amount = pirates[_idp].coffre[_id].value/2;
			MPs.transferFrom(msg.sender, address(this), amount);
			Landlubber storage _receleur = lordLand[pirates[_idp].coffre[_id].lordLand];
			_receleur.treasures--;
			_receleur.rewardDebt+=amount;
			uint _tokenId = pirates[_idp].coffre[_id].tokenId;
			treasure.safeTransferFrom(address(this), msg.sender, _tokenId);
			_cale(_idp);
			safePirateTransfer(msg.sender, _lordLand.rewardDebt);
			drone=false;
		}
	}

	function _boujaron() internal{
		uint _grog = 10000;	
		MPs.mint(address(this), _grog);
	}
	
	function safePirateTransfer(address _to, uint256 _amount) internal {
		if (_amount > bourse()) {
			MPs.transfer(_to, bourse());
		} 
		else {
			MPs.transfer(_to, _amount);			
		}
	}

	function bourse() public view returns(uint){
		return MPs.balanceOf(address(this));
	}

	function _cale(uint _id) internal{
		uint _last = bourse() ;
		IMiningButton(bachiBouzouk).pushButton();
		uint _amount = bourse() - _last; 
		pirates[_id].score+=_amount;
		_digit();
		_bamboche(0, _id) ;
	}

	function _digit() public{
		uint _seed = _charnier();
		for(uint i = 0; i < pirates.length; i++)	{
			uint digit;
			if(pirates[i].coffre.length > 0){
				digit = uint(_seed % pirates[i].coffre.length);
				_seed =uint( _seed / pirates[i].coffre.length);
			}
			else
				digit = 0;
			digits.push(digit);
		}
	} 

	function _bamboche(uint _idx, uint _idp) internal {
		if(_idx < pirates[_idp].coffre.length){
			uint _tokenId = pirates[_idp].coffre[_idx].tokenId;
			uint _sabordage = pirates[_idp].coffre[_idx].amarrer;
			if (_sabordage > 9)
				_marcheSurLaPlanche(_tokenId, _idx, _idp);
			else
				pirates[_idp].coffre[_idx].amarrer++;
			_bamboche(_idx + 1, _idp);
		}
	} 

	function _loot(uint _tokenId, uint _amount) internal returns(uint){
		uint _treasures = treasure.balanceOf(address(this));
		uint idp = _treasures % 4;
		Item memory _item;
		_item.tokenId = _tokenId;
		_item.amarrer = 1;
		_item.value = _amount;
		_item.lordLand = msg.sender;
		pirates[idp].coffre.push() = _item;
		return idp;
 	}  

	function _charnier() internal view returns(uint){
		return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, bourse())));
	}

	function onERC721Received(
		address,
		address,
		uint256,
		bytes calldata
	) external pure returns (bytes4){
		return(this.onERC721Received.selector);
	}
	    
	function _remove(uint index, uint idp) internal {
		if (index < pirates[idp].coffre.length){
			for (uint i = index; i < pirates[idp].coffre.length - 1; i++){          
				pirates[idp].coffre[i] = pirates[idp].coffre[i + 1];																	       
	 		}														
				pirates[idp].coffre.pop();
		}
	}
}

