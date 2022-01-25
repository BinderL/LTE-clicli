import {ethers} from "ethers"
import MiningButton from "../contracts/MiningButton"

import "../css/LandScape.css"
import {useState, useEffect} from "react"

const Magic = (props) => {
	const _provider = props.provider;
	const _address = props.address;
	const _networkId = props.networkId;
	const MB = new ethers.Contract(
		MiningButton.networks[_networkId].address,
		MiningButton.abi,
		_provider.getSigner()
	);
	const _contrat = props.contrat;
	const [winner, setWinner] = useState("");

	const subscribe = () => {
		_contrat.on("Push",(log) => {
			console.log(log);
			setWinner(log);
		});
		console.log("bus")
	}

	useEffect(()=>{
		const fetch = async () => {
			const _winner = await MB.winner();	
			setWinner(_winner);
		}
		subscribe();
		fetch();
	},[_contrat]);

	return(
		<div className="MB"> 
			<div className="MB-item">
				<output className="title"> Last magicien </output>
				<output className="chiffre"> {winner} </output>
			</div>
			<img 
				src="/images/MB.png"
				onClick={async () => {await MB.pushButton({from:_address});}}
			/>
		</div>
	)
}


export default Magic

