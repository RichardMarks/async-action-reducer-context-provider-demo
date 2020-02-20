const appActions = {
  async fetch (state, action, dispatch) {
    const { url } = action
    let response = null
    try {
      response = await dispatch({ type: 'startFetch', url })
    } catch (err) {
      console.error(err)
      response = null
      return dispatch({ type: 'fetchFailed', url })
    }
    return dispatch({ type: 'fetchComplete', url, response })
  },

  async startFetch (state, action, dispatch) {
    const startTime = (new Date()).getTime()
    const { url } = action
    return new Promise((resolve) => {
      setTimeout(() => {
        const endTime = (new Date()).getTime()
        const fetchTime = endTime - startTime
        dispatch({ type: 'setFetchTime', fetchTime })
        resolve({ status: 200, url, content: 'This is the fetched content' })
      }, 2000)
    })
  },

  async fetchComplete (state, action, dispatch) {
    console.log('fetch complete', { action })
    return action.response
  },

  async fetchFailed (state, action, dispatch) {
    console.log('fetch failed', { action })
    return action.url
  },

  async setFetchTime (state, action, dispatch) {
    return {
      ...state,
      fetchTime: action.fetchTime
    }
  }
}
export default appActions
