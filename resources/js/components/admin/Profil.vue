<template>
  <transition name="toast">
    <Toast v-if="showToast" :toastText="toastText" :error="errorMessage" />
  </transition>

  <div class="content">
    <div class="titleButtons">
      <span>Profil</span>
    </div>
    <hr />
    <br />
    <form @submit.prevent="updateUser">
      <div class="formBox">
        <label for="name">Név</label>
        <input type="text" id="name" v-model="user.name" placeholder="Név" />
        <small style="color: red">{{ nameError }}</small>
      </div>
      <div class="formBox">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          v-model="user.email"
          placeholder="Email"
        />
        <small style="color: red">{{ nameError }}</small>
      </div>
      <br />
      <div class="formBox">
        <label for="oldPassword">Régi jelszó</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          placeholder="Régi jelszó"
        />
        <small style="color: red">{{ oldPassError }}</small>
      </div>
      <div class="formBox">
        <label for="newPassword">Új jelszó</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          placeholder="Új jelszó"
        />
        <small style="color: red">{{ newPassError }}</small>
      </div>
      <input type="submit" value="Mentés" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Toast from "./album/Toast";
import { ref } from "vue";

export default {
  data() {
    return {
      user: {},
      nameError: "",
      oldPassword: "",
      newPassword: "",
      oldPassError: "",
      newPassError: "",
      toastText: "",
      errorMessage: false,
    };
  },
  components: {
    Toast,
  },
  setup() {
    const showToast = ref(false);
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };
    return { showToast, triggerToast };
  },
  mounted() {
    axios
      .get("/api/user")
      .then((res) => {
        this.user = res.data;
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
  methods: {
    updateUser() {
      axios
        .post("/api/user/update", {
          user: this.user,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((response) => {
          if (response.data.error) {
            this.toastText = "Sikertelen művelet a jelszó megváltoztatásakor!";
            this.errorMessage = true;
            this.triggerToast();
          } else {
            this.toastText = "Sikeresen módosította az albumot!";
            this.errorMessage = false;
            this.triggerToast();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.content {
  width: 80%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
}

.titleButtons {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.titleButtons span {
  padding-top: 10px;
}

.titleButtons i {
  background-color: #d4ae6c;
  color: #fff;
  padding: 6px;
  cursor: pointer;
}

.formBox label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 20px;
}

.formBox input[type="text"],
.formBox input[type="password"] {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  font-weight: 300;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="submit"] {
  width: 100%;
  padding: 8px;
  margin-top: 15px;
  font-size: 1rem;
  font-weight: 300;
  border: none;
  background-color: #05be05;
  color: white;
  cursor: pointer;
}

/* enter transitions */
.toast-enter-active {
  animation: wobble 0.5s ease;
}
/* leave transitions */
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
@keyframes wobble {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
    opacity: 1;
  }
  70% {
    transform: translateX(-8px);
    opacity: 1;
  }
  80% {
    transform: translateX(4px);
    opacity: 1;
  }
  90% {
    transform: translateX(-4px);
    opacity: 1;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>