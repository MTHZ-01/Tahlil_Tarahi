import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { CSSTransition } from 'react-transition-group'
import { InView } from 'react-intersection-observer';
import { Fragment } from 'react'

import { ReactComponent as Toman } from '../assets//Toman.svg';


export class Event extends Component {
  state = {
    isInView: false
  }


  render() {

    const formatter = new Intl.NumberFormat('fa', {
      style: 'decimal',


      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    var d = ""
    try {

      d = this.props.data.discount
    }
    catch {

    }
    return (
      <InView className={``} onChange={(inView, entry) => {
        this.setState({ isInView: inView })
        // console.log(inView)
      }}>


        <div className=' col-12  d-flex  flex-column prod p-3'>

          <CSSTransition
            in={this.state.isInView}
            timeout={2000}
            classNames="opacLong"

          >
            <Fragment>

              <div className=' col-12 center imgCont'>

                <img className=' m-3 ' src={this.props.img} alt={this.props.title} />

              </div>






              <div className='col-12 center'>

                <div className="col-12  col-xl-10 d-flex flex-column justify-content-between p-3  ">
                  <div className='ProdTitling  col-12'>
                    <h2 className='specialH2 prodTitle'>{this.props.title}</h2>
                  </div>


                  {/* <div className='heightFix'></div> */}
                  <div className='co-12 center justify-content-start align-items-end '>

                    <div className="col-6 d-flex justify-content-end ">


                    </div>

                  </div>



                </div>

              </div>
              <Button className='shoppingButton' ><Link   to={`/Events/${this.props.title}`} className="col-12 h-100"></Link></Button>

            </Fragment>
          </CSSTransition>
        </div>
      </InView >


    )
  }
}

const mapStateToProps = (state) => {
  return {
    navBarSmallView: state.navBarSmallView,

  }
}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event))
