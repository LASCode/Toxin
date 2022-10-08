import Chart from 'chart.js/auto';
import DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne';
import './diagram.scss';

Chart.register(DoughnutLabel);

const gradients = [
  { name: 'purple', colors: ['#BC9CFF', '#8BA4F9'] },
  { name: 'green', colors: ['#6FCF97', '#66D2EA'] },
  { name: 'orange', colors: ['#FFE39C', '#FFBA9C'] },
  { name: 'dark', colors: ['#909090', '#3D4975'] },
];

class Diagram {
  constructor(element) {
    this.$rootNode = $(element);
    this.$diagramNode = this.$rootNode.find('.js-pie');
    this.diagramContext = this.$diagramNode[0].getContext('2d');
    this.items = this.$rootNode.data('items');
    this.gradients = gradients;
    this.setGradients();
    this.init();
    this.setEllipse();
  }

  init() {
    this.componentInstance = new Chart(this.diagramContext, {
      type: 'doughnut',
      data: {
        labels: this.items.map((el) => el.title),
        datasets: [{
          label: 'My First Dataset',
          data: this.items
            .sort((a, b) => a.value - b.value)
            .map((el) => el.value)
            .filter((el) => el > 0),
          backgroundColor: [
            this.gradientsObj.purple,
            this.gradientsObj.green,
            this.gradientsObj.orange,
            this.gradientsObj.dark,
          ],
          hoverBackgroundColor: [
            this.gradientsObj.purple,
            this.gradientsObj.green,
            this.gradientsObj.orange,
            this.gradientsObj.dark,
          ],
          hoverOffset: 1,
        }],
      },
      options: {
        cutout: '90%',
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          doughnutlabel: {
            paddingPercentage: 5,
            labels: [
              {
                text: this.items.map((el) => el.value).reduce((prev, curr) => prev + curr),
                font: {
                  size: '24',
                  family: 'Montserrat, Arial, serif',
                  lineHeight: '29.26px',
                  weight: 'bold',
                },
                color: '#BC9CFF',
              },
              {
                text: 'голосов',
                font: {
                  size: '14',
                  family: 'Montserrat, Arial, serif',
                  lineHeight: '14,63px',
                  weight: 'bold',
                },
                color: '#BC9CFF',
              },
            ],
          },
        },
      },
    });
  }

  setGradients() {
    const completeGradientObj = {};
    this.gradients.forEach((element) => {
      const gradient = this.diagramContext.createLinearGradient(0, 0, 0, 600);
      element.colors.forEach((singleColor, index) => {
        gradient.addColorStop(index, singleColor);
      });
      completeGradientObj[element.name] = gradient;
    });
    this.gradientsObj = completeGradientObj;
  }

  setEllipse() {
    this.$rootNode.find('.js-legend').each((_, el) => {
      const gradientIndex = $(el).data('index');
      const gradientColors = gradients[gradientIndex].colors;
      $(el)
        .find('.js-ellipse')
        .css({ background: `linear-gradient(180deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)` });
    });
  }
}

$('.js-diagram').each((_, element) => {
  new Diagram(element);
});
