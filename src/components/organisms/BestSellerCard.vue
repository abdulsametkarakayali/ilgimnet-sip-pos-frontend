<template>
  <g-card :isHeader="false">
    <template #customHeader>
      <div class="px-4 pt-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="font-weight-bold">En Çok Satanlar </h5>
          <select
            name
            class="badge badge-secondary rounded-sm outline-focus-none"
            v-model="filterVal"
            @change="filterHistory(filterVal)"
          >
            <option value="all">Hepsi</option>
            <option value="today">Bugün</option>
            <option value="yesterday">Dün</option>
          </select>
        </div>
      </div>
    </template>
    <template #cardBody>
      <BestSellerTable />
    </template>
  </g-card>
</template>

<script>
import { mapActions } from 'vuex'
import BestSellerTable from '@/components/molecules/BestSellerTable'
export default {
  name: 'BestSellerCard',
  components: {
    BestSellerTable
  },
  data() {
    return {
      filterVal: 'all'
    }
  },
  methods: {
    ...mapActions('history', ['filterHistory'])
  }
}
</script>

<style scoped>
</style>
