import {useState} from "react"
import Collection from "./Collection"
const Profile = (props) => {

	const _address = props.address;
	const _networkId = props.networkId;
	const _provider = props.provider;
	const lands = [7,9,13];

	const [selected, onSelect] = useState(-1);
	const [amount, setAmount] = useState(0);

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
			ids={lands}
			style={{margin:"3%"}}
			select={onSelect}
			setStyle={() => {return null}}
		/>
		{render()}
	</div>);

}


export default Profile

