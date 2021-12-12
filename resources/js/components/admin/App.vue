<template>
  <div class="container">
    <div class="navigation" :class="{ active: showNav }">
      <ul>
        <li>
          <a href="#">
            <span class="icon"><i class="fas fa-camera"></i></span>
            <span class="title" style="margin-top: 2px">BarbyAron</span>
          </a>
        </li>
        <li
          v-for="menu in menus"
          :key="menu"
          :class="{ hovered: menu.hovered }"
          @mouseover="activeLink(menu)"
        >
          <router-link :to="{ name: menu.link }">
            <span class="icon"><i :class="menu.icon"></i></span>
            <span class="title">{{ menu.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- main -->

    <div class="main" :class="{ active: showNav }">
      <div class="topbar">
        <div class="toggle" v-on:click="toogleNav">
          <i class="fas fa-bars"></i>
        </div>
        <!-- search 
        <div class="search">
          <label>
            <input type="text" placeholder="Search here" />
            <i class="fas fa-search"></i>
          </label>
        </div> -->
        <!-- userImg -->
        <div class="user">
          <img src="../../../assets/images/user.jpg" alt="user" />
          <div class="dropdown-content">
            <router-link :to="{ name: 'Profil' }">Profil</router-link>
            <span v-on:click="logout()">Kilépés</span>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../../router";
export default {
  data() {
    return {
      main: false,
      navigation: false,
      showNav: false,
      menus: [
        { title: "Áttekintés", link: "Dashboard", icon: "fas fa-home" },
        { title: "Albumok", link: "Album", icon: "fas fa-images" },
      ],
      previousHover: "",
    };
  },

  mounted() {},
  methods: {
    toogleNav() {
      this.showNav = !this.showNav;
    },
    activeLink(item) {
      if (this.previousHover.hovered) this.previousHover.hovered = false;
      item.hovered = true;
      this.previousHover = item;
    },
    logout() {
      axios
        .post("/api/admin/logout")
        .then((res) => {
          if (res.data.message) {
            router.push("/admin/login");
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

<style>
:root {
  --blue: #287bff;
  --white: #fff;
  --grey: #f5f5f5;
  --black1: #222;
  --black2: #999;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
  font-family: "Montserrat", sans-serif;
}

.container {
  position: relative;
  width: 100%;
}

.navigation {
  position: fixed;
  width: 300px;
  height: 100%;
  background: var(--blue);
  border-left: 10px solid var(--blue);
  transition: 0.5s;
  overflow: hidden;
}
.navigation.active {
  width: 80px;
}

.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navigation ul li {
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.hovered {
  background: var(--white);
}

.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
  pointer-events: none;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: var(--white);
}

.navigation ul li:hover a,
.navigation ul li.hovered a {
  color: var(--blue);
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 70px;
  text-align: center;
}

.navigation ul li a .icon i {
  font-size: 1.5em;
}

.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

/* curve outside */
.navigation ul li:hover a::before,
.navigation ul li.hovered a::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--white);
}
.navigation ul li:hover a::after,
.navigation ul li.hovered a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--white);
}

/* main */
.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background: var(--white);
  transition: 0.5s;
}

.main.active {
  width: calc(100% - 80px);
  left: 80px;
}

.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.toggle {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  font-size: 2em;
  margin-top: 30px;
  cursor: pointer;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;
}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--black2);
}

.search label i {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 1em;
}

.user {
  position: relative;
  min-width: 40px;
  height: 40px;
  /*overflow: hidden;*/
  cursor: pointer;
}

.user:hover .dropdown-content {
  display: block;
}

.user img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  object-fit: cover;
}

/* responsive */

@media (max-width: 991px) {
  .navigation {
    left: -300px;
  }
  .navigation.active {
    width: 300px;
    left: 0;
  }
  .main {
    width: 100%;
    left: 0;
  }
}

@media (max-width: 580px) {
  .user {
    min-width: 40px;
  }

  .navigation {
    width: 100%;
    left: -100%;
    z-index: 1000;
  }

  .navigation.active {
    width: 100%;
    left: 0;
  }

  .toggle {
    z-index: 10001;
  }

  .main.active .toggle {
    position: fixed;
    right: 0;
    left: initial;
    color: var(--white);
  }
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 50px;
}

.dropdown-content:before {
  position: absolute;
  border-color: transparent transparent var(--blue);
  border-style: solid;
  border-width: 10px;
  content: " ";
  height: 0;
  right: 10px;
  top: -18px;
  width: 0;
}

.dropdown-content span,
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content span:hover,
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-content:hover {
  display: block;
}
</style>