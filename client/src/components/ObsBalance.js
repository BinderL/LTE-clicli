import React, {useState, useEffect} from 'react';

const ObsBalance = (props) => {
	
	const [balance, setBalance] = useState(0); 
	
	const text = props.text;
	const address = window.ethereum.selectedAddress;
	const contract = props.contract;



	useEffect(() => {	
		async function fetchData() {
			contract.on("Transfer", async (log, event, amount) => {
				console.log(amount.toNumber());
				var _bal = await contract.balanceOf(address);
				setBalance(_bal);
			});
			var _balance = await contract.balanceOf(address)
			setBalance(_balance);
	}
	fetchData();		
	}, [contract, address]);
	return(
		<div>
			<output>
				{text + balance}
			</output>
		</div>
	);
}

export default ObsBalance;








