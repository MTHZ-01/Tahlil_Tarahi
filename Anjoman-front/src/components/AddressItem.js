



import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AddressItem extends Component {
  render() {
    // console.log("Location", this.props.location)
    return (
      <div className='addressItemCont centet justify-content-start'>
        <p>{this.props.title}</p>
        <button className='shoppingButton' onClick={() => this.props.changeCenter([this.props.location.y, this.props.location.x])}></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem)