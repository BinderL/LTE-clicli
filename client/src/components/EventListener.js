import {ethers} from "ethers"
import {useState, useEffect} from "react";

function EventListener(props){

	const _address = props.address
	const _text = props.text;
	const _contract = props.contract;
	const _event = props.event;
	const _select = props.logId;
	const _wrapped = props.wrapped;

	const [winner, setWinner] = useState(null)

	const subscription = () => {
		_contract.on(_event, async(arg1, arg2, arg3) => {
			var logs = [arg1, arg2, arg3];
			const record = logs[_select];
			if(_wrapped){
				console.debug("event");
				const value = await _wrapped(_contract, _address);
				setWinner(value);
			}
			else
				setWinner(record);
		});
	}

	useEffect(() => {
		subscription()
	},[]);

	return(
		<div className="Vertical">
			<h1 className="font"> {_text} </h1>
			<h2 className="chiffre"> {winner} </h2>
		</div>
	)
}

export default EventListener
