<template>
  <MainContainer :isHome="true">
    <MoneyCaseStatus v-if="isOpenIn" />
    <ProductHome v-if="!isOpenIn" />
  </MainContainer>
</template>

<script>
import ProductHome from '@/components/organisms/ProductHome'
import MainContainer from '@/components/organisms/MainContainer'
import MoneyCaseStatus from '@/components/atoms/MoneyCaseStatus'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Home',
  components: {
    ProductHome,
    MainContainer,
    MoneyCaseStatus
  },
   computed: {
            isOpenIn() {
                return window.localStorage.getItem('moneyCaseStatus') === 'close'
     }
  }
}
</script>
