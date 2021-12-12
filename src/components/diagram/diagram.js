import Chart from "chart.js/auto";
import DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
Chart.register(DoughnutLabel)


const data = [{name: 1, value: 25}, {name: 2, value: 25}, {name: 3, value: 50}]
const gradients = [
  {name: 'purple', colors: ["#BC9CFF", "#8BA4F9"]},
  {name: 'green', colors: ["#6FCF97", "#66D2EA"]},
  {name: 'orange', colors: ["#FFE39C", "#FFBA9C"]},
  {name: 'dark', colors: ["#909090", "#3D4975"]}
]
const setGradientsOnCanvas = (canvasElem, gradientObj)=>{
  const completeGradientObj = {}
  gradientObj.forEach((element)=>{
    const gradient = canvasElem.createLinearGradient(0, 0, 0, 600);
    const percent = element.colors.length
    element.colors.forEach((singleColor, index)=>{
      gradient.addColorStop(index, singleColor)
    })
    completeGradientObj[element.name] = gradient
  })
  return completeGradientObj
}





$(".diagram__canvas").each((_,element)=>{

  const ctx = element.getContext('2d')
  const gradientsObj = setGradientsOnCanvas(ctx, gradients)
  console.log(gradientsObj)

  var getTotal = function(myDoughnutChart) {
    var sum = myDoughnutChart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
    return `${sum}`;
  }



  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        "Великолепно",
        "Хорошо",
        "Удовлетворительно",
        "Разочарован"
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [25,25,50],
        backgroundColor: [gradientsObj.purple, gradientsObj.green, gradientsObj.orange, gradientsObj.dark],
        hoverBackgroundColor: [gradientsObj.purple, gradientsObj.green, gradientsObj.orange, gradientsObj.dark],
        hoverOffset: 1,
      }]
    },
    options: {
      cutout: "90%",
      // responsive: true,
      maintainAspectRatio: false,
      // plugins: [legendPosition]
      plugins: {
        legend: {
          position: "right",
          align: "end",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            boxHeight: 10,
            font: {
              family: "'Montserrat-Regular', sans-serif",
              size: 14,
              lineHeight: 24
            }
          }
        },
        doughnutlabel: {
          paddingPercentage: 5,
          labels: [
            {
              text: getTotal,
              font: {
                size: '24',
                family: 'Montserrat-Bold, Arial, serif',
                lineHeight: "29.26px",
              },
              color: '#BC9CFF',
            },
            {
              text: 'голосов',
              font: {
                size: '14',
                family: 'Montserrat-Bold, Arial, serif',
                lineHeight: "14,63px",
              },
              color: '#BC9CFF',
            },
          ],
        },
      }
    }
  })
  chart.resize(400, 200)
})