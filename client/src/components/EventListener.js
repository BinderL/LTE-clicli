
import {useState, useEffect} from "react";

function EventListener(props){
	const _text = props.text;
	const _contract = props.contract;
	const _event = props.event;

	const [winner, setWinner] = useState(null)

	const subscription = ()=> {
		_contract.on(_event, (logs) => {
			setWinner(logs);
		});
	}

	useEffect(() => {
		subscription()
	},[]);

	return(
		<div className="vertical">
			<h1 className="font"> {_text} </h1>
			<h2 className="font"> {winner} </h2>
		</div>
	)
}

export default EventListener
