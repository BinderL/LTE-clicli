
import {ethers} from "ethers";
import {useState} from 'react';
import MiningButton from "../contracts/MiningButton";

import ObsBalance from "./ObsBalance"

function MagicButton (props) {
	const _provider=props.provider;
	const _address = props.address;
	const _networkId= props.networkId;
	console.log(_networkId);
	const [contract, setContract] = useState(null);

	const MB = new ethers.Contract(
		MiningButton.networks[_networkId].address,
		MiningButton.abi,
		_provider.getSigner()
	);

	return(
		<div className="vertical">
			<h1 className="font"> Push Me if you can ! </h1>
			<img 
				src="/images/MB.png" 
				onClick={async () => {
				await MB.pushButton({from:_address});
				}}
			/>
			<ObsBalance
				text="you push the button : "
				contract={MB}
				event={"test"}
			/>
		</div>
	)
}


export default MagicButton
