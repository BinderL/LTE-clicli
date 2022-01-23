import "../css/LandScape.css"
import {useState, useEffect} from "react"
import {ethers} from "ethers"

import User from "./User"
import Root from "./Root"
import Magic from "./Magic"
import Market from "./Market"
import Profile from "./Profile"
import Dividends from "./Dividends"

import Rogue from "../contracts/Rogue.json";
import MiningButton from "../contracts/MiningButton"
import PropsTesrien from "../contracts/PropsTesrien.json";
import MiningProtocol from "../contracts/MiningProtocol.json";

function LandScape(props) {
	const _provider = props.provider;
	const _networkId = props.networkId;
	const _address = props.address;	

	const [MP, setMP] = useState(null);
	const [MPs, setMPs] = useState(null);
	const [MPNft, setMPNft] = useState(null);
	const [balance, setBalance] = useState(null);
	
	const [state,setDisplayState] = useState([false,false,false,false]);


	useEffect(() => {
		const fetch = () => {
			const _MPs = new ethers.Contract(
				Rogue.networks[_networkId].address,
				Rogue.abi,
				_provider.getSigner()
			);
			setMPs(_MPs);
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

		}
		if(_provider && _networkId)
			fetch();
	},[_networkId, _provider, _address]);

	const displayState = (_id) => {
		return (body[_id]);
	}

	const renderBody = () => {
		if(_networkId){
			return state.reduce((total, value, key) => {
				if(value)
					return displayState(key);
				return total;
			}, <Root/>);
		}
		return(<Root/>)	
	}

	const body = [<Magic
			provider={_provider}
			address={_address}
			networkId={_networkId}
		/>, 
		<Market/>, 
		<Profile
			provider={_provider}
			address={_address}
			networkId={_networkId}
			contract={MPNft}
			protocol={MP}
			bon={MPs}
		/>, 
		<Dividends
			provider={_provider}
			address={_address}
			networkId={_networkId}/>
	]

	return (
    <div className="Univers">
    	<div className="Buttons">
				<input className="Button"
					onClick={async() => {
						const _value = await MPs.balanceOf(_address);
						setBalance(ethers.utils.formatEther(_value));
						setDisplayState([true,false,false,false]);}}
					type="button"
					value="Magic" />
				<input className="Button"
					onClick={() => {setDisplayState([false,true,false,false]);}}
					type="button"
					value="Market" />
				<input className="Button"
					onClick={() => {setDisplayState([false, false, true, false]);}}
					type="button"
					value="Profile" />
				<input className="Button"
					onClick={() => {setDisplayState([false, false, false, true]);}}
					type="button"
					value="Dividends"/>
			</div>
			<div className="Body">	
				<User className="User" balance={balance} address={_address} provider={_provider} networkId={_networkId} contract={MPs}/>
				<div className="corps"> {renderBody()}</div>
			</div>
			<div className="footer">
				 <a href="localHost">Public Source Code</a> 
			</div>
		</div>
    );
}

export default LandScape
