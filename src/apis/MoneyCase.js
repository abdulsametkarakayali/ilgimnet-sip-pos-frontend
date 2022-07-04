import Api from './Api'

const END_POINT = 'moneycases'

export default {

   all() {
    return Api.get(END_POINT)
  },
  get() {
    return Api.get(`${END_POINT}/casestatus`)
  },
  insert(data) {
    return Api.post(`${END_POINT}`, data)
  },
  patch(data) {
    return Api.patch(`${END_POINT}/casestatus`, data)
  }

}
