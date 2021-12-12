<template>
  <!-- cards -->
  <div class="cardBox">
    <div class="card">
      <div>
        <div class="numbers">{{ data.dailyView }}</div>
        <div class="cardName">Napi látogató</div>
      </div>
      <div class="iconBx">
        <i class="fas fa-eye"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers">{{ data.allView }}</div>
        <div class="cardName">Összes látogató</div>
      </div>
      <div class="iconBx">
        <i class="far fa-eye"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers">{{ data.albumNum }}</div>
        <div class="cardName">Album</div>
      </div>
      <div class="iconBx">
        <i class="fas fa-photo-video"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers">{{ data.imagesNum }}</div>
        <div class="cardName">Kép</div>
      </div>
      <div class="iconBx">
        <i class="fas fa-images"></i>
      </div>
    </div>
  </div>

  <div class="flex-container">
    <div class="flex-item-left"><AlbumChart /></div>
    <div class="flex-item-right"><AlbumImagesChart /></div>
  </div>
  <div class="flex-container">
    <div class="flex-item-left"><MonthlyViewChart /></div>
    <div class="flex-item-right"><WeeklyViewChart /></div>
  </div>
</template>

<script>
import axios from "axios";
import AlbumChart from "./AlbumChart.vue";
import AlbumImagesChart from "./AlbumImagesChart.vue";
import MonthlyViewChart from "./MonthlyViewChart.vue";
import WeeklyViewChart from "./WeeklyViewChart.vue";

export default {
  data() {
    return {
      data: {},
      albumChartName: {},
      albumChartView: {},
      chartData: {},
    };
  },
  components: {
    AlbumChart,
    AlbumImagesChart,
    MonthlyViewChart,
    WeeklyViewChart,
  },
  mounted() {
    axios
      .get("/api/dashboard")
      .then((res) => {
        this.data = res.data.dashboard;
        this.albumChartName = res.data.albumChartName;
        this.albumChartView = res.data.albumChartView;
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
};
</script>

<style>
.cardBox {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

.cardBox .card {
  position: relative;
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
}
.cardBox .card .numbers {
  position: relative;
  font-weight: 500;
  font-size: 2.5em;
  color: var(--blue);
}

.cardBox .card .cardName {
  color: var(--black2);
  font-size: 1.1em;
  margin-top: 5px;
}

.cardBox .card .iconBx {
  font-size: 3.5em;
  color: var(--black2);
}

.cardBox .card:hover {
  background: var(--blue);
}

.cardBox .card:hover .numbers,
.cardBox .card:hover .cardName,
.cardBox .card:hover .iconBx {
  color: var(--white);
}

.details {
  width: 100%;
  padding: 20px;
}

.details div {
  width: 50%;
}

.details div:first-child {
  float: left;
}

.details div:last-child {
  float: right;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  text-align: center;
}

.flex-item-left {
  padding: 10px;
  flex: 50%;
  width: 50%;
}

.flex-item-right {
  padding: 10px;
  flex: 50%;
  width: 50%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
  .flex-item-left {
    width: 100%;
  }

  .flex-item-right {
    width: 100%;
  }
}

/* responsive */

@media (max-width: 1200px) {
  .cardBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .cardBox {
    grid-template-columns: repeat(1, 1fr);
  }

  .cardHeader h2 {
    font-size: 20px;
  }
}
</style>