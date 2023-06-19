<template>
    <v-row class="add-button-container">
        <v-dialog v-model="dialog" persistent width="600">
            <v-card>
                <v-card-text>
                    <v-container>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2
                                        class="modal-title"
                                        id="staticBackdropLabel"
                                    >
                                        {{
                                            modalType == "add"
                                                ? "Add the Car Details"
                                                : "Edit the Car Details"
                                        }}
                                    </h2>
                                </div>
                                <div class="modal-body">
                                    <VForm
                                        class="form"
                                        :validation-schema="schema"
                                        @submit="handleSubmit"
                                    >
                                        <div class="group">
                                            <VField
                                                name="name"
                                                placeholder=" "
                                                type="text"
                                                class="input"
                                                v-model="carDataToBeEdited.name"
                                            />
                                            <label for="name"> Car Name*</label>

                                            <ErrorMessage
                                                name="name"
                                                class="error_message"
                                            />
                                        </div>
                                        <div class="group">
                                            <VField
                                                name="price"
                                                placeholder=" "
                                                type="number"
                                                class="input"
                                                v-model="
                                                    carDataToBeEdited.price
                                                "
                                            />
                                            <label for="price">Price*</label>
                                            <ErrorMessage
                                                name="price"
                                                class="error_message"
                                            />
                                        </div>

                                        <div class="group">
                                            <VField
                                                name="image"
                                                placeholder=" "
                                                type="text"
                                                class="input"
                                                v-model="
                                                    carDataToBeEdited.image
                                                "
                                            />

                                            <label for="image"
                                                >Image URL*</label
                                            >
                                            <ErrorMessage
                                                name="image"
                                                class="error_message"
                                            />
                                        </div>
                                        <div class="group">
                                            <vField
                                                name="details"
                                                :bails="false"
                                                v-model="
                                                    carDataToBeEdited.details
                                                "
                                                v-slot="{ field, errors }"
                                            >
                                                <textarea
                                                    type="text"
                                                    placeholder=" "
                                                    id="comment"
                                                    class="textarea"
                                                    name="details"
                                                    rows="3"
                                                    v-bind="field"
                                                />
                                                <div
                                                    class="error_message"
                                                    v-for="err in errors"
                                                    :key="err"
                                                >
                                                    {{ err }}
                                                </div>
                                            </vField>
                                            <label for="details"
                                                >Car Details*</label
                                            >
                                        </div>
                                        <p>*indicates required field</p>
                                        <div class="modal-footer">
                                            <button type="submit">
                                                {{
                                                    modalType == "add"
                                                        ? "Submit"
                                                        : "Update"
                                                }}
                                            </button>
                                            <button
                                                type="reset"
                                                ref="resetButton"
                                                @click="dialog = false"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </VForm>
                                </div>
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useGlobalStore from "../stores/globalStore";
import Swal from "sweetalert2";

const name = "CarForm";
const schema = {
    name: "required|min:5|alphaSpaces",
    price: "required|integer",
    image: "required|URL",
    details: "required|min:30|max:120",
};
const swalAddMsg = "Created Data";
const swalEditMsg = "Edited Data";

const store = useGlobalStore();
const { modalType, carDataToBeEdited } = storeToRefs(store);
const { getCarDetails, postCarDetails, putCarDetails } = store;
const { openModal: dialog } = storeToRefs(store);

const timer = ref(null);
const resetButton = ref(null);

function resetCar() {
    resetButton.value.click();
}

function handleSubmit() {
    // using setTimeout just to avoid multiple submit calls
    clearTimeout(timer.value);
    timer.value = setTimeout(async () => {
        await submitBtn();
    }, 1000);
}
const swalAlert = () => {
    resetCar();
    Swal.fire({
        title: `${modalType.value === "add" ? swalAddMsg : swalEditMsg}`,
        html: `
          <div>
            <img src="${carDataToBeEdited.value.image}" alt="CarImage" class="swal-img" style="width:300px" />
            <h3>Car: ${carDataToBeEdited.value.name}</h3>
            <p>Price: ${carDataToBeEdited.value.price}</p>
            <p>Details: ${carDataToBeEdited.value.details}</p>
          </div>
      `,
        showCloseButton: false,
        showConfirmButton: true,
    });
};
async function submitBtn() {
    const responseData =
        modalType.value === "add"
            ? await postCarDetails(carDataToBeEdited.value)
            : await putCarDetails(carDataToBeEdited.value);

    if (responseData.status == 200 || responseData.status == 201) {
        swalAlert();
    }
}
</script>

<style scoped>
.modal-footer {
    display: flex;
    flex-direction: row-reverse;
}
.add-button-container {
    display: flex;
    margin: 10px 50px;
    flex-direction: row-reverse;
}
.swal-img {
    width: 300px;
}

.modal-title {
    color: #39484a;
}

.title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
}

.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.group {
    position: relative;
    margin-bottom: 20px;
}

.form .group label {
    font-size: 14px;
    color: rgb(99, 102, 102);
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: #f1f6f9;
    transition: all 0.3s ease;
}

.form .group .input,
.form .group .textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: 0;
    width: 100%;
    background-color: transparent;
}

.form .group .input:placeholder-shown + label,
.form .group .textarea:placeholder-shown + label {
    top: 10px;
    background-color: transparent;
}

.form .group input:focus,
.form .group .textarea:focus {
    border-color: #3366cc;
}

.form .group .input:focus + label,
.form .group .textarea:focus + label {
    top: -10px;
    left: 10px;
    background-color: #f1f6f9;
    color: #3366cc;
    font-weight: 600;
    font-size: 14px;
}

.form .group .textarea {
    resize: none;
    height: 100px;
}

.form button {
    background-color: #39484a;
    color: #fff;
    border: none;
    border-radius: 0.3em;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 5px;
}

.form button:hover {
    background-color: #849199;
}

.error_message {
    color: red;
    position: relative;
}
</style>
