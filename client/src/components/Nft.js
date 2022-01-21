import {useState, useEffect} from 'react';
import Images from "./Item";
import EventListener from "./EventListener";

const Nft = (props) => {

	const Lands = require("../data/props.json");
	const [land,setLand] = useState("");

	const text = props.text;
	const _account = props.address;
	const contract = props.contract;
	const _protocol = props.protocole

	const [balance, setBalance] = useState([]); 
	const [amount, setAmount] = useState(0);
	const event = "Transfer"
	
	function subscribeEvent(){
		contract.on(event, async (from, to, BN) => {
			if(to.toUpperCase() === _account.toUpperCase()){
				const _all = await contract.balanceOf(_account);
				const _bal = [];
				await tokens(_bal, 1, _all.toNumber());
			}
		});
	}

	const tokens = async (_bal, id, idMax) => {
		if(id < idMax){
			const _tokenId = await contract.tokenOfOwnerByIndex(_account,id);
			id++;
			_bal.push(Lands.items[_tokenId.toNumber()].file);
			await tokens(_bal, id, idMax);
		}
		setBalance(_bal);
	}

	const feedProtocol = () => {
		if(land)
			return(
				<div className="vertical">
					<div className="container">
						<img
							src={"/images/"+land}
							alt={land}
						/>
						<img
							src={"/images/+.png"}
							alt={""}
						/>
						<input 
							onChange={(e) => {
								setAmount(e.target.value);}}
							type="text" 
							value= {amount}
							id="amount"	
						/>
					</div>
					<div className="container">
						<input className="container"
							onClick={async(e) => {
								const tokenId = land.split("l")[2].split(".")[0];
								await _protocol.pourParler(amount, tokenId);}}
							type="button"
							value="deposit"/>
					</div>						
				<EventListener
					text={"you speak about"}
					contract={_protocol}
					event="Depot"/>
				</div>
			);
	}

	useEffect(() => {
		subscribeEvent();
	},[]);

	useEffect(() => {
		async function fetchData() {	
			const _all = await contract.balanceOf(_account);
			const _bal = [];
			await tokens(_bal, 0, _all.toNumber());
		}
		fetchData();		
	}, [_account]);
	
	return(
		<div className="horizontal">
			<div className="vertical">
				<output className="center">
					{text}
				</output>
				<Images
					ids={balance}
					select={setLand}
				/>
			</div>
		{feedProtocol()}
	</div>
	);
}

export default Nft;








