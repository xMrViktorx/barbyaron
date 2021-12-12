<template>
  <div class="login-section">
    <div class="form">
      <h1>Bejelentkezés</h1>
      <input
        type="text"
        v-model="name"
        name="username"
        placeholder="Felhasználónév"
      /><br />
      <input
        type="password"
        v-model="password"
        name="password"
        placeholder="Jelszó"
      /><br />
      <div>
        <input
          type="checkbox"
          v-model="remember"
          name="remember"
          id="remember"
        />
        <label for="remember">Bejelentkezve szeretnék maradni</label><br />
        <small style="color: red">{{ errorMessage }}</small>
      </div>
      <br />
      <input type="submit" value="Belépés" v-on:click="login()" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../../../router";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      remember: false,
      errorMessage: "",
    };
  },
  components: {},
  methods: {
    login() {
      console.log("click");
      axios
        .post("/api/admin/login", {
          name: this.name,
          password: this.password,
          remember: this.remember,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.message) {
            router.push("/admin");
          } else {
            this.errorMessage = "Hibás felhasználónév vagy jelszó!";
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
  },
};
</script>

<style scoped>
.login-section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
}

h1 {
  font-weight: bold;
}

.form {
  padding: 15px;
  text-align: center;
}
input[type="text"],
input[type="password"] {
  margin: 20px;
  padding: 5px;
  background: none;
  border: none;
  border-bottom: 2px solid #000;
  color: #000;
  font-size: 20px;
}

input:focus,
input:valid {
  outline: none;
}

input[type="submit"] {
  padding: 8px 20px;
  padding-top: 12px;
  margin-top: 20px;
  width: 160px;
  cursor: pointer;
  background: #1bfaad;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 4px;
  border: none;
  border-bottom: 4px solid #1bfaad;
}

input[type="checkbox"] {
  margin-right: 5px;
  vertical-align: middle;
  width: 15px;
  height: 15px;
}
</style>