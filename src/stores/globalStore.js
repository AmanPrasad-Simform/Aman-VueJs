import { defineStore } from "pinia";
import axios from "axios"

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            carList: {},
            carDataToBeEdited: {},
            carDataById: {},
            isloading: false,
            modalType: "add",
        }
    },
    getters: {
        getCarDetail() {
            return this.carList
        },
        getIsLoading() {
            return this.isloading
        },
        getCarDataById() {
            return this.carDataById
        }
    },
    actions: {
        async getCarDetails() {
            this.isloading = true;
            try {
                let responseData = await axios.get(`https://testapi.io/api/dartya/resource/cardata`)
                this.carList = responseData.data.data
                this.isloading = false;
                return responseData.data.data
            } catch (e) {
                this.isloading = false;
                alert("Error in fetching data...")
            }
        },
        async getCarDetailById(id) {
            this.isloading = true;
            try {
                let responseData = await axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
                this.carDataById = responseData.data
                this.isloading = false;
                return responseData.data
            } catch (e) {
                this.isloading = false;
                alert("Error in fetching data...")
            }
        },
        async putCarDetails(car) {
            try {
                let responseData = await axios.put(`https://testapi.io/api/dartya/resource/cardata/${car.id}`, {
                    ...car
                })
                if (responseData.status == 200) {
                    this.getCarDetails()
                }
                return responseData.data.data
            } catch (e) {
                alert("Error in updating data...")
            }
        },
        async postCarDetails(car) {
            try {
                let responseData = await axios.post(`https://testapi.io/api/dartya/resource/cardata`, {
                    ...car
                })
                if (responseData.status == 201) {
                    this.getCarDetails()
                }
                return responseData.data.data
            } catch (e) {
                alert("Error in adding data...")
            }
        },
        async deleteCarDetails(id) {
            try {
                let responseData = await axios.delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
                return responseData
            } catch (e) {
                alert("Error in deleting the data...")
            }
        },

        async postLoginDetails(loginDetails) {
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

        async postRegisterDetails(registerDetails) {
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