import {
  mapActions
} from 'vuex'
import mixins from './swal'
export default {
  data() {
    return {
      da: 'asd'
    }
  },
  mixins: [mixins],
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.confirmSwal('Çıkış', 'Oturumu kapatmak istediğinizden emin misiniz ?', 'warning', () => {
        this.logoutUser()
        this.$router.push({
          name: 'Login'
        })
        this.toastSuccess('Çıkış Başarılı')
      })
    }
  }
}
