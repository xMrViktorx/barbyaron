<template>
  <div class="body">
    <div class="images">
      <v-lazy-image
        v-for="(image, index) in images"
        :key="image"
        :src="'/storage/album-images/' + image"
        alt="image"
        v-on:click="showImage(image, index)"
      />
    </div>
    <span class="downloadButton" v-on:click="downloadAlbum()"
      ><i class="fas fa-cloud-download-alt"></i
    ></span>
    <div class="pagination">
      <span
        v-for="link in links"
        :key="link"
        v-html="link.label"
        v-on:click="getPortfolioImages(link.url)"
        :class="{ activeLink: link.active, disabledLink: !link.url }"
      ></span>
    </div>

    <span
      class="scrollToTop"
      v-on:click="scrollToTop()"
      :class="{ showScrollToTop: windowTop > 600 }"
      ><i class="fas fa-arrow-up"></i
    ></span>
  </div>

  <div class="modal" :class="{ showModal: showModal }">
    <span class="close" v-on:click="showModal = false">&times;</span>
    <i class="fas fa-download" id="download" v-on:click="downloadImage()"></i>
    <i
      class="fas fa-chevron-left"
      id="leftArrow"
      v-on:click="previousImage()"
      v-show="index > 0"
    ></i>
    <i
      class="fas fa-chevron-right"
      id="rightArrow"
      v-on:click="nextImage()"
      v-show="
        index + 1 < total &&
        index < Object.keys(this.images)[Object.keys(this.images).length - 1]
      "
    ></i>
    <img :src="modalImage" class="modalImg" />
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import VLazyImage from "v-lazy-image";

export default {
  data() {
    return {
      images: {},
      modalImage: "",
      showModal: false,
      index: 0,
      appUrl: document.getElementById("app").getAttribute("app_url"),
      windowTop: 0,
      fileName: "",
      links: {},
      total: 0,
    };
  },
  components: { VLazyImage },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.getPortfolioImages("/?page=1");
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    getPortfolioImages(url) {
      if (!url) {
        return;
      }
      let loader = this.$loading.show({
        isFullPage: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8,
      });

      axios
        .get("/api/portfolio/images/" + this.$route.params.path + url)
        .then((res) => {
          if (res.data.error) {
            router.push({ name: "Portfolio" });
            return;
          }

          res.data.links[0].label = "&laquo;";
          res.data.links[res.data.links.length - 1].label = "&raquo;";
          this.total = res.data.total;
          this.images = res.data.data;
          this.links = res.data.links;
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
        .finally(() => loader.hide());
    },
    showImage(image, index) {
      this.modalImage = "/storage/album-images/" + image;
      this.showModal = true;
      this.index = parseInt(index);
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    nextImage() {
      this.showImage(this.images[this.index + 1], this.index + 1);
    },

    previousImage() {
      this.showImage(this.images[this.index - 1], this.index - 1);
    },

    downloadImage() {
      let loader = this.$loading.show({
        isFullPage: true,
        enforceFocus: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8,
      });

      axios({
        url: this.appUrl + this.modalImage,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            this.modalImage.substr(
              this.modalImage.lastIndexOf("/") + 1,
              this.modalImage.length
            )
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
        .finally(() => setTimeout(() => loader.hide(), 2000));
    },
    onScroll(e) {
      this.windowTop = window.top.scrollY;
    },
    downloadAlbum() {
      let loader = this.$loading.show({
        isFullPage: true,
        enforceFocus: true,
        lockScroll: true,
        color: "#fff",
        backgroundColor: "#000",
        opacity: 0.8,
      });
      axios
        .get("/api/portfolio/images/" + this.$route.params.path + "/download")
        .then((res) => {
          let url = this.appUrl + "/zip/" + res.data.fileName;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
        .finally(() => setTimeout(() => loader.hide(), 2000));
    },
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
}

.modal {
  display: none;
}

.showModal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 103; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

.showModal .modalImg {
  max-width: 100%;
  max-height: 100%;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.showModal .close {
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 35px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

#leftArrow,
#rightArrow,
#download {
  color: #fff;
  font-size: 40px;
  position: absolute;
  cursor: pointer;
}

#leftArrow {
  left: 50px;
}

#rightArrow {
  right: 50px;
}

#download {
  font-size: 20px;
  top: 28px;
  right: 100px;
}

.images {
  line-height: 0;
  column-gap: 0px;
  column-count: 10;
  margin: 50px;
  margin-top: 100px;
}

.images img {
  width: 100% !important;
  height: auto !important;
  padding: 4px;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .images {
    column-count: 6;
  }
}
@media (max-width: 1000px) {
  .images {
    column-count: 5;
  }
}
@media (max-width: 800px) {
  .images {
    column-count: 3;
  }
}
@media (max-width: 400px) {
  .images {
    column-count: 2;
  }
}
.scrollToTop {
  display: none;
}
.showScrollToTop {
  display: block;
  color: #fff;
  font-size: 25px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  bottom: 40px;
  right: 20px;
  cursor: pointer;
}

.downloadButton {
  color: #fff;
  font-size: 35px;
  padding: 5px;
  position: fixed;
  top: 70px;
  right: 10px;
  cursor: pointer;
  z-index: 100;
}
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
.pagination {
  color: #fff;
  padding-bottom: 50px;
  z-index: 102;
}

.pagination span {
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  font-size: 20px;
}

.pagination span.activeLink {
  font-weight: bold;
  font-size: 24px;
}

.pagination span.disabledLink {
  cursor: default;
  color: #aaa;
}
</style>