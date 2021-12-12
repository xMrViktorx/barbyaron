<template>
  <nav :class="{ showNav: windowTop < 100, show: windowTop > 100 }">
    <div class="logo">B | A</div>
    <input type="checkbox" id="click" />
    <label for="click" class="menu-btn">
      <i class="fas fa-bars"></i>
    </label>

    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">Kezdőoldal</router-link>
      </li>
      <li><router-link :to="{ name: 'Portfolio' }">Portfólió</router-link></li>
      <li><router-link :to="{ name: 'Contact' }">Kapcsolat</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      windowTop: 0,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
  },
};
</script>

<style scoped>
.showNav {
  /*transform: translateY(-1000px);*/
  transition: 0.4s;
}
nav {
  display: flex;
  position: fixed;
  height: 60px;
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 85%
  );
  border-bottom: 1px solid #fff;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;
  z-index: 100;
  /*transform: translateY(-1000px);*/
  transition: 0.4s;
}

.show {
  transform: translateY(0);
}
nav .logo {
  color: #fff;
  font-family: "Playfair Display", serif;
  padding-bottom: 4px;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}
nav ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
nav ul li {
  margin: 0 5px;
}
nav ul li a {
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 15px;
  padding: 8px 15px;
  border-radius: 5px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
nav ul li a.active,
nav ul li a:hover {
  color: #000;
  background: #1bfaad;
}
nav .menu-btn i {
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: none;
}
input[type="checkbox"] {
  display: none;
}
@media (max-width: 1000px) {
  nav {
    padding: 0 40px 0 50px;
  }
}
@media (max-width: 920px) {
  nav .menu-btn i {
    display: block;
  }
  #click:checked ~ .menu-btn i:before {
    content: "\f00d";
  }
  nav ul {
    position: fixed;
    top: 60px;
    left: -100%;
    background: rgb(0, 0, 0, 0.8);
    height: 100vh;
    width: 100%;
    text-align: center;
    display: block;
    transition: all 0.3s ease;
  }
  #click:checked ~ ul {
    left: 0;
  }
  nav ul li {
    width: 100%;
    margin: 40px 0;
  }
  nav ul li a {
    color: #fff;
    width: 100%;
    margin-left: -100%;
    display: block;
    font-size: 20px;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  #click:checked ~ ul li a {
    margin-left: 0px;
  }
}
</style>