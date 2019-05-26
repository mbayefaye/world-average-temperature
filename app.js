//charts.js;
chartIt();
async function chartIt() {
  const data = await getData();
  const canvas = document.getElementById("myChart");
  const myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in C°",
          data: data.ys,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              //include a celsius sign in the ticks
              callback: function(value, index, values) {
                return value + "°";
              }
            }
          }
        ]
      }
    }
  });
}

async function getData() {
  const xs = [];
  const ys = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach(row => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
  });
  return { xs, ys };
}
