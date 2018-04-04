import React from 'react'
import Link from 'gatsby-link'
import '../static/style/reset.css'
import './index.css'

const IndexPage = () => (
  <div className="index">
    <div className="intro">
      <div className="intro-title">
        <div>
          <h1>We build software</h1>
          <div className="ghost"></div>
        </div>
        <div>
          <h1>to help business grow.</h1>
          <div className="ghost"></div>
        </div>
      </div>
      <p className="intro-text">
        We're eager to help data driven companies achieve their business goals. All that is possible thanks to our distributed team of highly motivated individuals.
      </p>
      <div className="intro-invitation"><a href="mailto:hi@x-tech.io">Let's Chat!</a></div>
    </div>
  </div>
)

export default IndexPage
