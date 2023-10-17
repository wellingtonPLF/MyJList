const testComponent: any = {
  name: "TestComponent",
  components: {},
  data() {
    return {
      valor: [{ v: 'Hello' }, { v: 'add' }],
      another: undefined
    };
  },
  methods: {
    yeah() {
      console.log("Valor:", this.valor)
      console.log("Another:", this.another)
    },
    copy(x) {
      return x.map( (obj) => {
        return {...obj}
      })
    }
  },
  mounted() {
    this.another = this.copy(this.valor)
  },
};

export default testComponent;
