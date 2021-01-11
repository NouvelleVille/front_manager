
const axios = require('axios');

class ApiFetcher {

    baseURL = '';

    constructor(baseURL = 'http://localhost:8000/') {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL
        });
        this.setInterceptors();
    }

    setCredentials(access_token, refresh_token) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    setUserDispatch(userDispatch) {
        this.userDispatch = userDispatch;
    }

    setInterceptors() {
        this.axiosInstance.interceptors.request.use(
            config => {
                if (this.access_token) {
                    config.headers['Authorization'] = 'Bearer ' + this.access_token;
                }
                config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            }
        );

        this.axiosInstance.interceptors.response.use((response) => {
            return response
        },
            (error) => {
                const originalRequest = error.config;
                if (originalRequest.url === 'api/token/' && originalRequest.method === 'post') {

                    return Promise.reject(error);
                }

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    if (this.refresh_token) {
                        return this.axiosInstance.post('api/token/refresh/', {
                            refresh: this.refresh_token
                        })
                            .then(res => {
                                if (res.status === 200) {
                                    this.userDispatch({
                                        type: 'tokenRefreshed',
                                        access_token: res.data.access,
                                        refresh_token: res.data.refresh
                                    })
                                    return axios(originalRequest);
                                }
                            }).catch((error) => {
                                console.log(error);
                                this.userDispatch({
                                    type: 'tokenRefreshError'
                                })
                            })
                    }

                }
                return Promise.reject(error);
            }
        );






    }


    verifyToken() {
        console.log("Verify Token asked");

        return this.axiosInstance.post('api/token/verify/', {
            token: this.access_token
        }).then((response) => {

            console.log('Token is valid');
        }).catch((error) => {
            console.log(error);
            console.log('Token is invalid');
        })
    }

    refreshToken() {
        console.log("Refresh Token asked");
        return this.axiosInstance.post('api/token/refresh/', {
            refresh: this.refresh_token
        }, {
            // Avoid infinite retry loop
            _retry: true
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.userDispatch({
                        type: 'tokenRefreshed',
                        access_token: res.data.access,
                        refresh_token: res.data.refresh
                    })
                }
            })
            .catch(() => {
                this.userDispatch({
                    type: 'tokenRefreshError'
                })
            })

    }

    getAxiosInstance() {
        return this.axiosInstance;
    }

    getNoInterceptorsAxiosInstance() {
        return axios.create({
            baseURL: this.baseURL
        });
    }

}



const apiFetcher = new ApiFetcher();
export default apiFetcher;