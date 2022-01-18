import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-83cef-default-rtdb.europe-west1.firebasedatabase.app/',
})