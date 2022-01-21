
const Item = (props) => {

	const _ids = props.id;
	console.log(_ids);

	return(
		<div className="Item">
			<img 
				src={"/images/cell"+_ids+".png"} 
				alt={_ids}/>
			<div className="Item-descr">
				<output className="title"> {"Asset title "}</output> 
				<output className="title"> {"Asset price"}</output> 
				<output className="chiffre"> {"13.4"}</output> 
				<output className="title"> {"Round"}</output> 
				<output className="chiffre"> {"6"}</output> 
				<input className="Button"
					type="button"
					value="bourguinder" />
			</div>
		</div>
	);
}

export default Item
