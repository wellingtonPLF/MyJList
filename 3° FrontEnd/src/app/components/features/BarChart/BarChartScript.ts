import { PropType } from 'vue';

interface Graphic {
  value: number,
  color: string
}

const barChartComponent: any = {
  name: "BarChartComponent",
  data() {
    return {
      barWidth: 15,
      gap: 4.5,
      padding: 1, // True = 1, False = 0,
      height: 200,
      minBarHeight: 0.02,
      minGap: 9
    };
  },
  props: {
    dataChart: Object as PropType<Graphic[]>
  }
};

export default barChartComponent;
