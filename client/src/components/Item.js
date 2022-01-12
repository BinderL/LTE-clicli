import "../css/image.css";

const Images = (props) => {

	const _ids = props.ids;
	const _select = props.select;	

	const renderCollection = () => {
		const _render = [];
		_ids.map((value) => {
			_render.push(
			<li key={value}>
					<img 
						src={"/images/"+value} 
						alt={value}
						onClick={(value) => _select(value.target.alt)}

					/>		
			</li>
			);
		});
	return(_render);
	}

	return(
		<div className="collection">
			<ul>
				{renderCollection()}
			</ul>
		</div>
	);
}

export default Images
