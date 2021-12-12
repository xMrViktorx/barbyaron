<script>
import { Bar } from "vue3-chart-v2";
import axios from "axios";
export default {
  name: "MonthlyViews",
  extends: Bar,
  mounted() {
    axios
      .get("/api/dashboard")
      .then((res) => {
        this.renderChart({
          labels: res.data.monthlyVisitorsMonth,
          datasets: [
            {
              label: "Havi megtekintések száma",
              backgroundColor: "#00e1d9",
              data: res.data.monthlyVisitorsView,
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