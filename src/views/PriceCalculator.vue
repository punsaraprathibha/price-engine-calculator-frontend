<template>
  <div id="priceCalculator" class="container">
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label for="productSearch">Product Type</label>
            <select name="productSearch" id="productSearch" class="form-control" style="width: 280px" v-model="product">
              <option v-for="product of products" :key="product.id" :value="product">
                {{ product.productName }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="noOfCartons">No of Cartons</label>
        <input type="number" class="form-control" id="noOfCartons" placeholder="No of Cartons" v-model="cartons">
      </div>
      <div class="form-group">
        <label for="noOfCartons">No of Units</label>
        <input type="number" class="form-control" id="NoOfUnits" placeholder="No of Units" v-model="units">
      </div>
      <button id="btnCalculate" type="button" class="btn btn-primary" @click="this.calculatePrice()">Calculate Price
      </button>
    </form>

    <div style="margin-top: 50px" v-if="isDisplayPrice" :v-model="isDisplayPrice">
      <span> {{ cartons }} Cartons & {{ units }} Units of Product {{ calculatedProductData.productName }}
        is {{ calculatedProductData.price }} LKR</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Utility from '@/util/Utility';

export default {
  name: 'PriceCalculator',
  data() {
    return {
      product: {
        id: 0,
        productName: '',
        price: 0.00,
        unitsPerCarton: 0,
        productLabel: ''
      },
      products: [],
      calculatedProductData: {},
      cartons: 0,
      units: 0,
      isDisplayPrice: false
    };
  },
  async created() {
    await this.displayProductsList();
  },
  methods: {
    async displayProductsList() {
      try {
        const response = await axios.get(Utility.APP_BASE_URL + 'api/price-engine/products');
        this.products = response.data;
      } catch (e) {
        console.error(e);
        alert(e);
      }
    },
    async calculatePrice() {
      try {
        if('' === this.product.productName) {
          alert(Utility.MSG_PLEASE_SELECT_PRODUCT);
        } else if(this.cartons < 0 || this.units < 0) {
          alert(Utility.MSG_INVALID_FORMAT_OF_UNITS_OR_CARTONS_ENTERED);
        } else if(this.units >= this.product.unitsPerCarton) {
          alert(Utility.MSG_INVALID_NO_OF_UNITS_ENTERED);
        } else {
          const response = await axios.get(Utility.APP_BASE_URL + 'api/price-calculator/calculate-price', {
            params: {
              productId: this.product.id,
              cartons: this.cartons,
              units: this.units
            }
          });
          this.calculatedProductData = response.data;
          this.isDisplayPrice = true;
        }
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }
  }
};
</script>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  text-align: left;
}
</style>