import {useEffect} from "react"
import {ethers} from "ethers"
import Rogue from "../contracts/Rogue"
import {useState} from "react"

const User = (props) => {
	const _address = props.address;
	const _provider = props.provider;
	const _networkId = props.networkId;
	let MPs;
	const [balance,setBalance] = useState(0);
	useEffect( () => {
		if(_networkId)
			MPs = new ethers.Contract(
				Rogue.networks[_networkId].address,
				Rogue.abi,
				_provider.getSigner());
	},[_networkId]);

return(<div className="User"> 
		<output className="title"> MPS </output>
		<output className="font"> Your balance: </output>
		<output className="chiffre"> {balance} </output>
	</div>);

}

export default User
