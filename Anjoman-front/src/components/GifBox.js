

import React, { Component } from 'react'
import { connect } from 'react-redux'

export class gifBox extends Component {
  render() {
    return (
      <div className='col-12 center'>
        <div className='GifBox col-11 max_width'>
            <img src="https://dkstatics-public.digikala.com/digikala-adservice-banners/03452e0f0348db3c99530667e3b9558d80effe15_1691823820.gif?x-oss-process=image?x-oss-process=image/format,webp" className='col-12 h-100' alt="" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(gifBox)