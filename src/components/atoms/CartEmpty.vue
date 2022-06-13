<template>
  <div class="chart-empty">
    <img :src="require(`@/assets/images/food-and-restaurant.png`)" alt="emptycart" />
    <h5>Hedefine çok az kaldı</h5>
    <p>Satışa başlamak için sepete ürün ekle</p>
  </div>
</template>

<script>
export default {
  name: 'CartEmpty'
}
</script>

<style scoped>
</style>
