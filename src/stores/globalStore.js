import { defineStore } from "pinia";
import axios from "axios"

const useGlobalStore = defineStore("global", {
    state: () => {

    },
    actions:  {
         getCarDetails : async () => {
            try {
                let responseData = await axios.get(`https://testapi.io/api/dartya/resource/cardata`)
                return responseData.data.data
            } catch (e) {
                alert("Error in fetching data...")
            }
        },
         getCarDetailById : async (id) => {
            try {
                let responseData = await axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
                return responseData.data
            } catch (e) {
                alert("Error in fetching data...")
            }
        },
         putCarDetails : async (car) => {
            try {
                let responseData = await axios.put(`https://testapi.io/api/dartya/resource/cardata/${car.id}`, {
                    ...car
                })
                return responseData.data.data
            } catch (e) {
                alert("Error in updating data...")
            }
        },
        postCarDetails : async (car) => {
            try {
                let responseData = await axios.post(`https://testapi.io/api/dartya/resource/cardata`, {
                    ...car
                })
                return responseData.data.data
            } catch (e) {
                alert("Error in adding data...")
            }
        },
        deleteCarDetails : async (id) => {
            try {
                let responseData = await axios.delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
                return responseData
            } catch (e) {
                alert("Error in deleting the data...")
            }
        },
        
        postLoginDetails : async (loginDetails) => {
            try {
                let responseData = await axios.post("https://testapi.io/api/dartya//login", {
                    ...loginDetails
                })
                return responseData
            }
            catch (e) {
                alert("Error in adding Login details...")
            }
        },
        
        postRegisterDetails : async (registerDetails) => {
            try {
                let responseData = await axios.post("https://testapi.io/api/dartya/resource/users", {
                    ...registerDetails
                })
                return responseData
            }
            catch (e) {
                alert("Error in adding Registration details...")
            }
        }
    }
})
export default useGlobalStore