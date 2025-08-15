



import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export class ImageLargeViewComponent extends Component {
  render() {
    return (
      <div className='center col-12 h-100 imageLargeViewComponent'>
        <Button className="bigImgShowCloseBtn" onClick={this.props.switchBigImageShow}> <CloseIcon className='redT'></CloseIcon></Button>
        <div className=''>
          <img className='col-12 h-100' src={this.props.imgurl} />
        </div>

        <div className='col-12 center imageChangerInFullView'>
          {this.props.imageData && this.props.imageData.slice(1).map(i =>
            <Button className='imgBtn center ' onClick={() => this.props.switchPics(i)}><img className='col-12 h-100' src={i} /></Button>
          )}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navMenoOpen: state.navMenoOpen,
    navBarSmallView: state.navBarSmallView,
    EventData: state.EventData,
    isLoggedIn: state.isLoggedIn

  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLargeViewComponent)