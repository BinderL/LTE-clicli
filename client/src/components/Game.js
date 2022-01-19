import MagicButton from "./MagicButton"
import {useState} from "react";
import blank from '../script.js';
import MPs from './MPs.js';

function Game(props) {

 	const script = require("../script.js");
	const _networkId = props.networkId;
	const _provider = props.provider;
	const _address = props.address
	const [render, setRender] = useState(false);
	const rendering = () => {
		if(render){
			return(
				<MagicButton
					networkId={_networkId}
					provider={_provider}
					address={_address}
				/>
			)
		}
	}
	const _blank = () => {
		return(blank(0,20));
	}

	return (
		<div className="container spaceBetween">
			<MPs
				networkId={_networkId}
				provider={_provider}
				address={_address}
				/>
			<div className="vertical center">
				<input
					className="center"
					type="button"
					value="Magic Button"
					onClick={()=>{setRender(true)}}
				/>
			{rendering()}
			{_blank()}
			{_blank()}
			</div>
		</div>
	)
}

export default Game
