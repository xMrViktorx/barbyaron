<template>
  <div class="body">
    <section>
      <div class="side" id="side1" v-bind:style="{ left: side1 }">
        <video-background
          class="video"
          :src="src"
          overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)"
        >
        </video-background>
      </div>
      <div class="side" id="side2" v-bind:style="{ left: side2 }">
        <video-background
          class="video"
          :src="src"
          overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)"
        >
        </video-background>
      </div>
    </section>
    <div class="content">
      <div class="text">
        <h1>BARBY AND ARON</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
          voluptas ut in optio? Quisquam tenetur unde nisi repudiandae ut
          delectus fugit provident aperiam harum. Error consequuntur iste
          asperiores nulla reprehenderit?
        </p>
        <br />
        <router-link :to="{ name: 'Contact' }" id="contact_us"
          >Kapcsolat</router-link
        >
        <br /><br /><br /><br />
        <div class="social_icons">
          <span>Kövess minket más platformokon is!</span>
          <a
            href="https://www.youtube.com/channel/UCHoGcooCLdJZ0Uy8DxvYY4g"
            target="blank"
            ><i class="fab fa-youtube"></i
          ></a>
          <a href="https://www.instagram.com/barbyaronphoto/" target="blank"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>

        <h2 id="top_albums_title">Legnézettebb albumok</h2>
        <div class="portfolioNav">
          <span v-show="slidesPerView != 3" class="portfolioPrevArrow"
            ><i class="fas fa-chevron-left"></i
          ></span>

          <swiper
            :slides-per-view="slidesPerView"
            :space-between="40"
            :navigation="{
              nextEl: '.portfolioNextArrow',
              prevEl: '.portfolioPrevArrow',
            }"
            class="portfolio"
          >
            <swiper-slide v-for="album in albums" :key="album">
              <div class="card">
                <div
                  class="card-image"
                  v-bind:style="{
                    'background-image':
                      'url(' + '/storage/album-images/' + album.image + ')',
                  }"
                ></div>
                <div class="card-text">
                  <span class="date">{{
                    moment(album.created_at).fromNow()
                  }}</span>
                  <h2>{{ album.name }}</h2>
                  <router-link
                    :to="{
                      name: 'PortfolioImages',
                      params: { path: album.path },
                    }"
                    >Megtekintés</router-link
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
              </div></swiper-slide
            >
          </swiper>
          <span v-show="slidesPerView != 3" class="portfolioNextArrow"
            ><i class="fas fa-chevron-right"></i
          ></span>
        </div>
        <h2 id="top_albums_title">Instagram</h2>
        <div class="portfolioNav">
          <span class="instagramPrevArrow"
            ><i class="fas fa-chevron-left"></i
          ></span>

          <swiper
            :slides-per-view="slidesPerView"
            :space-between="40"
            :navigation="{
              nextEl: '.instagramNextArrow',
              prevEl: '.instagramPrevArrow',
            }"
          >
            <swiper-slide v-for="image in instagram" :key="image">
              <div style="position: relative" class="instagramImage">
                <img
                  :src="image"
                  alt="image"
                  style="display: block; width: 100%; height: auto"
                />
                <div>
                  <div class="overlay">
                    <div class="text">
                      <div class="social_icons">
                        <a
                          href="https://www.instagram.com/barbyaronphoto/"
                          target="blank"
                          ><i class="fab fa-instagram"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </div></div
            ></swiper-slide>
          </swiper>
          <span class="instagramNextArrow"
            ><i class="fas fa-chevron-right"></i
          ></span>
        </div>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import VideoBackground from "vue-responsive-video-background-player";
import axios from "axios";
import moment from "moment";
import "moment/locale/hu";

import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  data() {
    return {
      side1: 0,
      side2: 0,
      slidesPerView: 3,
      albums: {},
      window: {
        width: 0,
        height: 0,
      },
      instagramPhotos: [],
      src: "",
      instagram: [],
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.moment = moment;
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
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
        this.albums = res.data.topAlbums;
        this.instagram = res.data.instagram;
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
      .finally(
        () => loader.hide(),
        (this.src = "../../videos/motocross_video.mp4")
      );
  },
  methods: {
    handleScroll() {
      this.side1 = -window.pageYOffset + "px";
      this.side2 = window.pageYOffset + "px";
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if ((this.window.width <= 1710) & (this.window.width > 1000)) {
        this.slidesPerView = 2;
      } else if (this.window.width <= 1000) {
        this.slidesPerView = 1;
      } else {
        this.slidesPerView = 3;
      }
    },
  },
  components: {
    VideoBackground,
    Swiper,
    SwiperSlide,
    Navigation,
  },
};
</script>


<style scoped>
.body {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("../../assets/images/background_image.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  position: absolute;
  width: 100%;
  font-family: "Montserrat", sans-serif;
}
section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

section .side {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

section .side#side1 {
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}

section .side#side2 {
  clip-path: polygon(0 0, 100% 0%, 100% 100%);
}

section .side .video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  color: #fff;
  margin-top: 160vh;
  text-align: center;
  display: flex;
  justify-content: center;
}

.content .text {
  width: 60%;
}

.content .text h1 {
  background-color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-family: serif;
  font-size: 5vw;
  letter-spacing: 4px;
  word-break: none;
}

@media (max-width: 1100px) {
  .content .text h1 {
    font-size: 10vw;
  }

  .content .text {
    width: 90%;
  }
}

.content .text p {
  padding: 50px 0;
  font-size: 22px;
}

.content .text a#contact_us {
  border: 2px solid #fff;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px;
  transition: 0.4s;
  font-size: 30px;
  font-weight: 600;
}

.content .text a#contact_us:hover {
  background-color: #1bfaad;
  border-color: #000;
  color: #000;
}

.content .text .social_icons span {
  margin-top: 80px;
  font-size: 40px;
  font-weight: 700;
  display: block;
}

.content .text .social_icons a i {
  cursor: pointer;
  margin: 20px;
  transition: 0.3s;
  font-size: 40px;
  color: #fff;
}

.content .text .social_icons a i:hover {
  transform: scale(1.2);
  color: #1bfaad;
}

#top_albums_title {
  font-size: 50px;
  margin: 20px 0;
  margin-top: 100px;
  border-bottom: 1px solid #fff;
}

.portfolio {
  width: 90%;
  margin-bottom: 40px;
}

@media (max-width: 500px) {
  #top_albums_title {
    font-size: 45px;
  }
}

@media (max-width: 1100px) {
  .portfolio {
    width: 60%;
    cursor: grab;
  }
}

@media (max-width: 500px) {
  .portfolio {
    width: 100%;
    cursor: grab;
  }
}

.card {
  display: grid;
  grid-template-rows: 210px 210px 80px;
  grid-template-areas: "image" "text" "stats";
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  transition: 0.5s ease;
  overflow: hidden;
}

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
  color: #000;
  width: 100%;
}

.card-text .date {
  color: rgb(255, 7, 110);
  font-size: 13px;
}

.card-text h2 {
  margin-top: 10px;
  font-size: 20px;
  padding: 0 5px;
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

.portfolioNav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.portfolioPrevArrow,
.instagramPrevArrow {
  cursor: pointer;
  font-size: 50px;
  font-weight: bold;
  padding-right: 10px;
}
.portfolioNextArrow,
.instagramNextArrow {
  cursor: pointer;
  font-size: 50px;
  font-weight: bold;
  padding-left: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: 0.5s ease;
  opacity: 0;
  cursor: pointer;
}

.overlay .text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.instagramImage:hover .overlay {
  opacity: 1;
}
</style>