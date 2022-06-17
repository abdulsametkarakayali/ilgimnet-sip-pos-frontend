<template>
  <div class="bg-head">
    <Navbar />
    <header id="header">
      <div class="container">
        <div class="row">
          <div class="col-md-7 pr-5 left-header-mobile">
            <h1 class="header-title">
              Pos Ekran Sistem
            </h1>
            <router-link
              :to="{ name: 'Login' }"
              class="btn shadow btn-header btn-info mt-2 px-5 ml-3"
            >
              Sisteme Giriş
              <svg
                width="30"
                height="30"
                viewBox="0 0 16 16"
                class="bi bi-play"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                />
              </svg>
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
