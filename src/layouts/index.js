import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './index.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Xanthous Tech"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'xtech, xanthous' },
      ]}
    />
    <Header/>
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
