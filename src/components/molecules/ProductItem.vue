<template>
  <b-card no-body class="product">
    <a
      v-if="roleId !== 3"
      @click.prevent="ADD_TO_CART({product: detailProduct, qty: 1})"
      class="action-img"
    >
      <div
        class="product-image"
        :class="[checkActive.some(v => v === detailProduct.id) ? 'active' : '']"
      >
        <img :src="'https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg'" :alt="detailProduct.name" />
        <CheckIcon />
      </div>
    </a>
    <span v-if="roleId === 3">
      <div
        class="product-image"
        :class="[checkActive.some(v => v === detailProduct.id) ? 'active' : '']"
      >
     {{detailProduct.name.match(/(\b\S)?/g).join('').toUpperCase()}}
        <img :src="detailProduct.image"   :alt="detailProduct.name" />
      </div>
    </span>
    <div class="card-body product-detail">
      <span class="product-title">{{detailProduct.name}}</span>
      <span class="product-price d-block">{{detailProduct.price | currency}}</span>
    </div>
  </b-card>
</template>

<script>
import CheckIcon from '@/components/atoms/CheckIcon'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CardProduct',
  components: {
    CheckIcon
  },
  props: ['detailProduct', 'checkActive'],
  methods: mapMutations('cart', ['ADD_TO_CART']),
  computed: {
    ...mapState('auth', ['roleId'])
  }
}
</script>

<style scoped>
</style>
