<template>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Satış Tutarı"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Satış Sayısı"
        :price="getOrdersToday"
        :upgradeCheck="checkOrderStatus"
        showUpgrade="true"
        :percent="`${getOrdersYesterday} orders yesterday`"
      />
    </div>
     <div class="col-lg-3 col-md-12 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Ortalama İşlem Tutarı"
        :price="getIncomeToday / getOrdersToday | currency"
        percent
      />
    </div>
    <div class="col-lg-3 col-md-12 col-sm-12 mb-3" v-if="roleId === 3">
      <CardInfoHistory
        background="bg-1"
        title="Bu Yıl Geliri"
        :price="getThisYearIncome| currency"
        percent
      />
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title=" Ortalama Ürün Sayısı"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Ortalama Ürün Tutarı"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Kar Marjı"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
  <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Toplam İade"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CardInfoHistory from '@/components/atoms/CardInfoHistory'
export default {
  name: 'ListInfoHistory',
  components: {
    CardInfoHistory
  },
  computed: {
    ...mapGetters('history', [
      'getIncomeToday',
      'getIncomeYesterday',
      'getThisYearIncome',
      'getOrdersToday',
      'getOrdersYesterday'
    ]),
     ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading']),
    ...mapState('auth', ['roleId']),
    difference() {
      let result = Math.floor(
        ((this.getIncomeToday - this.getIncomeYesterday) * 100) /
          this.getIncomeYesterday
      )
      if (result >= 100) {
        result = 100
      }
      return result
    },
    checkIncomeStatus() {
      return this.getIncomeToday > this.getIncomeYesterday
    },
    checkOrderStatus() {
      return this.getOrdersToday > this.getOrdersYesterday
    }
  }
}
</script>

<style scoped>
</style>
