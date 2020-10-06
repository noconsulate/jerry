<template>
  <div id="app">
    <h3>private key</h3>
    {{ privateKey }}
    <h3>contract address</h3>
    <a
      href="https://ropsten.etherscan.io/address/0x43e0eec2f9d5d8cfb8eca8427598bf04184f9450"
      target="_blank"
      >{{ contract }}
    </a>
    <info-display
      :value="value"
      :product="product"
      :transaction="transaction"
    />
    <div id="element">
      <input v-model="inputValue" placeholder="change value" />
      <button @click="sendValue">send</button>
    </div>
    <div id="element">
      <input v-model="multiplierValue" placeholder="change multiplier" />
      <button @click="sendMultiplier">send</button>
    </div>
  </div>
</template>

<script>
import InfoDisplay from "./components/InfoDisplay";
import {
  getValue,
  getAccounts,
  getProduct,
  storeValue,
  changeMultiplier,
} from "./web3";
export default {
  name: "App",
  components: {
    "info-display": InfoDisplay,
  },
  computed: {
    privateKey() {
      return this.$store.state.privateKey;
    },
    contract() {
      return this.$store.state.contract;
    },
  },
  data() {
    return {
      account: "",
      value: "",
      multiplier: "",
      product: "",
      inputValue: "",
      multiplierValue: "",
      transaction: "check developer's console",
    };
  },
  methods: {
    fetchData() {
      getValue(this.account).then((res) => {
        this.value = res;
      });
      getProduct(this.account).then((res) => (this.product = res));
    },
    sendValue() {
      storeValue(this.inputValue, this.account).then((res) => {
        this.fetchData();
      });
    },
    sendMultiplier() {
      changeMultiplier(this.multiplierValue, this.account).then((res) => {
        this.fetchData();
      });
    },
  },
  created: function() {
    let accounts = getAccounts().then((res) => (this.account = res));

    this.fetchData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 60px;
}

#element {
  margin-top: 10px;
}
</style>
