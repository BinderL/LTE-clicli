import {ethers} from "ethers"
import MiningButton from "../contracts/MiningButton"
import EventListener from "./EventListener"
import "../css/LandScape.css"

const Magic = (props) => {
	const _provider = props.provider;
	const _address = props.address;
	const _networkId = props.networkId;
	const MB = new ethers.Contract(
		MiningButton.networks[_networkId].address,
		MiningButton.abi,
		_provider.getSigner()
	);

	return(
		<div className="MB"> 
			<div className="MB-item">
				<output className="title"> Last magicien </output>
				<EventListener contract={MB} event={"Push"} logId={0} />
			</div>
			<img 
				src="/images/MB.png"
				onClick={async () => {await MB.pushButton({from:_address});}}
			/>
		</div>
	)
}


export default Magic

