

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { setShoppingCartStages } from '../redux/actions'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Cookies } from 'react-cookie'
import { Button } from '@mui/material'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { CSSTransition } from 'react-transition-group';


export class FinallizatorCart extends Component {
    constructor() {
        super()
        this.c = new Cookies()
    }


    state = {

        sessionId: null,
        showAlert: false,
        alertMessage: ""

    }


    showAlert = (message, subMessage) => {
        this.setState({
            showAlert: true,
            alertMessage: message
        })

        setTimeout(() => this.setState({ showAlert: false, alertMessage: "" }), 5000)
    }




    handleClick = () => {

        try {

            const id = this.c.get("sessionId")
            if (typeof id === "undefined") {

                this.showAlert("به صفحه ی لوگین منتقل می شوید")
                setTimeout(() => this.props.history.push("/Login"), 3000)
                return
            }
            if (this.props.buyBasket.totalPrice === 0) {
                this.showAlert("سبد خرید خالیه!")
                return
                
            }
        } catch {
            this.showAlert("به صفحه ی لوگین منتقل می شوید")

        }


        this.props.setShoppingCartStages({
            confirm: false,
            chooseAddress: true,
            presonalInformation: false

        })
    }


    render() {
        const formatter = new Intl.NumberFormat('fa', {
            style: 'decimal',
      
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });

        // Mobile:
        if (this.props.navBarSmallView) {
            return (

                <Fragment>

                <div className='finalizasator finalizasatorMobileView center '>

                    <div className='col-11 d-flex flex-column center'>
                        {this.props.totalPrice != 0 &&
                            <Fragment>

                                <div className='p-0 mt-2 center justify-content-end'>
                                    <div className=''><p className='priceFont redT'> {formatter.format(this.props.totalPrice)} تومان</p></div>
                                </div>


                                <Button onClick={this.handleClick} variant="contained" className="finalizasatorBtn finalizasatorBtnMobile center"><p>انتخاب آدرس <ChevronLeftIcon></ChevronLeftIcon></p></Button>
                            </Fragment>

                        }
                        {this.props.totalPrice == 0 &&

                            <div className='p-4 center justify-content-end col-12'>
                                <div className=' col-12 center'><p className='priceFont pricingFont col-4'>! سبد خالیه </p></div>
                            </div>

                        }
                    </div>

                </div>
                    <CSSTransition
                        in={this.state.showAlert}
                        classNames="opac"
                        timeout={300}
                        unmountOnExit
                    >

                        <div className="col-12 alertCont center dirRtl" >
                            <Alert severity="error">

                                <strong>{this.state.alertMessage}</strong>
                            </Alert>
                        </div>
                    </CSSTransition>

                </Fragment>

            )
        }   



        // Desktop:
        if (!this.props.navBarSmallView) {

            return (
                <div className='center flex-column'>


                    <div className='finalizasator'>
                        <div className='topPartShop'></div>
                        <div className='p-5 center justify-content-end'>
                            <div className='border-top'><p className='priceFont'> {formatter.format(this.props.totalPrice)} تومان</p></div>
                        </div>

                        <div className='col-12  center paddingForPoints justify-content-end flex-row'>
                        <p> اختلاف رنگ 10% (به دلیل تفاوت مانیتور)</p><i className='redDot'></i>
                        </div>

                    </div>

                    <Button onClick={this.handleClick} variant="contained" className="finalizasatorBtn center"><p>انتخاب آدرس <ChevronLeftIcon></ChevronLeftIcon></p></Button>


                    <CSSTransition
                        in={this.state.showAlert}
                        classNames="opac"
                        timeout={300}
                        unmountOnExit
                    >

                        <div className="col-12 alertCont center dirRtl">
                            <Alert severity="error" className='dirRtl'>
                                <strong className='dirRtl'>{this.state.alertMessage}</strong>
                            </Alert>
                        </div>
                    </CSSTransition>

                </div>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        totalPrice: state.buyBasket.totalPrice,
        navBarSmallView: state.navBarSmallView, 
        buyBasket : state.buyBasket
    }
}

const mapDispatchToProps = {
    setShoppingCartStages: setShoppingCartStages
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FinallizatorCart))