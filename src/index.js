import React from 'react'
import { render } from 'react-dom'
import './index.css'

import AsyncActionReducerContextProvider from 'context/AsyncActionReducerContextProvider'
import appState from 'state/appState'
import appActionHandlers from 'actions/appActions'

import Page from 'components/Page'
import Header from 'components/Header'
import Main from 'components/Main'
import Footer from 'components/Footer'

const App = () => (
  <AsyncActionReducerContextProvider
    initialState={appState}
    actionHandlers={appActionHandlers}
  >
    <Page>
      <Header />
      <Main />
      <Footer />
    </Page>
  </AsyncActionReducerContextProvider>
)

render(<App />, document.getElementById('root'))
