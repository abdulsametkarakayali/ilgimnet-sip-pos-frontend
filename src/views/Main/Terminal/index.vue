<template>
  <div class="home">
    <b-container fluid>

      <b-row>
        <b-col md="12" class="px-0">
          <div class="content-left history pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-2">
                    <b-row>
  <b-col md="12" class="mb-3">
       <b-button
       v-b-modal.modal-primary
         @click="OpenCaseStatus"
          variant="success"
          class="mr-2 my-1"
          size="md"
        >Kasa Aç</b-button>
               <b-button
       v-b-modal.modal-primary
         @click="AddMoney"
          variant="warning"
          class="mr-2 my-1"
          size="md"
        >Para Ekle</b-button>
               <b-button
       v-b-modal.modal-primary
         @click="TakeOutMoney"
          variant="secondary"
          class="mr-2 my-1"
          size="md"
        >Para Çıkar</b-button>
          <b-button
           v-b-modal.modal-primary
          @click="CloseCaseStatus"
          variant="danger"
          class="mr-2 my-1"
          size="md"
        >Kasa Kapat</b-button>
        </b-col>
        </b-row>
            <template >
               <ListInfoTerminal />
               <div class="row">
              <div class="col-md-12 mb-5 mt-3">
               <TableTerminal :moneycases="allmoneyCases" />
              </div></div>
            </template>
            </div>
          </div>
        </b-col>
      </b-row>
     <ModalCase />
    </b-container>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters, mapState } from 'vuex'
import ListInfoTerminal from '@/components/molecules/ListInfoTerminal'
import Sidebar from '@/components/layout/MainSidebar'
import ModalCase from './ModalCase.vue'
import TableTerminal from './TableTerminal'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Terminal',
  mixins: [mixins],
  components: {
    Sidebar,
    ModalCase,
    TableTerminal,
    ListInfoTerminal
  },
  data() {
    return {
      datadata: 90,
      cardsData: [
        {
          bg: 'bg-1',
          title: 'Wiener Schnitzle',
          price: 'Rp. 1.000.000',
          percent: '+2% Yesterday'
        },
        {
          bg: 'bg-2',
          title: 'Orders',
          price: '3.200',
          percent: '+5% Last Week'
        },
        {
          bg: 'bg-3',
          title: "This Year's Income",
          price: 'Rp. 100.000.000',
          percent: '+10% Yesterday'
        }
      ]
    }
  },
  methods: {
      ...mapActions(['changeStatusHideModal', 'changeStatusModal']),
      ...mapActions('moneycase', ['patchCaseStatus']),
      ...mapActions('moneycase', ['getmoneyCases']),
     hideModal() {
      this.$refs['modal-product'].hide()
    },
      OpenCaseStatus() {
      this.changeStatusModal('open')
       this.changeStatusHideModal(false)
    },
    AddMoney() {
      this.changeStatusModal('addmoney')
       this.changeStatusHideModal(false)
    },
   TakeOutMoney() {
      this.changeStatusModal('takeoutmoney')
       this.changeStatusHideModal(false)
    },
    CloseCaseStatus() {
      this.changeStatusModal('close')
      this.changeStatusHideModal(false)
     }
    },
    mounted() {
    this.getmoneyCases()
  },
  computed: {
    ...mapState('moneycase', ['moneyCase']),
    ...mapGetters('moneycase', ['allmoneyCases'])
  }
}
</script>
