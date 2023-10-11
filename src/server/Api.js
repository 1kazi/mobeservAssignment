import axios from 'axios';

async function fetchData() {
    try {


        const response = await axios.get('https://devwebapi.edgelearning.co.in/api/interview/certification');
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}


export default fetchData;



