import { nanoid } from "nanoid";

function generateId(val=11){
	const id = nanoid(val); 
	return id
}

export {
	generateId
}