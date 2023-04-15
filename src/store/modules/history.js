import History from '@/apis/History'
import MoneyCase from '@/apis/MoneyCase'
// state
const state = {
  histories: [],
  bestseller: [],
  myHistories: [],
  historiesBc: [],
  incomeToday: '',
  CardPayment: '',
  SafePayment: '',
  CashPayment: '',
  incomeYesterday: '',
  ordersToday: '',
  ordersYesterday: '',
  thisYearIncome: '',
  MonthIncome: '',
  monthChart: [ //
    {
      id: 1,
      name: 'Ocak',
      value: 0
    },
    {
      id: 2,
      name: 'Şubat',
      value: 0
    },
    {
      id: 3,
      name: 'Mart',
      value: 0
    },
    {
      id: 4,
      name: 'Nisan',
      value: 0
    },
    {
      id: 5,
      name: 'Mayıs',
      value: 0
    },
    {
      id: 6,
      name: 'Haziran',
      value: 0
    },
    {
      id: 7,
      name: 'Temmuz',
      value: 0
    },
    {
      id: 8,
      name: 'Agustos',
      value: 0
    },
    {
      id: 9,
      name: 'Eylül',
      value: 0
    },
    {
      id: 10,
      name: 'Ekim',
      value: 0
    },
    {
      id: 11,
      name: 'Kasım',
      value: 0
    },
    {
      id: 12,
      name: 'Aralık',
      value: 0
    }
  ],
  dayChart: []
}

// getters

const dateGlobal = new Date()
const todayGlobal = dateGlobal.toLocaleDateString('tr-TR', { timeZone: 'UTC' })
const yesterdayx = new Date()
yesterdayx.setDate(yesterdayx.getDate() - 1)
const getYesterday = yesterdayx.toLocaleDateString('tr-TR', { timeZone: 'UTC' })

const getters = {
  allHistories: (state) => state.histories,
  allMyHistories: (state) => state.myHistories,
  getIncomeToday: (state) => state.incomeToday,
  getCashPayment: (state) => state.CashPayment,
  getBestSellers: (state) => state.bestseller,
  getCardPayment: (state) => state.CardPayment,
  getSafePayment: (state) => state.SafePayment,
  getIncomeYesterday: (state) => state.incomeYesterday,
  getThisYearIncome: (state) => state.thisYearIncome,
  getThisMonthIncome: (state) => state.MonthIncome,
  getOrdersToday: (state) => state.ordersToday,
  getOrdersYesterday: (state) => state.ordersYesterday,
  getMonthChart: (state) => state.monthChart,
  getDayChart: (state) => state.dayChart

}

