
import React, {useState, useEffect} from 'react';

import Spinner from "react-bootstrap/Spinner";

import ObsBalance from "./ObsBalance";


const Dividends = (props) => {

  const spinner = <Spinner as="span" animation="border" size="sm" />;

	const [isReadyToRender, setIsReadyToRender] = useState(false);
	var address = window.ethereum.selectedAddress;

	const [amount, setAmount] = useState("");
	const [effective, setEffective] = useState(0);
	const [deposit, setDeposit] = useState(0);

	const _MPs = props.MPs;
	const _stMPs = props.stMPs

  useEffect(() => {
  
    if (_MPs && _stMPs) 
    	setIsReadyToRender(true);
	},[_MPs, _stMPs]);

  if (!isReadyToRender) {
    return (<>{spinner}</>)
  }
	else
		return(
			<div className="font">
				<div>
					<p>lets go shut up fucking staker</p>
				</div>
				<div>
					<output name="address">{"_address :" + window.ethereum.selectedAddress}</output> 
					<br></br>
					<output> {"your deposit on contract " + deposit} </output>
					<ObsBalance
						text="coin on your wallet "
						contract={_MPs}
						/>
					<ObsBalance
						text="your deposit on contract "
						contract={_stMPs}
						/>
					<br></br>
					<input 
						type="text" 
						value= {amount}
						id="amount"
						onChange={(e) => {
							console.log(e.target.value);
							setAmount(e.target.value);} 
						} />
					<br></br>
					<input
						onClick={ async () => {
							var _balance = await _MPs.balanceOf(address);
							setAmount(_balance.toNumber());
							setEffective(_balance.toNumber());
							}
						}
						type="button"
						value="MAX"/>
					<div>
						<input
							onClick={ async () => {
									console.log(effective, amount)
									if(amount ===effective){
										await _MPs.approve(_stMPs.address, amount, {from:address});
										_stMPs.depositAll();
									}
								}
							}
							type="button"
							value="Deposit"/>
					</div>
				</div>
			</div>
		);
}

export default Dividends;
