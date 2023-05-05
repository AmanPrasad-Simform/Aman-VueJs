<template>
  <div class="registration-form">
    <div class="card">
      <div class="card-header">
        <div class="text-header">Register</div>
      </div>
      <div class="card-body">
        <form action="#">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              required=""
              class="form-control"
              name="email"
              id="email"
              type="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              required=""
              class="form-control"
              name="password"
              id="password"
              type="password"
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input
              required=""
              class="form-control"
              name="confirm-password"
              id="confirm-password"
              type="password"
            />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select>
              <option>Admin</option>
              <option>Employee</option>
              <option>Customer</option>
            </select>
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <div class="radioBtn">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  v-model="gender"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  v-model="gender"
                />
                Female
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              v-model="dob"
              :max="maxDate"
              @change="calculateAge"
            />
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" v-model="age" />
          </div>
          <input type="submit" class="btn" value="submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "registrationPage",
  data() {
    return {
      dob: "",
      age: null,
      registration: "registration",
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
      const dob = new Date(this.dob);
      const ageInMilliseconds = Date.now() - dob.getTime();
      const ageDate = new Date(ageInMilliseconds);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      this.age = calculatedAge;
    },
  },
};
</script>

<style scoped>
.registration-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 10px;
}

.card-header {
  background-color: #333;
  padding: 16px;
  text-align: center;
}

.card-header .text-header {
  margin: 0;
  font-size: 18px;
  color: rgb(255, 255, 255);
}

.card-body {
  padding: 16px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 1px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group input[type="number"],
.form-group input[type="date"] {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.radioBtn {
  display: flex;
  justify-content: center;
}
.btn {
  padding: 12px 24px;
  margin-left: 13px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.btn:hover {
  background-color: #ccc;
  color: #333;
}
</style>
