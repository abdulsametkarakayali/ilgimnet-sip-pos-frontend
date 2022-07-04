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
          @click="CloseCaseStatus"
          variant="danger"
          class="mr-2 my-1"
          size="md"
        >Kasa Kapat</b-button>
        </b-col>
        </b-row>
            <template >
               <ListInfoTerminal />
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
import { mapActions } from 'vuex'
import ListInfoTerminal from '@/components/molecules/ListInfoTerminal'
import Sidebar from '@/components/layout/MainSidebar'
import ModalCase from './ModalCase.vue'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Terminal',
  mixins: [mixins],
  components: {
    Sidebar,
    ModalCase,
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
     hideModal() {
      this.$refs['modal-product'].hide()
    },
      OpenCaseStatus() {
      this.changeStatusModal('open')
       this.changeStatusHideModal(false)
    },
    CloseCaseStatus() {
      this.changeStatusModal('close')
      this.changeStatusHideModal(false)
     }
    }
}
</script>
