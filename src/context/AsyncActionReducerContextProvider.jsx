import React from 'react'
import PropTypes from 'prop-types'

const AsyncActionReducerContext = React.createContext()

export class AsyncActionReducerContextProvider extends React.Component {
  constructor (props) {
    super(props)

    this.dispatch = this.dispatch.bind(this)
    this.reducer = this.reducer.bind(this)

    this.state = props.initialState
      ? { ...props.initialState }
      : {}

    this.actionHandlers = props.actionHandlers || {}
  }

  dispatch (action) {
    return new Promise(async (resolve, reject) => {
      let nextState = null

      try {
        nextState = await this.reducer(this.state, action)
      } catch (err) {
        console.error(err)
        nextState = null
      }

      if (!nextState || nextState === this.state) {
        return resolve({})
      }

      const postSetState = () => resolve({ ...nextState })
      this.setState(nextState, postSetState)
    })
  }

  async reducer (state, action) {
    return new Promise((resolve, reject) => {
      let handler = this[action.type]
      !handler && (handler = this.actionHandlers[action.type])
      return typeof handler === 'function'
        ? handler(state, action, this.dispatch)
          .then(resolve, reject)
          .catch(reject)
        : resolve(state)
    })
  }

  render () {
    const contextValue = [
      { ...this.state },
      this.dispatch
    ]
    return (
      <AsyncActionReducerContext.Provider value={contextValue}>
        {this.props.children}
      </AsyncActionReducerContext.Provider>
    )
  }
}

AsyncActionReducerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.object,
  actionHandlers: PropTypes.object
}

export const useAsyncActionReducerContext = () => {
  return React.useContext(AsyncActionReducerContext)
}

export default AsyncActionReducerContextProvider
