<template>
  <b-modal
    id="modal-primary"
    ref="modal-case"
    hide-footer
    :title="statusModal === 'open' ? 'Kasa Açılış Tutar':
            statusModal === 'close' ? 'Kasa Kapanış Tutar':
            statusModal === 'addmoney' ? 'Eklenen  Tutar':'Çıkarılan  Tutar'">
    <form @submit.prevent="statusModal === 'open' ? addMoneyCase(casetype=1) :
                          statusModal === 'close' ? addMoneyCase(casetype=4) :
                          statusModal === 'addmoney' ? addMoneyCase(casetype=2) :addMoneyCase(casetype=3)">
      <g-form-group label="Tutar" refInp="price" :isRow="true" v-model="price" />
       <g-form-group label="Açıklama" refInp="description" :isRow="true" v-model="description" />
      <div class="modal-footer border-top-0">
        <g-button @cus-click="hideModal" cusClass="btn-one px-4 rounded-xs">Cancel</g-button>
        <g-button
          type="submit"
          :isLoading="getLoading"
          cusClass="btn-two px-4 rounded-xs"
        >{{statusModal === 'open' ? 'Kasayı Aç' :
            statusModal === 'close' ? 'Kasa Kapat':
            statusModal === 'addmoney' ? 'Para Ekle':'Para Çıkar'}}</g-button>
      </div>
      {{statusHideModal ? hideModal() : ''}}
    </form>
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'ModalCategory',
  mixins: [mixins],
  data() {
    return {
      price: '',
      description: '',
      casetype: ''
    }
     },
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('moneycase', ['postMoneyCase']),
    addMoneyCase(casetype) {
      if (casetype === 1) {
        localStorage.setItem('moneyCaseStatus', 'open')
      } else if (casetype === 4) {
        localStorage.setItem('moneyCaseStatus', 'close')
       }
       var currentDate = new Date()
      this.postMoneyCase({ casetime: currentDate, casetype: this.casetype, salesNo: '', moneycaseamount: this.casetype === 3 ? -this.price : this.price, descriptions: this.description, transacter: this.getDetailUser.id })
      .then((response) => {
          this.toastSuccess('İşlem Tamamlandı')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    hideModal() {
      this.$refs['modal-case'].hide()
      this.changeStatusHideModal(false)
    }
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapGetters('user', ['getDetailUser', 'allMembers']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style lang="scss" scoped>
</style>
