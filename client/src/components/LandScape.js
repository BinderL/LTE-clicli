import "../css/LandScape.css"
import {useState, useEffect} from "react"

import User from "./User"
import Root from "./Root"
import Magic from "./Magic"
import Market from "./Market"
import Profile from "./Profile"
import Dividends from "./Dividends"

import {ethers} from "ethers"
import MiningButton from "../contracts/MiningButton"

function LandScape(props) {
	const _provider = props.provider;
	const _networkId = props.networkId;
	const _address = props.address;	
	const [_contract, setContract] = useState(null);

	const [state,setDisplayState] = useState([false,false,false,false]);

	console.log(_networkId)

	useEffect(() => {
		const fetch = () => {
		}
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
		<Market/>, <Profile/>, <Dividends/>]

	return (
    <div className="Univers">
    	<div className="Buttons">
				<input className="Button"
					onClick={() => {setDisplayState([true,false,false,false]);}}
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
				<User className="User" />
				<div className="corps"> {renderBody()}</div>
			</div>
			<div className="footer">
				 <a href="localHost">Public Source Code</a> 
			</div>
		</div>
    );
}

export default LandScape
