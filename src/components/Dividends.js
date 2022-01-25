
import React, {useState, useEffect} from 'react';
import {ethers} from "ethers"

import Rogue from "../contracts/Rogue";
import Tairreux from "../contracts/Tairreux";


const Dividends = (props) => {

	const _address = props.address;
	const _provider = props.provider;
	const _networkId = props.networkId;
	const _devise = props.devise;
	const _contract = props.contract;

	const [amount, setAmount] = useState("");
	const [MPsBalance, setMPsBalance] = useState(0);
	const [LPbalance, setLPBalance] = useState(0);
	const [MPsdeposit, setMPsDeposit] = useState(0);
	const [LPdeposit, setLPDeposit] = useState(0);
	const [staker, setStaker] = useState(null);

	const[MPs, setMPs] = useState(null);
	const[stMPs, setStMPs] = useState(null);

	const subscribe = () => {
		_devise.on("Transfer", async(from,to,amount) => {
			var _balance = await _devise.balanceOf(_address);
			setMPsBalance(ethers.utils.formatEther(_balance));
		});	
	}

	const fetch = async() => {
		const _MPs = new ethers.Contract(
			Rogue.networks[_networkId].address,
			Rogue.abi,
			_provider.getSigner()
		);
		await setMPs(_MPs);

		const _stMPs = new ethers.Contract(
			Tairreux.networks[_networkId].address,
			Tairreux.abi,
			_provider.getSigner()
		);
		await setStMPs(_stMPs)

		//fetchMPs(MPs, _address);
	}

  useEffect(() => {
    const fetchier = async() => {
			const value = await _devise.balanceOf(_address);			
			setMPsBalance(ethers.utils.formatEther(value));

		}
		if (_provider && _networkId){
			fetch();
			fetchier();
		}
	},[_provider, _networkId, _address]);

	const fetchMPs = async(_contract, _address) => {
		var _balance = await _contract.balanceOf(_address);
		_balance = ethers.utils.formatEther(_balance);
		setMPsBalance(_balance);
		return _balance
	}

	const fetchDeposit = async(_contract, _address) => {
		var _balance = await _contract.bourse()
		_balance = ethers.utils.formatEther(_balance);
		setMPsDeposit(ethers.utils.formatEther(_balance));
		return _balance
	}

	const Button = (_proto, _onClick) => {
		return(
		<input className="button"
			onClick={_onClick}
			type="button"
			value={_proto}/>
		);
	}

	const Input = (_proto, _onChange) => {
		return(
			<input type="text" value= {amount} id={_proto} onChange={_onChange}/>
		);
	}

	const onChange = [
		(e) => {setAmount(e.target.value);}
	]


	const onClick = [
		async() => {
			await fetchMPs(MPs, _address);
			setAmount(MPsBalance.toString());
			},
		async()	=> {
			var _amount = ethers.utils.parseEther(amount);
			await MPs.approve(stMPs.address, _amount, {from:_address});
			stMPs.depositAll();
		}];

	const _render = (props) => {
		const _proto = props.proto;
		const _title = props.title;
		const _menu = props.menu;
		const split = _title.split(" ");
		const type = split[0];
		return(
			<div className="Staker">
				<div>
					<output className="title"> {_title} </output>
					<div className="phrase">
						<output className="title">{"MPs tokens available for " + type + ": "} </output>
						<output className="chiffre"> {MPsBalance} </output>
					</div>
				</div>
				<div className="Buttons">
					{Input(_proto, onChange[staker - 1])}
					{Button(_proto, onClick[staker - 1])}
				</div>
				<div className="Buttons">
					{Button("Cancel", () => {fetchMPs(MPs, _address); setStaker(0)})}
					{Button("Confirm", onClick[staker])}
				</div>
			</div>
		);
	}

	const display = () => {
		return(
			<div className="Vertical">
				<div className="head">
					<output className="title">EARNING</output>
				</div>
				<div className="Horizontal">
					<div className="Item-desc">
						<output className="title head">MPs tokens farmed</output>
						<output className="chiffre"> 0.089536 </output>
						<input type="button" value="Harvest"/>
					</div>
					<div className="Item-desc ">
						<output className="title">MPs tokens not staked </output> 
						<output className="chiffre"> {MPsBalance} </output>

						<input type="button" value="Stake"
							onClick={async() => {
								fetchMPs(MPs, _address);
								setStaker(1);}}/>
					</div>				
					<div className="Item-desc taule">
						<output className="title">MPs tokens already staked </output> 
						<output className="chiffre"> {MPsdeposit} </output>
						<input type="button" value="Unstake"
							onClick={() => {setStaker(2);}}/>
					</div>
				</div>
				<div className="head space"><output className="title"> Liquidity Mining </output></div>
				<div className="Horizontal">
					<div className="Item-desc">
						<output className="title">MPs tokens farmed</output>
						<output className="chiffre"> 0.089536 </output>
						<input type="button" value="Harvest"/>
					</div>
					<div className="Item-desc">
						<output className="title">MPs-WETH LP tokens not staked </output> 
						<output className="chiffre"> {LPbalance} </output>
						<input type="button" value="Stake"
							onClick={() => {setStaker(3);}}/>
					</div>				
					<div className="Item-desc arbitre">
						<output className="title">MPs-WETH LP tokens staked </output> 
						<output className="chiffre"> {LPdeposit} </output>
						<input type="button" value="Unstake"
							onClick={() => {setStaker(4);}}/>
					</div>
				</div>
			</div>
		);
	}

	const render = [];
	render.push({proto:"MAX", title:"Stake your MPs Tokens", menu:"Deposit"});
	render.push({proto: "MAX", title: "Unstake your MPs Tokens", menu: "Withdraw"});
	render.push({proto: "MAX", title: "Stake your MPs-WETH LP tokens", menu: "Deposit"});
	render.push({proto: "MAX", title: "Unstake your MPs-WETH LP tokens", menu: "Withdraw"});

	if(MPs)
		if(staker > 0)
			return _render(render[staker-1]);
		else return display();
	else
		return(<div> </div>)

}

export default Dividends;
