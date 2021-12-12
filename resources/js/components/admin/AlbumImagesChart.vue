<script>
import { Bar } from "vue3-chart-v2";
import axios from "axios";
export default {
  name: "AlbumImages",
  extends: Bar,
  mounted() {
    axios
      .get("/api/dashboard")
      .then((res) => {
        this.renderChart({
          labels: res.data.albumChartName,
          datasets: [
            {
              label: "Albumok képei",
              backgroundColor: "#143d59",
              data: res.data.albumImages,
            },
          ],
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