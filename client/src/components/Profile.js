import {useState, useEffect} from "react"
import {ethers} from "ethers"
import Collection from "./Collection"
const Profile = (props) => {

	const _address = props.address;
	const _networkId = props.networkId;
	const _provider = props.provider;
	const _contract = props.contract;
	const _protocol = props.protocol;
	const _bon = props.bon;

	const Lands = require("../data/props.json");

	function subscribeEvent(){
		_contract.on("Transfer", async (from, to, BN) => {
			if(to.toUpperCase() === _address.toUpperCase()){
				const _all = await _contract.balanceOf(_address);
				const _bal = [];
				await tokens(_bal, 1, _all.toNumber());
			}
		});
		_protocol.on("Depot", async (_tokenId, _amount, _address) => {
			console.log(_tokenId, _amount, _address);
		});
		console.log("EventSubscribed");
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
	},[_networkId]);
	
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
								const value = e.target.value;
								setAmount(value);}}
							type="text" 
							value= {amount}
							id="amount"	
						/>
					</div>
					<div>
						<input
							onClick={async() => {
								const tokenId = selected;
								const _amount = ethers.utils.parseEther(amount);
								await _bon.approve(_protocol.address, _amount, {from:_address});
								await _contract.approve(_protocol.address, tokenId, {from:_address});
								await _protocol.pourParler(_amount, tokenId);}}
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

