<template>
  <transition name="toast">
    <Toast v-if="showToast" :toastText="toastText" :error="errorMessage" />
  </transition>

  <div class="content">
    <div class="titleButtons">
      <span>Albumok</span>
      <router-link :to="{ name: 'CreateAlbum' }"
        ><i class="fas fa-plus"></i
      ></router-link>
    </div>
    <hr />
    <div style="overflow-x: auto">
      <table>
        <tr>
          <th>Kép</th>
          <th>Név</th>
          <th>Elérhetőség</th>
          <th>Létrehozva</th>
          <th></th>
        </tr>
        <tr v-for="album in albums" :key="album">
          <td>
            <img
              :src="'/storage/album-images/' + album.image"
              alt="albumImage"
              v-on:click="showImage(album)"
            />
          </td>
          <td>{{ album.name }}</td>
          <td>{{ album.public ? "Nyilvános" : "Nem nyilvános" }}</td>
          <td>{{ moment(album.created_at).format("YYYY-MM-DD hh:mm") }}</td>
          <td class="icons">
            <i class="fas fa-trash-alt" v-on:click="deleteAlbum(album)"></i>
            <i class="fas fa-pen" v-on:click="editAlbum(album)"></i>
            <i class="fas fa-images" v-on:click="showImages(album)"></i>
          </td>
        </tr>
      </table>
    </div>
    <div class="modal" :class="{ showModal: showModal }">
      <span class="close" v-on:click="showModal = false">&times;</span>

      <img :src="modalImage" class="modalImg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import router from "../../../../router";
import Toast from "./Toast";
import { ref } from "vue";
export default {
  data() {
    return {
      albums: {},
      modalImage: "",
      showModal: false,
      toastText: "",
      errorMessage: false,
    };
  },
  created: function () {
    this.moment = moment;
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
      .get("/api/albums")
      .then((res) => {
        this.albums = res.data;
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
  methods: {
    deleteAlbum(album) {
      if (confirm("Tényleg törölni szeretnéd ezt az albumot?")) {
        axios
          .post("/api/albums/delete/" + album.id)
          .then((res) => {
            if (res.data.success) {
              this.toastText = "Az album törlése sikeres!";
              this.errorMessage = false;
              this.triggerToast();
              this.albums.splice(this.albums.indexOf(album), 1);
            } else {
              this.toastText = "Az album törlése sikertelen!";
              this.errorMessage = true;
              this.triggerToast();
            }
          })
          .catch(function (error) {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      }
    },

    editAlbum(album) {
      router.push({ name: "EditAlbum", params: { id: album.id } });
    },
    showImages(album) {
      router.push({ name: "Images", params: { id: album.id } });
    },
    showImage(album) {
      this.modalImage = "/storage/album-images/" + album.image;
      this.showModal = true;
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

.content table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
}

.content td,
th {
  border: none;
  text-align: left;
  padding: 8px;
}

.content td img {
  width: 100px;
  cursor: pointer;
  transition: 0.3s;
}

.content td img:hover {
  opacity: 0.7;
}

.content tr:nth-child(even) {
  background-color: #f2f2f2;
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
  background-color: #38c172;
  color: #fff;
  padding: 6px;
  cursor: pointer;
}
td.icons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
  margin-bottom: 50%;
}
td.icons i {
  color: #fff;
  padding: 6px;
  margin-right: 5px;
  cursor: pointer;
}

td.icons i:nth-child(3) {
  background-color: #287bff;
}

td.icons i:nth-child(2) {
  background-color: #d4ae6c;
}

td.icons i:nth-child(1) {
  background-color: #e3342f;
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
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
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