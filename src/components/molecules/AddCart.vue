<template>
  <b-card no-body class="product">
       <form @submit.prevent="login()">
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
          >Sepete Ekle</g-button
        >
      </div>
    </form>
  </b-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
    return {
      detailProduct:
                     { // Dummy datalarımızı oluşturduk test amaçlı
                         id: '',
                         name: '',
                         price: '',
                          qty: ''
                     },
      cart: []
    }
  },
  name: 'AddCart',
  methods: {
    ...mapMutations('cart', ['ADD_TO_CART']),
  login() {
      const dataLogin = {
        id: Math.floor(Math.random() * 10000) + 1,
        name: this.name,
        price: this.price,
        qty: this.qty
      }
       this.ADD_TO_CART({ product: dataLogin, qty: dataLogin.qty })
    }

  },
   computed: {
    ...mapState('auth', ['roleId'])
  }

}

</script>

<style scoped>
</style>
