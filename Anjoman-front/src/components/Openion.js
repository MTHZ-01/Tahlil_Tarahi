


import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Openion extends Component {
  render() {
    // console.log(this.props.data.author)
    return (
      <div className='openion col-12 col-md-9 pt-5 p-3'>
        <h5 className='userNameHolder'>کاربر {this.props.data.autuor}</h5>
        <div className='p-5 pt-3'>{this.props.data.message}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Openion)