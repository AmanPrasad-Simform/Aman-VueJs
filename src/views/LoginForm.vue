<template>
  <div class="login-form">
    <h1 class="title-header">Login</h1>
    <VForm class="form" :validation-schema="schema" @submit="loginBtn">
      <div class="group">
        <VField
          name="email"
          placeholder=" "
          type="email"
          class="input"
          v-model="loginDetails.email"
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
          v-model="loginDetails.password"
        />
        <label for="password">Password</label>
        <ErrorMessage name="password" class="error_message" />
      </div>
      <div class="form-btn">
        <button type="reset">Cancel</button>
      <Transition name="shake">
        <button type="submit">Submit</button>
      </Transition>
      </div>
    </VForm>
  </div>
</template>

<script>
import { postLoginDetails } from "../api/api.js";
export default {
  name: "loginPage",

  data() {
    return {
      schema: {
        email: "required|email",
        password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
      },
      loginDetails: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginBtn() {
      let response = await postLoginDetails(this.loginDetails);
      if (response.status == 200) {
        this.$el.querySelector("button[type=reset]").click();
        this.$router.push({
          name: "home",
        });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.shake-enter-from{
  opacity: 0.3;
}
.shake-enter-to{
  opacity: 1;
}
.shake-enter-active {
  transition: all 1s ease;
}

@keyframes shakeAnimation {
  0% { transform: translateX(-10px); }
  25% { transform: translateX(10px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
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
  border-color: #39484a;
}

.form .group .input:focus + label {
  top: -10px;
  left: 10px;
  background-color: #f1f6f9;
  color: #39484a;
  font-weight: 600;
  font-size: 14px;
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

.error_message {
  color: red;
  position: relative;
}

@media (max-width: 768px) {
  .form {
    width: 340px;
  }
}
</style>
