<template>
  <div class="chart-product mb-4">
    <div class="position-relative">
      <div class="img-list-chart">
        <img src="@/assets/images/default_product.png" width="30" alt />
      </div>
      <g-button
        @cus-click="REMOVE_PRODUCT_FROM_CART(cart.product.id)"
        cusClass="text-white delete-chart border-0"
        size="sm"
      >
        <img class="reset-class" :src="require(`@/assets/images/trash.svg`)" width="30" alt srcset />
      </g-button>
    </div>
    
    <div class="name-input">      
      <span class="chart-title-product">{{cart.product.name}}</span>
      <div class="row">
      <div class="col-md-6">
      <input type="text"  v-model="cart.product.price "  class="form-control"  />
    </div>
      <div class="col-md-6">|{{cart.product.price * cart.qty| currency}}
    </div> </div>
    <div class="row mt-2">
    <div class="col-md-6 mt-n1">
      <CartInput :qty="cart.qty" :product="cart.product" /></div>
    </div>
    </div>
  </div>
</template>

<script>
import CartInput from './CartInput'
import { mapMutations } from 'vuex'
export default {
  components: {
    CartInput
  },
  props: ['cart'],
  methods: mapMutations('cart', ['REMOVE_PRODUCT_FROM_CART'])
}
</script>

<style scoped>
.reset-class {
  width: 20px;
  height: 20px;
  border-radius: 0;
  margin-right: 0;
}
</style>
