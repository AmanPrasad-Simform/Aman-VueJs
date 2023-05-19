<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{
              modalType === "add"
                ? "Add the Car Details"
                : "Edit the Car Details"
            }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetCar"
          ></button>
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
              <label for="name"> Car Name </label>

              <ErrorMessage name="name" class="error_message" />
            </div>
            <div class="group">
              <VField
                name="price"
                placeholder=" "
                type="number"
                class="input"
                v-model="carDataToBeEdited.price"
              />
              <label for="price">Price</label>
              <ErrorMessage name="price" class="error_message" />
            </div>

            <div class="group">
              <VField
                name="image"
                placeholder=" "
                type="text"
                class="input"
                v-model="carDataToBeEdited.image"
              />

              <label for="image">Image URL</label>
              <ErrorMessage name="image" class="error_message" />
            </div>
            <div class="group">
              <vField
                name="details"
                :bails="false"
                v-slot="{ field, errors }"
                v-model="carDataToBeEdited.details"
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
                <div class="error_message" v-for="err in errors" :key="err">
                  {{ err }}
                </div>
              </vField>
              <label for="details">Car Details</label>
            </div>
            <div class="modal-footer">
              <button type="reset" data-bs-dismiss="modal">Cancel</button>
              <button type="submit">
                {{ modalType === "add" ? "Submit" : "Update" }}
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import useGlobalStore from "../stores/globalStore";
import Swal from "sweetalert2";
export default {
  name: "CarForm",
  data() {
    return {
      schema: {
        name: "required|min:5|alphaSpaces",
        price: "required|integer",
        image: "required|URL",
        details: "required|min:30|max:120",
      },
      swalAddMsg: "Created Data",
      swalEditMsg: "Edited Data",
    };
  },
  computed: {
    ...mapState(useGlobalStore, {
      modalType: "modalType",
    }),
    ...mapWritableState(useGlobalStore, ["carDataToBeEdited"]),
  },
  methods: {
    ...mapActions(useGlobalStore, [
      "getCarDetails",
      "postCarDetails",
      "putCarDetails",
    ]),
    resetCar() {
      this.$el.querySelector("button[type=reset]").click();
    },
    handleSubmit() {
      // using setTimeout just to avoid multiple submit calls
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        await this.submitBtn();
      }, 1000);
    },
    async submitBtn() {
      if (this.modalType === "add") {
        await this.postCarDetails(this.carDataToBeEdited);
      } else {
        await this.putCarDetails(this.carDataToBeEdited);
      }
      this.resetCar();
      Swal.fire({
        title: `${
          this.modalType === "add" ? this.swalAddMsg : this.swalEditMsg
        }`,
        html: `
      <div>
        <img src="${this.carDataToBeEdited.image}" alt="CarImage" class="swal-img" style="width:300px" />
        <h3>Car: ${this.carDataToBeEdited.name}</h3>
        <p>Price: ${this.carDataToBeEdited.price}</p>
        <p>Details: ${this.carDataToBeEdited.details}</p>
      </div>
  `,
        showCloseButton: false,
        showConfirmButton: true,
      });
    },
  },
};
</script>

<style scoped>
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
}

.form button:hover {
  background-color: #849199;
}

.error_message {
  color: red;
  position: relative;
}
</style>
