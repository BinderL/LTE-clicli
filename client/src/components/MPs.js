import MiningButton from "../contracts/MiningButton.json";
import {useState, useEffect} from 'react';
import {ethers} from "ethers";

const MPs = (props) => {
	const _provider = props.provider;
	const _address = props.address;
	const _networkId = props.networkId;
	const [MB, setMB] = useState(null);
	const [MPs, setMPs] = useState("");

	useEffect(() => {
		const fetcher = async () => {
			const _MB = new ethers.Contract(
				MiningButton.networks[_networkId].address,
				MiningButton.abi,
				_provider.getSigner()
			);
			setMB(_MB);
			_MB.on("Transfer", async () => {
				var _bal = await _MB.balanceOf(_address);
				const value = ethers.utils.formatEther(_bal.toString());
				setMPs(value);
			});
		}
		if(_networkId && _provider){
			fetcher();
		}
	},[_networkId, _provider]);
	return(<div className="font" > {"balance :" + MPs}</div>);
}


export default MPs
