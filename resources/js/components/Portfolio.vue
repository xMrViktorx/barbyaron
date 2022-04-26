<template>
  <div class="body">
    <div class="card" v-for="album in albums" :key="album">
      <div
        class="card-image"
        v-bind:style="{
          'background-image':
            'url(' + '/storage/album-images/' + album.image + ')',
        }"
      ></div>
      <div class="card-text">
        <span class="date">{{ moment(album.created_at).fromNow() }}</span>
        <h2>{{ album.name }}</h2>
        <router-link
          :to="{ name: 'PortfolioImages', params: { path: album.path } }"
          ><span>Megtekintés</span></router-link
        >
      </div>
      <div class="card-stats">
        <div class="stat">
          <div class="value">{{ album.view }}</div>
          <div class="type">megtekintés</div>
        </div>
        <div class="stat border">
          <div class="value">{{ album.images }}</div>
          <div class="type">kép</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/hu";
moment.locale("hu");
export default {
  data() {
    return {
      albums: {},
    };
  },
  created: function () {
    this.moment = moment;
  },
  mounted() {
    let loader = this.$loading.show({
      isFullPage: true,
      enforceFocus: true,
      lockScroll: true,
      color: "#fff",
      backgroundColor: "#000",
      opacity: 0.8,
    });

    axios
      .get("/api/portfolio")
      .then((res) => {
        this.albums = res.data.albums;
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
      .finally(() => loader.hide());
  },
};
</script>

<style scoped>
.body {
  /*width: 100vw;*/
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background: url("../../assets/images/background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: "Montserrat", sans-serif;
}

.card {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 210px 210px 80px;
  grid-template-areas: "image" "text" "stats";
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  transition: 0.5s ease;
  margin: 30px;
  overflow: hidden;
}
/*
.card:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}
*/
.card-image {
  grid-area: image;
  cursor: pointer;
}
.card-text {
  grid-area: text;
}
.card-stats {
  grid-area: stats;
}

.card-image {
  grid-area: image;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.6s ease-in;
}

.card-image:hover {
  transform: scale(1.4);
  transition: all 0.6s ease-in;
}

.card-text {
  grid-area: text;
  padding-top: 25px;
  z-index: 1;
  background: #fff;
  width: 100%;
}

.card-text .date {
  color: rgb(255, 7, 110);
  font-size: 13px;
}

.card-text h2 {
  margin-top: 5px;
  font-size: 20px;
}

.card-text a {
  text-decoration: none;
  background-color: #1bfaad;
  padding: 13px;
  font-size: 18px;
  color: #000;
  position: relative;
  bottom: -45px;
}

.card-text a:hover {
  border-bottom: 4px solid #000;
}

.card-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #1bfaad;
}

.card-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #000;
  padding: 10px;
}

.card-stats .stat.border {
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}

@media (max-width: 920px) {
  .body {
    padding-top: 80px;
  }
}
</style>