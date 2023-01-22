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
          <div class="col-md-5 col-sm-12 hide-mobile">
            <div v-lazy-container="{ selector: 'img' }">
              <img
                :data-src="require(`@/assets/images/desktop.png`)"
                :data-loading="require(`@/assets/images/charlie-loader.gif`)"
                class="lazyload img-fluid img-head"
                alt="desktop"
              />
            </div>
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
