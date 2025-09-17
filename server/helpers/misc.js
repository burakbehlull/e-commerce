import { nanoid } from "nanoid";

function generateId(val=11){
	const id = nanoid(val); 
	return id
}

function getIp(req){
  // app.set("trust proxy", true);
  const forw = req.ip
  const forwardedFor = req.headers['x-forwarded-for'];
  const originalIp = forwardedFor ? forwardedFor.split(',')[0] : forw;
  
  const ra = req.socket.remoteAddress
  
  const ip = originalIp ? originalIp : ra
  
  return { status: true, data: ip }
}

export {
	generateId,
	getIp
}