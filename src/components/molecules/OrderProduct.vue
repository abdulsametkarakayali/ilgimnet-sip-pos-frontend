<template>
  <div v-if="totalPages !== 0" class="d-flex justify-content-between align-items-center">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-append" id="button-addon4">
          <select @change="changeOrder" v-model="sort" class="form-control">
            <option disabled selected>Sıralam</option>
            <option
              :value="listOrder.ordSort"
              :selected="ordering === listOrder.ordSort"
              v-for="(listOrder, i) in listOrders"
              :key="i"
            >{{listOrder.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <span>Page {{currentPage}}/{{totalPages}}</span>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      sort: ['id', 'desc'],
      listOrders: [
        {
          name: 'Yeni',
          ordSort: ['id', 'desc']
        },
        {
          name: 'Eski',
          ordSort: ['id', 'asc']
        },
        {
          name: 'Ad A-Z',
          ordSort: ['name', 'asc']
        },
        {
          name: 'Ad Z-A',
          ordSort: ['name', 'desc']
        },
        {
          name: 'Ucuz',
          ordSort: ['price', 'asc']
        },
        {
          name: 'Pahalı',
          ordSort: ['price', 'desc']
        }
      ]
    }
  },
  methods: {
    ...mapActions('product', ['getProducts']),
    ...mapMutations('product', ['CHANGE_ORDERING']),
    changeOrder() {
      this.product.currentPage = 1
      const order = {
        limit: this.roleId !== 3 ? 9 : 12,
        page: this.currentPage,
        order: this.sort[0],
        sort: this.sort[1],
        search: this.searchInputText
      }
      this.CHANGE_ORDERING(order)
      this.getProducts(order)
    }
  },
  computed: {
    ...mapState('product', [
      'currentPage',
      'totalPages',
      'searchInputText',
      'ordering'
    ]),
    ...mapState(['product']),
    ...mapState('auth', ['roleId'])
  }
}
</script>

<style scoped>
</style>
