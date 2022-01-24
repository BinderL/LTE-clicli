import {useState, useEffect} from "react"
import Collection from "./Collection"
import Item from "./Item"

const Market = (props) => {

	const [provider,setProvider] = useState([]);
	const [item, setItem] = useState(-1);
	const [transform, setTransform] = useState(false);

	const providers=[]
	providers.push([0,1,2]);
	providers.push([5,6,7,8,9]);
	providers.push([]);
	providers.push([19,20,21]);

	const Button = (id) => {
		return(
			<input className="Button"
				onClick={() => {setTransform(false);setItem(-1); setProvider(providers[id])}}
				type={"button"}
				value={"Provider "+ id} />
		)
	}

	const buttons = [];

	const Buttons = (id, idM) => {
		if(id<idM){
			buttons.push(Button(id));
			Buttons(id+1, idM);
		}
	}
	Buttons(0,providers.length);

	let style;
	if(!transform)
		style = {width:"20%",margin:"2%"};
	else
		style = {width:"5%",margin:"1%"};

	const renderProvider = () => {
		if(provider.length > 0)
			return displayProvider(provider);
	}
	const displayProvider = () => {
		return(
			<Collection
				ids={provider}
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
				{buttons}
			</div>
			{_render}
			{renderItem()}
		</div>
	)
}


export default Market

