import axios from "axios";


export default axios.create({
    baseURL : "https://airline-tickets-46241-default-rtdb.firebaseio.com/"
})