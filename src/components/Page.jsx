import React from 'react'
import PropTypes from 'prop-types'

const Page = ({ children }) => (
  <div style={{ padding: 20 }}>
    {children}
  </div>
)

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
