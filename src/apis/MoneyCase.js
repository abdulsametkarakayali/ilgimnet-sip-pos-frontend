import Api from './Api'

const END_POINT = 'moneycases'

export default {

  get() {
    return Api.get(`${END_POINT}/casestatus`)
  },
  patch(data) {
    return Api.patch(`${END_POINT}/casestatus`, data)
  }

}
