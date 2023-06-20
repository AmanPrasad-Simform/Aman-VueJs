import { defineStore } from "pinia";
import axios from "axios";

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            carList: {},
            carDataToBeEdited: {},
            carDataById: {},
            isloading: false,
            modalType: "add",
            userDetails: {},
            isLoggedIn: JSON.parse(sessionStorage.getItem("isLoggedIn")),
            user: localStorage.getItem("loggedUser"),
            isAdmin: localStorage.getItem("isAdmin"),
            openModal: false,
            loggedUser: "",
        };
    },
    getters: {
        getCarDetail() {
            return this.carList;
        },
        getIsLoading() {
            return this.isloading;
        },
        getCarDataById() {
            return this.carDataById;
        },
    },
    actions: {
        async getCarDetails() {
            this.isloading = true;
            try {
                let responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata`
                );
                this.carList = responseData.data.data;
                this.isloading = false;
                return responseData.data.data;
            } catch (e) {
                this.isloading = false;
                alert("Error in fetching data...");
            }
        },
        async getCarDetailById(id) {
            this.isloading = true;
            try {
                let responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata/${id}`
                );
                this.carDataById = responseData.data;
                this.isloading = false;
                return responseData.data;
            } catch (e) {
                this.isloading = false;
                alert("Error in fetching data...");
                window.history.back();
            }
        },
        async putCarDetails(car) {
            try {
                let responseData = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata/${
                        car.id
                    }`,
                    {
                        ...car,
                    }
                );
                if (responseData.status == 200) {
                    this.getCarDetails();
                }
                return responseData;
            } catch (e) {
                alert("Error in updating data...");
            }
        },
        async postCarDetails(car) {
            try {
                let responseData = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata`,
                    {
                        ...car,
                    }
                );
                if (responseData.status == 201) {
                    this.getCarDetails();
                }
                return responseData;
            } catch (e) {
                alert("Error in adding data...");
            }
        },
        async deleteCarDetails(id) {
            try {
                let responseData = await axios.delete(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata/${id}`
                );
                this.getCarDetails();
                return responseData;
            } catch (e) {
                alert("Error in deleting the data...");
            }
        },

        async getUserDetails() {
            try {
                let responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/resource/users`
                );
                this.userDetails = responseData.data.data;
                return responseData.data.data;
            } catch (e) {
                alert("Error in getting User Details...");
            }
        },

        async postLoginDetails(loginDetails) {
            try {
                let responseData = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}//login`,
                    {
                        ...loginDetails,
                    }
                );
                return responseData;
            } catch (e) {
                alert("Error in adding Login details...");
            }
        },

        async postRegisterDetails(registerDetails) {
            try {
                let responseData = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/resource/users`,
                    {
                        ...registerDetails,
                    }
                );
                return responseData;
            } catch (e) {
                alert("Error in adding Registration details...");
            }
        },
    },
});
export default useGlobalStore;
