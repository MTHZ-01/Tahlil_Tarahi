import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewsMode1 from './NewsMode1'
export class newsSlider extends Component {
  render() {
    return (
      <div className='newsSlider col-12 center '>
        <div className='col-12 col-lg-10 col-xl-8 newsSliderParent max_width'>

          <button className='indexChangeBtn SliderRightBtn fa fa-chevron-right'></button>
          <NewsMode1 />
          <button className='indexChangeBtn SliderLeftBtn fa fa-chevron-left'></button>

          <div className='indexViewCont leftFix col-12 center'>

              <button className='indexBtn'></button>
              <button className='indexBtn'></button>
              <button className='indexBtn'></button>
              <button className='indexBtn'></button>
              <button className='indexBtn'></button>
              <button className='indexBtn indexBtnActive'></button>
              <button className='indexBtn'></button>

          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(newsSlider)