// actions
const actions = {

  getHistories({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    History.all().then(response => {
      commit('SET_HISTORIES', response.data.results)
      dispatch('changeIsLoading', false, {
        root: true
      })
    })
  },
  getBestSeller({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    History.bestSeller().then(response => {
      commit('SET_BESTSELLER', response.data.results)
      dispatch('changeIsLoading', false, {
        root: true
      })
    })
  },
  getMyHistories({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    History.myHistory(id).then(response => {
      commit('SET_MY_HISTORIES', response.data.results)
      dispatch('changeIsLoading', false, {
        root: true
      })
    })
  },

  postHistory({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.post(data).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },

  deleteHistory({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.delete(id).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getHistories')
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },

  sendReceipt({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.sendReceipt(data).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },

  filterHistory({
    commit,
    dispatch
  }, filter) {
    if (filter === 'all') {
      dispatch('getHistories')
    } else if (filter === 'today') {
      commit('FILTER_HISTORY', filter)
    } else if (filter === 'yesterday') {
      commit('FILTER_HISTORY', filter)
    } else {
      dispatch('getHistories')
    }
  }
}

// mutations
const mutations = {

  SET_BESTSELLER: (state, bestseller) => {
    state.bestseller = bestseller
  },


  SET_HISTORIES: (state, histories) => {
    const newHistories = histories.map(history => {
      return {
        ...history,
        date: new Date(history.historyDate).toLocaleDateString('tr-TR', { timeZone: 'UTC' }),
        dateJs: new Date(history.historyDate),
        year: new Date(history.historyDate).getFullYear(),
        month: new Date(history.historyDate).getMonth() + 1
      }
    })

    state.histories = newHistories
    state.historiesBc = newHistories
    const checkTodakIncome = newHistories.filter(history => history.date === todayGlobal)
    const checkYesterdayIncome = newHistories.filter(history => history.date === getYesterday)
    const checkYearIncome = newHistories.filter(history => history.year === new Date().getFullYear())
    if (checkTodakIncome.length < 1) {
      state.incomeToday = 0
    } else {
      state.incomeToday = newHistories.filter(history => history.date === todayGlobal && (history.paymentType === 0 || history.paymentType === 1)).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }
    if (checkYesterdayIncome.length < 1) {
      state.incomeYesterday = 0
    } else {
      state.incomeYesterday = newHistories.filter(history => history.date === getYesterday).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }
    if (checkYearIncome.length < 1) {
      state.thisYearIncome = 0
    } else {
      state.thisYearIncome = newHistories.filter(history => history.year === new Date().getFullYear()).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }
    state.MonthIncome = newHistories.filter(history => history.month === new Date().getMonth()).map(val => Number(val.amount)).reduce((a, b) => a + b,0)
    state.ordersToday = newHistories.filter(history => history.date === todayGlobal && (history.paymentType === 0 || history.paymentType === 1)).length
    state.SafePayment = (newHistories.filter(history => history.date === todayGlobal && history.paymentType !== 1).map(val => Number(val.paymentType === 11 ? -val.amount : val.amount)).reduce((a, b) => a + b))
    state.CardPayment = (newHistories.filter(history => history.paymentType === 1 && history.date === todayGlobal).map(val => Number(val.amount)).reduce((a, b) => a + b))
    state.CashPayment = ( newHistories.filter(history => history.paymentType === 0 && history.date === todayGlobal).map(val => Number(val.amount)).reduce((a, b) => a + b))
    state.ordersYesterday = newHistories.filter(history => history.date === getYesterday).length
    state.monthChart.map((monthItem) => {
      monthItem.value = 0
    })

    state.monthChart.map((monthItem) => {
      newHistories.map((historyItem) => {
        if (monthItem.id === historyItem.month) {
          monthItem.value += historyItem.amount
         
        }
      })
   
    })
    console.log( state.monthChart.value)
    const chartDateDay = new Date()
    chartDateDay.setDate(chartDateDay.getDate() + 1)
    const listSevenDay = []
    for (let i = 1; i <= 7; i++) {
      chartDateDay.setDate(chartDateDay.getDate() - 1)
      const getDateFormated = chartDateDay.toLocaleDateString('tr-TR', { timeZone: 'UTC' })
      listSevenDay.push(getDateFormated)
    }
    const reverseDay = listSevenDay.reverse()
    const dayObj = reverseDay.map(val => {
      return {
        name: val,
        value: 0
      }
    })
    state.dayChart = dayObj
    state.dayChart.map((dayChart) => [
      newHistories.map((historyItem) => {
        if (dayChart.name === historyItem.date) {
          dayChart.value += historyItem.amount
        }
      })
    ])
  },

  SET_MY_HISTORIES: (state, histories) => {
    const newHistories = histories.map(history => {
      return {
        ...history,
        date: new Date(history.date).toLocaleDateString('tr-TR', { timeZone: 'UTC' }),
        dateJs: new Date(history.date),
        year: new Date(history.date).getFullYear(),
        month: new Date(history.date).getMonth() + 1
      }
    })

    state.myHistories = newHistories
  },
  FILTER_HISTORY: (state, payload) => {
    const d = new Date()
    if (payload === 'today') {
      const today = d.toLocaleDateString('tr-TR', { timeZone: 'UTC' })
      state.histories = state.historiesBc.filter(history => history.date === today)
    } else if (payload === 'yesterday') {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const getYesterday = yesterday.toLocaleDateString('tr-TR', { timeZone: 'UTC' })
      state.histories = state.historiesBc.filter(history => history.date === getYesterday)
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
