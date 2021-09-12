<template>
  <div id="priceEngine" class="price-engine">
    <div class="container">
      <div class="row">
        <div class="col" style="margin-top: 35px">
          <div id="productFiltration" style="float: left">
            <div class="row">
              <div class="col-lg-6">
                <span style="float: left">Select Product Type:</span>
              </div>
              <div class="col-lg-6">
                <select name="productSearch" id="productSearch" class="form-control" style="width: 280px"
                        v-model="product" @change="this.displayPriceData()">s
                  <option v-for="product of products" :key="product.id" :value="product">
                    {{ product.productName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100"></div>
        <div class="col" style="margin-top: 50px">
          <div class="row">
            <div class="col-lg-3">Product Name : {{ this.product.productName }}</div>
            <div class="col-lg-3">Units Per Carton : {{ this.product.unitsPerCarton }}</div>
            <div class="col-lg-3">Unit Price : {{ this.product.price }}</div>
            <div class="col-lg-3 bg-warning" v-if="null != this.product.productLabel
            && undefined !== this.product.productLabel && '' !== this.product.productLabel">
              {{ this.product.productLabel }}
            </div>
          </div>
        </div>
        <div class="w-100"></div>
        <div class="col" style="margin-top: 60px; max-height: 700px; overflow: auto; display:inline-block;">
          <table class="table">
            <thead class="bg-light">
            <tr>
              <td>Product Name</td>
              <td>No of Units</td>
              <td>Price</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="productPrice of productPrices" :key="productPrice.name">
              <td>{{ productPrice.productName }}</td>
              <td>{{ productPrice.units }}</td>
              <td>{{ productPrice.price }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Utility from '@/util/Utility';

export default {
  name: 'Price Engine',
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
      productPrices: []
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
    async displayPriceData() {
      console.log(this.product);
      try {
        const response = await axios.get(Utility.APP_BASE_URL + 'api/price-engine/product-price-list', {
          params: {
            productId: this.product.id,
            quantity: 50
          }
        });
        this.productPrices = response.data;
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }
  }
};
</script>
