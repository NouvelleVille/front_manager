import apiFetcher from "../utils/axios";


function useDevices() {

    const listDevices = () => {

        return apiFetcher.getAxiosInstance().get('api/iot/devices/?format=json')
        .then((response) => {

            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    }

    return { listDevices }

}

export default useDevices;