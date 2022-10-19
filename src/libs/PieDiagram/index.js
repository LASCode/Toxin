import Chart from 'chart.js/auto';
import DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne';
import { defaultOptions } from './options';
import './styles.scss';

Chart.register(DoughnutLabel);

export class PieDiagram {
  constructor(rootNode, options) {
    this.rootNode = rootNode;
    this.options = { ...defaultOptions, ...options };
    this.createDiagramNode();
    this.createCanvasNode();
    this.createGradients();
    this.createLegendNode();
    this.createPie();
  }

  createDiagramNode() {
    const element = document.createElement('div');
    element.classList.add('pie-diagram');
    this.rootNode.appendChild(element);
    this.diagramNode = element;
  }

  createCanvasNode() {
    const element = document.createElement('canvas');
    element.classList.add('pie-diagram__canvas');
    this.diagramNode.appendChild(element);
    this.canvasNode = element;
    this.canvas2DContext = element.getContext('2d');
  }

  createLegendNode() {
    const element = document.createElement('div');
    element.classList.add('pie-diagram__legend');
    this.diagramNode.appendChild(element);
    this.legendNode = element;
    this.options.items.forEach((el, i) => {
      this.createLegendItem(el.title, this.options.gradients[i].colors);
    });
  }

  createLegendItem(title, gradient) {
    const element = document.createElement('div');
    element.classList.add('pie-diagram__legend-item');
    const ellipseElem = document.createElement('div');
    ellipseElem.classList.add('pie-diagram__ellipse');
    ellipseElem.style.background = `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;
    const titleElem = document.createElement('div');
    titleElem.classList.add('pie-diagram__legend-item-title');
    titleElem.innerHTML = title;
    element.appendChild(ellipseElem);
    element.appendChild(titleElem);
    this.legendNode.appendChild(element);
  }

  createPie() {
    this.componentInstance = new Chart(this.canvas2DContext, {
      type: 'doughnut',
      data: {
        labels: this.options.items.map((el) => el.title),
        datasets: [{
          label: 'My First Dataset',
          data: this.options.items
            .sort((a, b) => a.value - b.value)
            .map((el) => el.value)
            .filter((el) => el > 0),
          backgroundColor: this.gradientContextArray,
          hoverBackgroundColor: this.gradientContextArray,
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
                text: this.options.items.map((el) => el.value).reduce((prev, curr) => prev + curr),
                font: {
                  size: '24',
                  family: 'Montserrat, Arial, serif',
                  lineHeight: '29.26px',
                  weight: 'bold',
                },
                color: '#BC9CFF',
              },
              {
                text: this.options.labelTitle,
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

  createGradients() {
    this.gradientContextArray = this.options.gradients.map((el) => {
      const gradient = this.canvas2DContext.createLinearGradient(0, 0, 0, 600);
      el.colors.forEach((elem, i) => gradient.addColorStop(i, elem));
      return gradient;
    });
  }
}
