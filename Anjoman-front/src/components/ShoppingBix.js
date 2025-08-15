import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
export class ShoppingBix extends Component {



  render() {

    return (
      <div className='ShoppingBox center'>

          <span className='countCont'>

            {this.props.data.length}
          </span>
        <Link className='col-12 h-100 center position-relative' to="/ShoppingCart">
          <i className='fa fa-shopping-cart'></i>


        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.buyBasket.prodData
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps)(ShoppingBix)