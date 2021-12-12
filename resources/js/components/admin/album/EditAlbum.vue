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
    <br />
    <form @submit.prevent="editAlbum">
      <div class="formBox">
        <label for="fname">Név</label>
        <input type="text" v-model="albumName" placeholder="Név.." />
        <small style="color: red">{{ nameError }}</small>
      </div>
      <div class="formBox">
        <label for="public">Nyilvános</label>
        <label class="toggleSwitch">
          <input type="checkbox" id="public" v-model="album.public" />
          <span>
            <i></i>
          </span>
        </label>
      </div>
      <div class="formBox">
        <label>Elérési útvonal</label>
        <input type="text" :value="slug" disabled />
      </div>
      <div class="formBox">
        <label for="imageUpload">Borítókép</label>
        <input
          type="file"
          v-on:change="onFileChange"
          name="filename"
          id="imageUpload"
          style="display: none"
        />
        <label for="imageUpload" id="imageUploadButton">Kiválasztás</label
        ><br />
        <small style="color: red">{{ fileError }}</small>
      </div>
      <img v-if="url" :src="url" alt="preview_image" class="previewImage" />
      <img
        v-if="album.image && !url"
        :src="'/storage/album-images/' + album.image"
        alt="preview_image"
        class="previewImage"
      />

      <input type="submit" value="Mentés" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Toast from "./Toast";
import { ref } from "vue";

export default {
  data() {
    return {
      album: {},
      file: "",
      url: false,
      nameError: "",
      fileError: "",
      toastText: "",
      errorMessage: false,
      albumName: "",
      appUrl: document.getElementById("app").getAttribute("app_url"),
      path: "",
      notPublicPath: "",
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
  computed: {
    slug: function () {
      var slug = this.sanitizeTitle(this.albumName);
      return slug;
    },
  },
  mounted() {
    axios
      .get("/api/albums/edit/" + this.$route.params.id)
      .then((res) => {
        this.album = res.data;
        this.albumName = this.album.name;
        this.album.public = Boolean(this.album.public);
        if (!this.album.public) {
          this.notPublicPath = this.album.path;
        } else {
          this.notPublicPath =
            Math.random().toString(36).slice(2) +
            "" +
            Math.random().toString(36).slice(2);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
  methods: {
    refreshImage() {
      axios.get("/api/user/photo/" + this.user.id).then((res) => {
        if (res.data.length != 0) {
          this.photo = res.data[0]["path"];
          this.photoDel = true;
        }
      });
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    editAlbum(e) {
      e.preventDefault();
      let currentObj = this;
      let formData = new FormData();
      formData.append("file", this.file);
      this.album.name = this.albumName;
      this.album.path = this.path;
      formData.append("album", JSON.stringify(this.album));

      axios
        .post("/api/albums/update", formData)
        .then((response) => {
          if (response.data.error && response.data.error.name) {
            this.nameError = response.data.error.name[0];
          }
          if (response.data.error && response.data.error.file) {
            this.fileError = response.data.error.file[0];
          }
          if (response.data.error) {
            this.toastText = "Az album módosítása sikertelen!";
            this.errorMessage = true;
          } else {
            this.toastText = "Sikeresen módosította az albumot!";
            this.errorMessage = false;
          }
          this.triggerToast();
        })
        .catch(function (error) {
          currentObj.output = error;
          console.log(error);
        });
    },
    sanitizeTitle: function (albumName) {
      var slug = "";
      // Change to lower case
      var albumNameLower = albumName.toLowerCase();
      // Letter "e"
      slug = albumNameLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|ő|ö|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ü|ű|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "i"
      slug = slug.replace(/í/gi, "i");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      if (!this.album.public) {
        slug = this.notPublicPath;
      }
      this.path = slug;

      return this.appUrl + "/portfolio/" + slug;
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

.formBox input[type="text"] {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  font-weight: 300;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.toggleSwitch {
  --width: 70px;
  --height: 35px;
  position: relative;
  width: var(--width);
  height: var(--height);
  cursor: pointer;
  margin-top: 0 !important;
}
.toggleSwitch input {
  position: relative;
  z-index: 1;
  appearance: none;
}
.toggleSwitch span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fe0000;
  border-radius: var(--height);
  transition: 0.5;
  box-shadow: 0 6px 10px #fe000066;
}
.toggleSwitch input:checked ~ span {
  background: #05be05;
  box-shadow: 0 6px 10px #05be0566;
}
.toggleSwitch span i {
  position: absolute;
  width: calc(var(--height) - 8px);
  aspect-ratio: 1;
  background: #fff;
  border-radius: 50%;
  left: 4px;
  top: 4px;
}
/*
.toggleSwitch span i:before {
  content: "off";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fe0000;
  text-transform: uppercase;
  font-weight: 900;
  font-style: normal;
  font-size: 14px;
  transition: 0.5s;
}*/
.toggleSwitch input:checked ~ span i {
  left: calc((var(--width) - var(--height)) + 4px);
}
/*
.toggleSwitch input:checked ~ span i:before {
  content: "on";
  color: #05be05;
}*/

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
  font-size: 1rem;
  font-weight: 300;
  border: none;
  background-color: #05be05;
  color: white;
  cursor: pointer;
}

.previewImage {
  max-width: 300px;
  max-height: 300px;
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