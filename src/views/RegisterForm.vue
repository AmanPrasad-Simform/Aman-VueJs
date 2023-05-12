<template>
  <div class="register-form">
    <h1 class="title-header">Register</h1>
    <VForm class="form" :validation-schema="schema" @submit="registerBtn">
      <div class="group">
        <VField
          name="name"
          placeholder=" "
          type="name"
          class="input"
          v-model="registerDetails.name"
        />
        <label for="name"> Name </label>
        <ErrorMessage name="name" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="email"
          placeholder=" "
          type="email"
          class="input"
          v-model="registerDetails.email"
        />
        <label for="email"> Email </label>
        <ErrorMessage name="email" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="password"
          placeholder=" "
          type="password"
          class="input"
          v-model="registerDetails.password"
        />
        <label for="password">Password</label>
        <ErrorMessage name="password" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="confirmPassword"
          placeholder=" "
          type="password"
          class="input"
        />
        <label for="confirmPassword">Confirm Password</label>
        <ErrorMessage name="confirmPassword" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="role"
          :bails="false"
          v-slot="{ field, errors }"
          v-model="registerDetails.role"
        >
          <select v-bind="field" class="input">
            <option disabled value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </select>
          <div class="error_message" v-for="err in errors" :key="err">
            {{ err }}
          </div>
        </VField>
        <label for="role">Role</label>
      </div>
      <div class="form-group">
        <div>
          <label for="gender" class="genderLabel">Gender: </label>
          <label class="radioLabel">
            <VField
              type="radio"
              name="gender"
              value="Male"
              v-model="registerDetails.gender"
            />
            Male
          </label>
          <label class="radioLabel">
            <VField
              type="radio"
              name="gender"
              value="Female"
              v-model="registerDetails.gender"
            />
            Female
          </label>
        </div>
        <ErrorMessage name="gender" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="dob"
          placeholder=" "
          type="date"
          class="input"
          v-model="registerDetails.dob"
          :max="maxDate"
          @change="calculateAge"
        />
        <label for="date">DOB</label>
        <ErrorMessage name="dob" class="error_message" />
      </div>
      <div class="group">
        <VField
          name="age"
          placeholder=" "
          type="number"
          class="input"
          disabled
          v-model="registerDetails.age"
        />
        <label for="age">Age</label>
        <ErrorMessage name="age" class="error_message" />
      </div>
      <div class="form-btn">
        <button type="reset">Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </VForm>
  </div>
</template>

<script>
import { postRegisterDetails } from "../api/api.js";
export default {
  name: "registerPage",
  data() {
    return {
      schema: {
        name: "required",
        email: "required|email",
        password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
        confirmPassword: "required|confirmed:@password",
        role: "select",
        gender: "gender",
        age: "required|integer",
        dob: (value) => {
          if (!value) {
            return "Date of birth is required";
          } else {
            const inputDate = new Date(value);
            const today = new Date();
            const lastDate = new Date("1923-12-31");
            const dateInFutureError = "Date cannot be in the future";
            const dateInPastError = "Date cannot be earlier than 01-01-1924";
            if (inputDate >= today) {
              return dateInFutureError;
            } else if (inputDate <= lastDate) {
              return dateInPastError;
            } else {
              return true;
            }
          }
        },
      },
      registerDetails: {
        name: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        dob: "",
        age: "",
      },
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },
  methods: {
    calculateAge() {
      const dob = new Date(this.registerDetails.dob);
      const ageInMilliseconds = Date.now() - dob.getTime();
      const ageDate = new Date(ageInMilliseconds);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      this.registerDetails.age = calculatedAge;
    },
    async registerBtn() {
      let response = await postRegisterDetails(this.registerDetails);
      if (response.status == 201) {
        this.$router.push({
          name: "login",
        });
        this.$el.querySelector("button[type=reset]").click();
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
}

.form-group {
  margin: 0 0 15px 0;
}

.title-header {
  color: #39484a;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 400px;
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

.form .group .input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: 0;
  width: 100%;
  background-color: transparent;
}

.form .group .input:placeholder-shown + label {
  top: 10px;
  background-color: transparent;
}

.form .group input:focus {
  border-color: #3366cc;
}

.form .group .input:focus + label {
  top: -10px;
  left: 10px;
  background-color: #f1f6f9;
  color: #3366cc;
  font-weight: 600;
  font-size: 14px;
}

.radioLabel,
.genderLabel {
  margin-right: 20px;
}

.form-btn {
  display: flex;
  gap: 10;
  justify-content: center;
}

.form button {
  background-color: #39484a;
  margin: 5px;
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

:disabled {
  cursor: not-allowed;
}

.error_message {
  color: red;
  position: relative;
}

@media (max-width: 768px) {
  .form {
    width: 340px;
  }

  .register-form {
    margin: 15px;
  }
}
</style>
