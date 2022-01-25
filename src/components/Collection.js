import {useState,useEffect} from "react"

const Collection = (props) => {

	const _ids = props.ids;
	const _select = props.select;	
	const _setStyle = props.setStyle;
	const _style = props.style;
	
	const renderCollection = () => {
		const _render = [];
		_ids.map((value) => {
			_render.push(
				<img 
					style={_style}
					src={"/images/cell"+value+".png"} 
					alt={value}
					onClick={(value) => {
						console.log(value.target.alt);
						_select(value.target.alt);
						_setStyle({margin:"5%",width:"5%"});}
					}
				/>		
			);
		});
	return(
		<div className="Collection">
			{_render}
		</div>);
	}

	return(
		<div className="container horizontal collection">
			{renderCollection()}
		</div>
	);
}

export default Collection
