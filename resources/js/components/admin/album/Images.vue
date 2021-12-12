<template>
  <transition name="toast">
    <Toast v-if="showToast" :toastText="toastText" :error="errorMessage" />
  </transition>

  <div class="content">
    <div class="titleButtons">
      <span>Albumok</span>
      <router-link :to="{ name: 'Album' }"
        ><i class="fas fa-bars"></i
      ></router-link>
    </div>
    <hr />
    <form @submit.prevent="storeImages">
      <div class="formBox">
        <label for="imageUpload">Képek kiválasztása</label>
        <input
          type="file"
          v-on:change="onFileChange"
          name="filename"
          id="imageUpload"
          style="display: none"
          multiple
        />
        <label for="imageUpload" id="imageUploadButton">Kiválasztás</label
        ><br />
        <small style="color: #f00">{{ fileError }}</small>
      </div>
      <div class="formBox" v-if="showProgress">
        <progress max="100" :value.prop="uploadPercentage"></progress>
        <p>{{ uploadPercentage }}%</p>
      </div>

      <div class="images">
        <div class="image" v-for="(image, index) in url" :key="image">
          <span v-on:click="removePreviewImage(image, index)"
            ><i class="fas fa-trash-alt"></i
          ></span>
          <v-lazy-image :src="image" alt="preview_image" />
        </div>
      </div>
      <input type="submit" value="Mentés" />
    </form>
    <div class="images">
      <div class="image" v-for="(image, index) in images" :key="image">
        <span v-on:click="deleteImage(image)"
          ><i class="fas fa-trash-alt"></i
        ></span>
        <v-lazy-image
          :src="'/storage/album-images/' + image"
          alt="image"
          v-on:click="showImage(image, index)"
        />
      </div>
    </div>
  </div>

  <div class="modal" :class="{ showModal: showModal }">
    <span class="close" v-on:click="showModal = false">&times;</span>
    <i class="fas fa-download" id="download" v-on:click="downloadImage()"></i>
    <i
      class="fas fa-trash-alt"
      id="trash"
      v-on:click="deleteImage(images[index])"
    ></i>
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
      v-show="index + 1 < images.length"
    ></i>

    <img :src="modalImage" class="modalImg" />
  </div>
</template>

<script>
import axios from "axios";
import Toast from "./Toast";
import { ref } from "vue";
import VLazyImage from "v-lazy-image";

export default {
  data() {
    return {
      filename: "",
      file: "",
      url: {},
      images: {},
      deletedImages: {},
      modalImage: "",
      showModal: false,
      appUrl: document.getElementById("app").getAttribute("app_url"),
      index: 0,
      uploadPercentage: 0,
      showProgress: false,
      toastText: "",
      errorMessage: false,
      fileError: "",
    };
  },
  setup() {
    const showToast = ref(false);
    const triggerToast = () => {
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };
    return { showToast, triggerToast };
  },
  components: {
    Toast,
    VLazyImage,
  },
  mounted() {
    axios.get("/api/albums/images/get/" + this.$route.params.id).then((res) => {
      this.images = res.data;
    });
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files;
      for (let i = 0; i < this.file.length; i++) {
        this.url[i] = URL.createObjectURL(this.file[i]);
      }
    },
    storeImages(e) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      this.showProgress = true;
      e.preventDefault();
      let currentObj = this;
      let formData = new FormData();

      for (var i = 0; i < this.file.length; i++) {
        if (!this.deletedImages[i]) {
          let file = this.file[i];
          formData.append("files[" + i + "]", file);
        }
      }

      formData.append("album", JSON.stringify(this.$route.params.id));

      axios
        .post("/api/albums/images/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage =
              Math.floor((progressEvent.loaded / progressEvent.total) * 100) -
              1;
          }.bind(this),
        })
        .then((response) => {
          if (response.data.error) {
            this.fileError =
              "A fájl a következő típus egyike kell hogy legyen: jpg, png, bmp";
            this.url = {};
            this.showProgress = false;
            this.toastText = "Az képek feltöltése sikertelen!";
            this.errorMessage = true;
            this.triggerToast();
          } else {
            this.uploadPercentage = 100;
            this.images = response.data.images;
            this.url = {};
            this.showProgress = false;
            this.toastText = "A képek feltöltése sikeres!";
            this.errorMessage = false;
            this.triggerToast();
          }
        })
        .catch(function (error) {
          currentObj.output = error;
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    showImage(image, index) {
      this.modalImage = "/storage/album-images/" + image;
      this.showModal = true;
      this.index = index;
    },

    nextImage() {
      this.showImage(this.images[this.index + 1], this.index + 1);
    },

    previousImage() {
      this.showImage(this.images[this.index - 1], this.index - 1);
    },

    downloadImage() {
      axios({
        url: this.appUrl + this.modalImage,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
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
      });
    },
    deleteImage(image) {
      if (confirm("Tényleg törölni szeretnéd ezt a képet?")) {
        axios
          .post("/api/albums/images/delete", { image: JSON.stringify(image) })
          .then((res) => {
            this.images.splice(this.images.indexOf(image), 1);
            this.showModal = false;
          })
          .catch(function (error) {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      }
    },
    removePreviewImage(image, index) {
      delete this.url[index];
      this.deletedImages[index] = image;
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

.modal {
  display: none;
}

.showModal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
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
#download,
#trash {
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

#trash {
  font-size: 20px;
  top: 28px;
  right: 160px;
}

.images {
  line-height: 0;
  column-gap: 0px;
  column-count: 5;
}

.images .image span {
  position: absolute;
  color: #fff;
  font-size: 18px;
  z-index: 1;
  padding-top: 12px;
  padding-left: 12px;
  cursor: pointer;
}

.images img {
  width: 100% !important;
  height: auto !important;
  padding: 4px;
  cursor: pointer;
}

.formBox label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 20px;
}

#imageUploadButton {
  background-color: #ccc;
  padding: 10px;
  display: inline-block;
  margin: 0;
  margin-bottom: 20px;
  cursor: pointer;
}

input[type="submit"] {
  width: 100%;
  padding: 8px;
  margin-top: 15px;
  margin-bottom: 50px;
  font-size: 1rem;
  font-weight: 300;
  border: none;
  background-color: #05be05;
  color: white;
  cursor: pointer;
}

.formBox progress,
progress {
  width: 100%;
  height: 30px;
}

.previewImage {
  max-width: 300px;
  max-height: 300px;
}

@media (max-width: 1200px) {
  .images {
    column-count: 4;
  }
}
@media (max-width: 1000px) {
  .images {
    column-count: 3;
  }
}
@media (max-width: 800px) {
  .images {
    column-count: 2;
  }
}
@media (max-width: 400px) {
  .images {
    column-count: 1;
  }
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
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>