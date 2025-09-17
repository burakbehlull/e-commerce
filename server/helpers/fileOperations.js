import fs from "fs";
import path from "path";

function folderControl(folderName, ...props){
	const filePath = path.join(process.cwd(), ...props);
	
	if (fs.existsSync(filePath)) {
	  return { success: true, path: filePath }
	} else {
	  return { success: false, path: filePath }
	}
	
}

export {
	folderControl
}