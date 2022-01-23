import {useEffect} from "react"
import {ethers} from "ethers"
import Rogue from "../contracts/Rogue"
import {useState} from "react"
import EventListener from "./EventListener"

const User = (props) => {
	const _address = props.address;
	const _provider = props.provider;
	const _networkId = props.networkId;
	const [MPs, setMPs] = useState(null);
	const [balance,setBalance] = useState(0);

	const wrapped = async(_contract, _address) => {
		const _bal = await _contract.balanceOf(_address);
		const value = ethers.utils.formatEther(_bal);
		return value;
	}
 
	
	useEffect( () => {	
		
		if(_networkId && _address){
				const _MPs = new ethers.Contract(
				Rogue.networks[_networkId].address,
				Rogue.abi,
				_provider.getSigner());				
				setMPs(_MPs);
		}

	},[_networkId, _address]);
	
	if(MPs)
		return(<div className="User"> 
			<output className="title"> MPS </output>
			<output className="font"> Your balance: </output>
			<EventListener logId={2} contract={MPs} wrapped={wrapped} event="Transfer" address={_address} />
		</div>);
	else
		return(<div></div>)

}

export default User
