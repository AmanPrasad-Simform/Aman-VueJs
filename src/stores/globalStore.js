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
                return responseData.data.data;
            } catch (e) {
                alert("Error in fetching data...");
            } finally {
                this.isloading = false;
            }
        },
        async getCarDetailById(id) {
            this.isloading = true;
            try {
                let responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/resource/cardata/${id}`
                );
                this.carDataById = responseData.data;
                return responseData.data;
            } catch (e) {
                alert("Error in fetching data...");
                window.history.back();
            } finally {
                this.isloading = false;
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
            this.isloading = true;
            try {
                let responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/resource/users`
                );
                this.userDetails = responseData.data.data;
                return responseData.data.data;
            } catch (e) {
                alert("Error in getting User Details...");
            } finally {
                this.isloading = false;
            }
        },

        async postLoginDetails(loginDetails) {
            this.isloading = true;
            try {
                let responseData = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}//login`,
                    {
                        ...loginDetails,
                    }
                );
                await this.getUserDetails();
                if (responseData.status == 200) {
                    let users = this.userDetails.find(
                        (user) =>
                            loginDetails.email == user.email &&
                            loginDetails.password == user.password
                    );
                    if (users) {
                        this.isLoggedIn = true;
                        const loggedUser = users;
                        localStorage.setItem("isAdmin", loggedUser.role);
                        localStorage.setItem(
                            "loggedUser",
                            loggedUser.name.toUpperCase().split(" ")[0]
                        );
                        this.isAdmin = loggedUser.role;
                        this.user = loggedUser.name.toUpperCase().split(" ")[0];
                        const tokenID = users.id;
                        sessionStorage.setItem("isLoggedIn", true);
                        sessionStorage.setItem("isToken", tokenID);
                    } else {
                        alert("Invalid Credentials");
                    }
                } else {
                    return;
                }
                return responseData;
            } catch (e) {
                alert("Error in adding Login details...");
            } finally {
                this.isloading = false;
            }
        },

        async postRegisterDetails(registerDetails) {
            this.isloading = true;
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
            } finally {
                this.isloading = false;
            }
        },
    },
});
export default useGlobalStore;
