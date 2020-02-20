import React from 'react'

import { useAsyncActionReducerContext } from 'context/AsyncActionReducerContextProvider'

const Main = () => {
  const [ state, dispatch ] = useAsyncActionReducerContext()
  const [ response, setResponse ] = React.useState('')

  return (
    <div>
      <button
        className='btn'
        onClick={() => {
          dispatch({ type: 'fetch', url: 'facebook.com' }).then(response => {
            response.status === 200 && setResponse(response.content)
          })
        }}>
        Fetch
      </button>
      <p>Fetch Response: {JSON.stringify(response)}</p>
      <p>State:</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

export default Main
