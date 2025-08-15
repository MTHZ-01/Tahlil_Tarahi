import { toHaveStyle } from '@testing-library/jest-dom/matchers'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLogoAction } from '../redux/actions'

export class NewsMode1 extends Component {


  state = {
    logo:null
  }
  get = () => {
    fetch("http://store.localhost/digitalAssets/logo")
    .then(res => res.json())
    .then((data) => {
      // console.log(data.imgSrc)
      this.props.setLogoAction(data.imgSrc)
      
      // console.log(this.props.logo)

    })
    
  }

  componentDidMount() {
    this.get()
  }


  render() {
    return (

        
        <img src={this.props.logo} className='col-12 h-100' alt="" /> 


    )
  }
}

const mapStateToProps = (state) => {
  return {
    logo: state.logo
  }
}

const mapDispatchToProps = {
  setLogoAction: setLogoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsMode1)