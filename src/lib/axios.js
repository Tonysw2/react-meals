import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://react-food-be722-default-rtdb.firebaseio.com/',
})
