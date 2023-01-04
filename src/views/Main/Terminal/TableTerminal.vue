<template>
  <g-card :isHeader="false">
    <template #customHeader>
      <div class="px-4 pt-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
   <b-table
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="moneycases"
      responsive
      hover
    >

      <template
        v-slot:cell(no)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
       <template v-slot:cell(invoice)="data">#{{data.item.data}}</template>
       <template v-slot:cell(casetime)="data">#{{data.item.casetime}}</template>
       <template v-slot:cell(moneycaseamount)="data">{{data.item.moneycaseamount}}</template>
      <template v-slot:cell(casetype)="data">{{data.item.casetype == 1?'Kasa Açıldı': data.item.casetype == 2?'Para Eklendi':data.item.casetype == 3?'Para Çıkarıldı':'Kasa Kapatıldı' }}</template>
    </b-table>
      </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows === 0 ? moneycases.length : totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>
  </g-card>
</template>
<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['moneycases'],
  mixins: [mixins],
  data() {
    return {
      fields: ['no', 'casetype', 'moneycaseamount', 'descriptions', 'casetime'],
      currentPage: 1,
      perPage: 10,
      totalRows: this.moneycases.length
    }
  },
  methods: {
    ...mapActions(['changeStatusModal']),
    ...mapActions('moneyCase', [
      'updateModal',
      'deleteCategory',
      'getMoneyCases',
      'updateMoneycase'
    ]),
    updateModalData(item) {
      this.changeStatusModal('update')
      this.updateModal(item)
    },
    deleteCategoryItem(id) {
      this.confirmDelete('moneycase', () => {
        this.deleteCategory(id)
          .then((response) => {
            this.toastSuccess('moneycase successfully deleted')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  computed:{
  
     ...mapGetters(['getLoading']),

    }
}
</script>

<style scoped>
</style>
