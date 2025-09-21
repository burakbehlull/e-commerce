import API, { BASEAPI } from '@api';

BASEAPI.interceptors.request.use(config=> {
	const token;
    config.headers.Authorization = `Bearer ${token}` 
    return config
})


