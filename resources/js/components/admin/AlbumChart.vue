<script>
import { Bar } from "vue3-chart-v2";
import axios from "axios";
export default {
  name: "AlbumViews",
  extends: Bar,
  mounted() {
    axios
      .get("/api/dashboard")
      .then((res) => {
        this.renderChart({
          labels: res.data.albumChartName,
          datasets: [
            {
              label: "Albumok nézettségei",
              backgroundColor: "#f4b41a",
              data: res.data.albumChartView,
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
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