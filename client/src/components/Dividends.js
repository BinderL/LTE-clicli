
import React, {useState, useEffect} from 'react';
import ObsBalance from "./ObsBalance";
import {ethers} from "ethers"

import Rogue from "../contracts/Rogue";
import Tairreux from "../contracts/Tairreux";

const Dividends = (props) => {

	const _address = props.address;
	const _provider = props.provider;
	const _networkId = props.provider;

	const [isReadyToRender, setIsReadyToRender] = useState(false);
	const [amount, setAmount] = useState("");
	const [balance, setBalance] = useState(0);
	const [deposit, setDeposit] = useState(0);
	const [staker, setStaker] = useState(false);

	let MPs;
	let stMPs;

	const contract = () => {
		MPs = new ethers.Contract(
			Rogue.networks[_networkId].address,
			Rogue.abi,
			_provider.getSigner()
		);

		stMPs = new ethers.Contract(
			Tairreux.networks[_networkId].address,
			Tairreux.abi,
			_provider.getSigner()
		);
	}

  useEffect(() => {
    if (_provider && _networkId) 
			contract();
    	setIsReadyToRender(true);
	},[_provider, _networkId]);


	const render = () => {
		if(staker)
			return(
				<div>
					<input 
						type="text" 
						value= {amount}
						id="amount"
						onChange={(e) => {
							console.log(e.target.value);
							setAmount(e.target.value);}}/>
					<input
						onClick={ async () => {
							var _balance = await MPs.balanceOf(_address);
							setAmount(_balance.toNumber());
							setBalance(_balance.toNumber());}}
						type="button"
						value="MAX"/>
					<input
						onClick={ async () => {
							if(amount ===balance){
								await MPs.approve(stMPs.address, amount, {from:_address});
								stMPs.depositAll();
						}}}
						type="button"
						value="Deposit"/>
				</div>
			);
	}

  if (!isReadyToRender) {
    return (<div></div>)
  }
	else
		return(
			<div className="Vertical">
				<output className="title">EARNING</output>
				<div className="Horizontal">
					<div className="Item-desc">
						<output className="title">MPs tokens farmed</output>
						<output className="chiffre"> 0.089536 </output>
						<input type="button" value="Harvest"/>
					</div>
					<div className="Item-desc">
						<output className="title">MPs tokens not staked </output> 
						<output className="chiffre"> {balance + "  MPs tokens"} </output>
						<input type="button" value="Stake"/>
					</div>				
					<div className="Item-desc">
						<output className="title">Already staked </output> 
						<output className="chiffre"> {deposit + "  MPs tokens"} </output>
						<input type="button" value="Unstake"/>
					</div>
				</div>
				<output className="title"> Liquidity Mining </output>
				<div className="Horizontal">
					<div className="Item-desc">
						<output className="title">MPs tokens farmed</output>
						<output className="chiffre"> 0.089536 </output>
						<input type="button" value="Harvest"/>
					</div>
					<div className="Item-desc">
						<output className="title">MPs-WETH LP tokens balance </output> 
						<output className="chiffre"> {balance + "  MPs-WETH LP tokens"} </output>
						<input type="button" value="Stake"/>
					</div>				
					<div className="Item-desc">
						<output className="title">MPs-WETH LP tokens staked </output> 
						<output className="chiffre"> {deposit + "  MPs-WETH LP tokens"} </output>
						<input type="button" value="Unstake"/>
					</div>
				</div>
			</div>
		);
}

export default Dividends;
