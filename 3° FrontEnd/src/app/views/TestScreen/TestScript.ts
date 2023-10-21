import BarChartComponent from '../../components/features/BarChart/BarChartComponent.vue'

const testComponent: any = {
  name: "TestComponent",
  components: {
    BarChartComponent
  },
  data() {
    return {
      dc: [
        { value: 0.8, color: '#ff8243' },
        { value: 0.6, color: '#c98bdb' },
        { value: 0.5, color: '#6660ff' },
        { value: 0.4, color: 'red' },
        { value: 0.3, color: 'black' },
        { value: 0.2, color: 'white' }
      ]
    };
  },
  methods: {

  },
  mounted() {}
};

export default testComponent;
