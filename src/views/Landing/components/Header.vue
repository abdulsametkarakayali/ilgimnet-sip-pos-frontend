<template>
  <div class="bg-head">
    <Navbar />
    <header id="header">
      <div class="container">
        <div class="row">
          <div class="col-md-12  left-header-mobile">
            <h1 class="header-title">
              Pos Ekran Sistem
            </h1>
            <router-link
              :to="{ name: 'Login' }"
              class="btn shadow btn-header btn-info mt-2 px-5 ml-3"
            >
              Sisteme Giriş

            </router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
</style>
