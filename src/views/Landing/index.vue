<template>
  <div id="landingPage">
    <Header />
    <!-- efek -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 p-0">
          <div class="round-hide"></div>
        </div>
      </div>
    </div>
    <Features />
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style scoped>
@import '../../assets/css/landing.css';
</style>
