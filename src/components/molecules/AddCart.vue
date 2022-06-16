<template>
  <b-card no-body class="product">
       <form @submit.prevent="ADD_TO_CART({name: this.name,price:this.price, qty: qty, ...this.detailProduct})">
      <div class="row">
        <div class="col-md-6">
          <label for>Ürün Adı</label>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" />
          </div>
             <label for>Fiyatı</label>
             <div class="form-group">
            <input type="text" class="form-control" v-model="price" />
          </div>
             <label for>Adeti</label>
             <div class="form-group">
            <input type="text" class="form-control"  v-model="qty" />
          </div>
        </div>
        <g-button
          :disabled="checkSubmit"
          type="sumbit"
          :isLoading="getLoading"
          variant="secondary"
          cusClass="btn-block my-3 shadow"
          >Register</g-button
        >
      </div>
    </form>
  </b-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CardProduct',
  props: ['detailProduct'],
  methods:
  mapMutations('cart', ['ADD_TO_CART']),
  computed: {
    ...mapState('auth', ['roleId'])
  }
}
</script>

<style scoped>
</style>
