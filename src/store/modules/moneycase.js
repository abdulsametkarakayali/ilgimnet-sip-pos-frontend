import MoneyCase from '@/apis/MoneyCase'
import message from './helper/message'

// State
const state = {
  moneyCases: [],
  moneyCase: {
    caseType: '',
    salesNo: '',
    moneycaseamount: '',
    descriptions: '',
    transacter: ''
  }
}

// Getters
const getters = {
  allmoneyCases: (state) => {
    return state.moneyCases
  }

}

// Actions
const actions = {

  getmoneyCases({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    MoneyCase.all().then(response => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_MONEYCASES', response.data.results)
    }).catch(err => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_MONEYCASES', err.response.data)
    })
  },
  postMoneyCase({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      MoneyCase.insert(data).then(response => {
        console.log(data)
        resolve(response.data.results)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('patchCaseStatus', 0, {
          root: true
        })
        dispatch('changeStatusHideModal', true, {
          root: true
        })
        dispatch(('getmoneyCases'))
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },
  getCaseStatus({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    MoneyCase.get().then(response => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_SETTING', response.data.results)
    }).catch(err => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_SETTING', err.response.data)
    })
  },
  patchCaseStatus({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      MoneyCase.patch(data, data.id).then(response => {
        dispatch('changeStatusHideModal', true, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      })
       message.toastSuccess(data.status === 0 ? 'Kasa Kapatıldı' : 'Kasa Açıldı')
    })
  },
  updateMoneycase({
    commit
  }, data) {
    commit('UPDATE_MONEYCASE', data)
  }
}
// Mutations
const mutations = {

  SET_MONEYCASES: (state, moneyCases) => {
    state.moneyCases = moneyCases
  },

  UPDATE_MONEYCASE: (state, data) => {
    state.moneyCase = {
      caseType: data.caseType,
      salesNo: data.salesNo,
      moneycaseamount: data.amount,
      descriptions: data.descriptions,
      transacter: data.transacter
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}