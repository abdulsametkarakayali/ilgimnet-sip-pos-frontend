<template>
  <g-card :isHeader="false">
    <template #customHeader>
      <div class="px-4 pt-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="font-weight-bold">En Çok Satanlar </h5>
        </div>
      </div>
    </template>
    <template #cardBody>
      <BestSellerTable :bestseller="getBestSellers"  />
    </template>
  </g-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BestSellerTable from '@/components/molecules/BestSellerTable'
export default {
  name: 'BestSellerCard',
  components: {
    BestSellerTable
  },
  methods: {
    ...mapActions('history', ['getBestSeller'])
  },
  mounted() {
    this.getBestSeller()
  },
  computed: {
    ...mapGetters('history', ['getBestSellers'])
  }
}
</script>

<style scoped>
</style>
