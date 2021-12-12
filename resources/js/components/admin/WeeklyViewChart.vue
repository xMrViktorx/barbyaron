<script>
import { Bar } from "vue3-chart-v2";
import axios from "axios";
export default {
  name: "WeeklyViews",
  extends: Bar,
  mounted() {
    axios
      .get("/api/dashboard")
      .then((res) => {
        this.renderChart({
          labels: res.data.weeklyVisitorsWeek,
          datasets: [
            {
              label: "Heti megtekintések száma",
              backgroundColor: "#b8dfl0",
              data: res.data.weeklyVisitorsView,
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