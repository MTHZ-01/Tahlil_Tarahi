

import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LoadingComponent extends Component {
  render() {
    return (
      <div className=' '></div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent)