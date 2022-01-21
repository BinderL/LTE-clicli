


const blank = (id,idM) => {
	const run = (id, idM) => {
		if(id < idM){
			_blank.push(<hr key={id}/>);
			id++;
			run(id,idM);
		}
	}
	const _blank = []
	run(id, idM);
	return(_blank)
}

export default blank;
								
		


