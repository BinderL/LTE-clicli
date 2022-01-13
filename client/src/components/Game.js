import "../external/monopoly/styles.css"
import MagicButton from "./MagicButton"
import {useState} from "react";

function Game(props) {
  
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
	const blank = () => {
		//var _blank = <br>;
		var _blank = <div><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/></div>;
		return(_blank)
		

	}

	return (
		<div className="vertical">
			<input
				type="button"
				value="Magic Button"
				onClick={()=>{setRender(true)}}
			/>
		{rendering()}
		{blank()}
		</div>
	)
}

export default Game
