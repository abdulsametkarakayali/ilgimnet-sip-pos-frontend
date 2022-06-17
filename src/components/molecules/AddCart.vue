<template>
  <b-card no-body class="product">
       <form @submit.prevent="addtocart()">
      <div class="row">
        <div class="col-md-12">
           <div class="alert alert-primary alert-dismissible fade show mt-2">
          <p>Sistemde olmayan ürünü hızlıca sepete gönderebilirsiniz</p>
          </div>
          <label for>Ürün Adı</label>
          <div class="form-group">
            <input type="text" class="form-control" v-model="detailProduct.name" />
          </div>
             <label for>Fiyatı</label>
             <div class="form-group">
            <input type="text" class="form-control" v-model="detailProduct.price" />
          </div>
             <label for>Adeti</label>
             <div class="form-group">
            <input type="text" class="form-control"  v-model="detailProduct.qty" />
          </div>
        </div>
        <g-button
          type="sumbit"
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
                         id: Math.floor(Math.random() * 10000) + 1,
                         name: '',
                         price: '',
                          qty: ''
                     }
    }
  },
  name: 'AddCart',
  methods: {
    ...mapMutations('cart', ['ADD_TO_CART']),
  addtocart() {
      this.ADD_TO_CART({ product: this.detailProduct, qty: this.detailProduct.qty })
       this.detailProduct = {
                    id: Math.floor(Math.random() * 10000) + 1,
                    name: null,
                    price: null,
                    qty: null
                }
    }

  },
   computed: {
    ...mapState('auth', ['roleId'])
  }

}

</script>

<style scoped>
</style>
