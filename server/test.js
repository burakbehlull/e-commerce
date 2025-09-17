import fs from "fs";
import path from "path";

function folderControl(...props){
	const folderPath = path.join(process.cwd(), ...props);
	
	if (fs.existsSync(folderPath)) {
	  return { status: true, path: folderPath }
	} else {
	  return { status: false, path: folderPath }
	}
	
}

function createFolder(folderPath){
	if (!fs.existsSync(folderPath)) {
	  fs.mkdirSync(folderPath, { recursive: true }); 
	  return { status: true, path: folderPath }
	} else {
	  return { status: false, path: folderPath }
	}
}

const r = folderControl("public", "images", "xd.txt")

console.log(r)

