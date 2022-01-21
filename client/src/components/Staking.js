

import React, {useState, useEffect} from 'react';

import Rogue from "../contracts/Rogue.json";
import Tairreux from "../contracts/Tairreux.json";
import WMatic from "../contracts/WMATIC.json";
import UniswapV2Factory from "../contracts/UniswapV2Factory.json";
import PropsTesrien from "../contracts/PropsTesrien.json";
import MiningProtocol from "../contracts/MiningProtocol.json";

import Dividends from "./Dividends";
import Nft from "./Nft";

import {ethers} from "ethers";

import Spinner from "react-bootstrap/Spinner";
import blank from "../script.js";

const Staking = (props) => {

	const [isReadyToRender, setIsReadyToRender] = useState(false);
	const _provider = props.provider;
	const _networkId = props.network_id;
	const _address = props.address;
	const [staker,setStaker] = useState(false);
  const spinner = <Spinner as="span" animation="border" size="sm" />;


	const [MPs,setMPs] = useState(null);
	const [stMPs, setstMPs] = useState(null);
	const [factory, setFactory] = useState(null);
	const [wmatic, setWmatic] = useState(null);
	const [MPNft, setMPNft] = useState(null);
	const [MP, setMP] = useState(null);

	const [tokenId, setTokenId] = useState(0);


	const displayStaker = (props) => {
		return(
			<div className="container">
				<Dividends
					provider={props.provider}
					networkId={props.networkId}
					MPs={MPs}
					stMPs={stMPs}
				/>
			</div>
		)	
	}

	const displayDeposit = () => {
		return("debug");
	}
	
	useEffect(() => {
		const initialize = async () => {
			const _MPs = new ethers.Contract(
				Rogue.networks[_networkId].address,
				Rogue.abi,
				_provider.getSigner()
			);
			setMPs(_MPs);

			const _stMPs = new ethers.Contract(
				Tairreux.networks[_networkId].address,
				Tairreux.abi,
				_provider.getSigner()
			);
			setstMPs(_stMPs);
		
			const _factory = new ethers.Contract(
				UniswapV2Factory.networks[_networkId].address,
				UniswapV2Factory.abi,
				_provider.getSigner()
			);
			setFactory(_factory);

			const _wmatic = new ethers.Contract(
				WMatic.networks[_networkId].address,
				WMatic.abi,
				_provider.getSigner()
			);
			setWmatic(_wmatic);

			const _MPNft = new ethers.Contract(
				PropsTesrien.networks[_networkId].address,
				PropsTesrien.abi,
				_provider.getSigner()
			);
			setMPNft(_MPNft);
			
			const _MP = new ethers.Contract(
				MiningProtocol.networks[_networkId].address,
				MiningProtocol.abi,
				_provider.getSigner()
			);
			setMP(_MP);



			var pairAddr = await _factory.getPair(_wmatic.address, _MPs.address);
		}

	if(_provider && _networkId){
			initialize();
			setIsReadyToRender(true);
		}

	},[_provider,_networkId]);

	if (!isReadyToRender)
    return(<>{spinner}</>)

	if(staker){
		return(displayStaker(props));
	}
	return(
		<div>  
			<input className="container"
				onClick={() => {setStaker(true);}}
				type="button"
				value="Staking Space"/>
			<Nft className="container"
				text={"LANDs"}
				contract={MPNft}
				protocole={MP}
				address={_address}
			/>
			{blank(0,50)}

		</div>
	)
}

export default Staking;
