import {useState, useEffect} from "react"
import Collection from "./Collection"
import Item from "./Item"

const Market = (props) => {

	const [provider,setProvider] = useState(-1);
	const [item, setItem] = useState(-1);
	const [transform, setTransform] = useState();

	let style;
	if(!transform)
		style = {width:"20%",margin:"2%"};
	else
		style = {width:"5%",margin:"1%"};

	const renderProvider = () => {
		if(provider >= 0)
			return displayProvider(provider);
	}
	const displayProvider = () => {
		return(
			<Collection
				ids={[0,1,2,3,4,5]}
				select={setItem} 
				setStyle={setTransform}
				style={style}
			/>
		)
	}
	const renderItem = () => {
		if(item>=0){
			console.log(item);
			return(
				<Item
					id={item}/>);
		}
	}

	const _render = renderProvider();
	return(
		<div className="Market">
			<output className="title"> Providers </output>
			<div className="Buttons">
				<input className="Button"
					onClick={() => {setProvider(1)}}
					type={"button"}
					value={"Provider 1"} />
				<input className="Button"
					onClick={() => {setProvider(0)}}
					type={"button"}
					value={"Provider 2"} />
			</div>
			{_render}
			{renderItem()}
		</div>
	)
}


export default Market

