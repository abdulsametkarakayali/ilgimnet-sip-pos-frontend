<template>
  <div>
    <b-table
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="bestseller"
      responsive
      hover
    >
      <template
        v-slot:cell(no)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
      <template v-slot:cell(data)="data">{{data.item.salestotal* data.item.price}} ₺</template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows === 0 ? bestseller.length : totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapGetters } from 'vuex'

export default {
  props: ['bestseller'],
  mixins: [mixins],
  data() {
    return {
      fields: ['no',
          {
            key: 'productName',
            label: 'Ürün Adı'
          },
          {
            key: 'salestotal',
            label: 'Satış Adedi'
          },
          {
            key: 'data',
            label: 'Toplam Tutar'
          }
        ],
      currentPage: 1,
      perPage: 10,
      totalRows: this.bestseller.length
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
