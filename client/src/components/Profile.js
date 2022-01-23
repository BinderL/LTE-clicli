import {useState, useEffect} from "react"
import Collection from "./Collection"
const Profile = (props) => {

	const _address = props.address;
	const _networkId = props.networkId;
	const _provider = props.provider;
	const _contract = props.contract;
	const Lands = require("../data/props.json");

	function subscribeEvent(){
		_contract.on("Transfer", async (from, to, BN) => {
			if(to.toUpperCase() === _address.toUpperCase()){
				const _all = await _contract.balanceOf(_address);
				const _bal = [];
				await tokens(_bal, 1, _all.toNumber());
			}
		});
	}

	const tokens = async (_bal, id, idMax) => {
		if(id < idMax){
			const _tokenId = await _contract.tokenOfOwnerByIndex(_address,id);
			id++;
			_bal.push(_tokenId.toNumber());
			await tokens(_bal, id, idMax);
		}
		setBalance(_bal);
	}

	const [selected, onSelect] = useState(-1);
	const [amount, setAmount] = useState(0);
	const [balance, setBalance] = useState([]); 
	
	useEffect(() => {
		subscribeEvent();
	},[]);
	
	useEffect(() => {
		async function fetchData() {	
			const _all = await _contract.balanceOf(_address);
			const _bal = [];
			await tokens(_bal, 0, _all.toNumber());
		}
		fetchData();		
	}, [_address]);
	
	const render = () => {
		if(selected >=0)
			return(
				<div className="Vertical">
					<div className="Deposit">
						<img
							src={"/images/cell" + selected + ".png"}
							alt={selected}
						/>
						<img
							src={"/images/+.png"}
							style={{width:"40%"}}
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
					<div>
						<input
							onClick={async() => {
								const tokenId = selected.split("l")[2].split(".")[0];}}
							type="button"
							value="deposit"/>
					</div>	
				</div>
			);
	}

return(
	<div className="Profil">
		<output className="title"> Pending Reward </output>
		<Collection
			ids={balance}
			style={{margin:"3%"}}
			select={onSelect}
			setStyle={() => {return null}}
		/>
		{render()}
	</div>);

}


export default Profile

