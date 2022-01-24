import {useEffect} from "react"
import {ethers} from "ethers"
import Rogue from "../contracts/Rogue"
import {useState} from "react"


const User = (props) => {
	const _address = props.address;
	const _provider = props.provider;
	const _networkId = props.networkId;
	const _contract = props.contract;
	const [MPs, setMPs] = useState(null);
	const [balance,setBalance] = useState(0);
	const _balance = props.balance;

	const wrapped = async(_contract, _address) => {
		const _bal = await _contract.balanceOf(_address);
		const value = ethers.utils.formatEther(_bal);
		return value;
	}

	function subscribeEvent(){
		_contract.on("Transfer", async (from, to, BN) => {
			const _bal = await _contract.balanceOf(_address);
			setBalance(ethers.utils.formatEther(_bal));
			console.log('event');
		});
	}

	useEffect(() => {
		const fetch = async () =>{
			if(_contract){
				subscribeEvent();
				const value = await wrapped(_contract, _address);
				console.log(value);
				setBalance(value);
			}
		}
		fetch();
	},[_contract]);
	
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
			<output className="font"> Your balance:</output>
			<output className="chiffre">{balance}</output>
		</div>);
	else
		return(<div></div>)

}

export default User
