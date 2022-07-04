<template>
  <b-modal
    id="modal-primary"
    ref="modal-case"
    hide-footer
    :title="statusModal === 'open' ? 'Kasa Açılış Tutar' : 'Kasa Kapanış Tutar'"
  >
    <form @submit.prevent="statusModal === 'open' ? addMoneyCase() : CloseMoneyCase()">
      <g-form-group label="Tutar" refInp="price" :isRow="true" v-model="price" />
       <g-form-group label="Açıklama" refInp="description" :isRow="true" v-model="description" />
      <div class="modal-footer border-top-0">
        <g-button @cus-click="hideModal" cusClass="btn-one px-4 rounded-xs">Cancel</g-button>
        <g-button
          type="submit"
          :isLoading="getLoading"
          cusClass="btn-two px-4 rounded-xs"
        >{{statusModal === 'open' ? 'Kasayı Aç' : 'Kasayı Kapat'}}</g-button>
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
      description: ''
    }
     },
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('moneycase', ['postMoneyCase']),
    addMoneyCase() {
       var currentDate = new Date()
      this.postMoneyCase({ casetime: currentDate, casetype: 1, salesNo: '', amount: this.price, descriptions: this.description, transacter: this.getDetailUser.id })
      .then((response) => {
          this.toastSuccess('Kasa Açıldı')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    CloseMoneyCase() {
       var currentDate = new Date()
      this.postMoneyCase({ casetime: currentDate, casetype: 3, salesNo: '', amount: this.price, descriptions: this.description, transacter: this.getDetailUser.id })
      .then((response) => {
          this.toastSuccess('Kasa Kapatıldı')
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
