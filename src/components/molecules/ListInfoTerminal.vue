<template>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Kasa Nakit"
        showUpgrade="true"
        :price="getSafePayment  + getSafeOpeningAmount   | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Kredi Kartı Satışları"
        :price="getCardPayment | currency"
        :upgradeCheck="checkOrderStatus"
        showUpgrade="true"
        :percent="`${getOrdersYesterday} orders yesterday`"
      />
    </div>
     <div class="col-lg-3 col-md-12 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Kasa Açılış Tutarı"
        :price="getSafeOpeningAmount | currency"
        percent
      />
    </div>
    <div class="col-lg-3 col-md-12 col-sm-12 mb-3 "  v-if="roleId === 1">
      <CardInfoHistory
        background="bg-1"
        title="Bu Yılın Cirosu"
        :price="getThisYearIncome| currency"
        percent
      />
    </div>
    <div class="col-lg-3 col-md-12 col-sm-12 mb-3 "  v-if="roleId === 1">
      <CardInfoHistory
        background="bg-1"
        title="Bu Ayın Cirosu "
        :price="getThisMonthIncome | currency"
        percent
      />
    </div>

    
  <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
      <CardInfoHistory
        background="bg-1"
        title="Bu Gün Ciro"
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
  name: 'ListInfoTerminal',
  components: {
    CardInfoHistory
  },
  computed: {
   
    ...mapGetters('history', [
      'getIncomeToday',
      'allcash',
      'getCardPayment',
      'getSafePayment',
      'getCashPayment',
      'getIncomeYesterday',
      'getThisMonthIncome',
      'getThisYearIncome',
      'getOrdersToday',
      'getOrdersYesterday'
    ]),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading']),
    ...mapState('auth', ['roleId']),

    ...mapGetters('moneycase',['getSafeOpeningAmount']),
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
