<template>
  <div>
    <b-table
      show-empty
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="allHistoriesAndDetails"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      @filtered="onFiltered"
      sort-icon-left
      responsive
      hover
    >
      <template
        v-slot:cell(id)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
      <template v-slot:cell(invoice)="data">#{{data.item.invoice}}</template>
      <template v-slot:cell(date)="data">{{data.item.date }}</template>
      <template v-slot:cell(paymentType)="data">{{data.item.paymentType == 0?'Nakit':'Kredi Kartı'}}</template>
      <template
        v-slot:cell(orders)="data"
      >{{data.item.orders.substring(0, 30) + (data.item.orders.length >= 30 ? '...' : '')}}</template>
      <template v-slot:cell(amount)="data">{{data.item.amount | currency}}</template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'TableHistory',
  mixins: [mixins],
  data() {
    return {
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: true, label: 'no' },
        { key: 'invoice', sortable: true },
        'cashier',
        'paymentType',
        'date',
        'orders',
        { key: 'amount', sortable: true }
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      totalRows: 0
    }
  },
  methods: {
    ...mapActions('history', [
      'getHistories',
      'getMyHistories',
      'deleteHistory'
    ]),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted() {
    if (this.roleId === 3) {
      this.getMyHistories(this.idUser)
    } else {
      this.getBestSeller()
    }
    this.totalRows = this.allHistoriesAndDetails.length
  },
  computed: {
    ...mapState('history', ['getBestSeller']),
    ...mapGetters('history', ['getBestSeller']),
    ...mapState('auth', ['roleId', 'idUser']),
    allHistoriesAndDetails() {
      if (this.roleId === 3) {
        return this.allMyHistories.map((history) => {
          console.log(history)
          const arrOrders = history.orders.split(', ')
          const arrpurchaseAmount = history.purchaseAmount.split(', ')
          const arrInitialPrice = history.initialPrice.split(', ')
          const arrPriceAmount = history.priceAmount.split(', ')
          const newObjOrders = []
          arrOrders.map((order, i) => {
            newObjOrders.push({
              name: order,
              barcode: order.barcode,
              purchaseAmount: arrpurchaseAmount[i],
              initialPrice: arrInitialPrice[i],
              priceAmount: arrPriceAmount[i]
            })
          })
          return {
            ...history,
            detailOrders: newObjOrders,
            _showDetails: false
          }
        })
      } else {
        return this.allHistories.map((history) => {
          const arrOrders = history.orders.split(', ')
          const arrpurchaseAmount = history.purchaseAmount.split(', ')
          const arrInitialPrice = history.initialPrice.split(', ')
          const arrPriceAmount = history.priceAmount.split(', ')
          const newObjOrders = []
          arrOrders.map((order, i) => {
            newObjOrders.push({
              name: order,
              barcode: order.barcode,
              purchaseAmount: arrpurchaseAmount[i],
              initialPrice: arrInitialPrice[i],
              priceAmount: arrPriceAmount[i]
            })
          })
          return {
            ...history,
            detailOrders: newObjOrders,
            _showDetails: false
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
