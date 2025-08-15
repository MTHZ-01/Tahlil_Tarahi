import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ItemBox extends Component {
  render() {
    return (
      <div className='ItemBox center'>
        <div className='col-8 center  justify-content-around flex-row'>

        <div className='item d-flex justify-content-center align-items-center flex-column'>
            <div className='itemHead'>
                
            </div>
            <h3>خدمات</h3>

        </div>

        <div className='item d-flex justify-content-center align-items-center flex-column'>
            <div className='itemHead'>
                
            </div>
            <h3>خدمات</h3>

        </div>



        <div className='item d-flex justify-content-center align-items-center flex-column'>
            <div className='itemHead'>
                
            </div>
            <h3>خدمات</h3>

        </div>
        
        <div className='item d-flex justify-content-center align-items-center flex-column'>
            <div className='itemHead'>
                
            </div>
            <h3>خدمات</h3>

        </div>
        
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBox)