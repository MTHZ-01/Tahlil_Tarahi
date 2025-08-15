import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { withRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '@mui/material';
import { Cookies } from 'react-cookie';
import { setAuthStatusOpen } from '../redux/actions';
import { setLuxAlert, reduxualBarOpen, reduxualBarClose } from '../redux/actions';

export class PaymentHandler extends Component {

    c = new Cookies()

    showSuccessAlert = (message, subMessage, severity = "success") => {
        this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity: severity })

        setTimeout(() => this.props.setLuxAlert({ open: false }), 5000)
    }

    state = {
        data: null
    }


    submitAbuy = () => {
        // if (!(Number(this.props.match.params.status) == 200) || !(this.c.get("buyData"))) {
        //     return
        // }

        var data = this.props.buyBasket
        const buyData = this.c.get("buyData")
        console.log(buyData)
        console.log(buyData.userId)
        console.log(buyData.cityId)
        const verCode = this.props.match.params.verifectionCode
        data.verCode = verCode


        data.userId = buyData.userId
        data.cityId = buyData.cityId
        data.postalCode = buyData.postalCode
        data.address = buyData.address
        data.eventsInOrder = buyData.eventsInOrder

        console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.props.match.params)
        console.log(data)

        fetch("https://alucarddev.ir/digitalAssets/submitBuy", {
            method: "POST",
            body: JSON.stringify(data)
        }
        )
            .then(res => res.json())
            .then(data => {

                console.log(data)
                if (Number(data.status) == 200) {

                    this.showSuccessAlert("", "سفارش با موفقیت ثبت شد.")
                    fetch("https://alucarddev.ir/digitalAssets/setServerCookie", {
                        method: "POST",
                        body: JSON.stringify({ id: this.c.get("buyBasketId"), data: {} })

                    })

                        .then(r => r.json())
                        .then(data => {
                            console.log("Cookie Status:", data.data)
                            
                        }
                        )
                    // this.c.remove("buyData", { path: "/" })
                    // this.c.remove("buyData")
                    console.log(data)
                }
                var dataTemp = {...this.state.data}
                dataTemp.status = data.status
                this.setState({data:dataTemp})
                console.log("dataTemp", dataTemp)


            })


    }

    componentDidMount() {
        this.submitAbuy()
        this.setState({ data: this.props.match.params })
    }
    handleAuthStatus = () => {
        this.props.setAuthStatusOpen(!this.props.isAuthOpen)
    }

    render() {
        const data = this.props.match.params




        if (this.state.data) {

            if (this.state.data.status == 200) {
                return (


                    <div className="col-12 p-0 p-xl-5  center  paymentHandlerCont">

                        <div className="col-12 center flex-column  border position-relative paymentStatsCont">
                            <div className="col-12  border h1ForPaymentSuccess">
                                <h1 className="">پرداخت موفق</h1>
                            </div>

                            <div className="col-10">
                                <p>کاربر گرامی پرداخت شما موفق بود. شما می توانید سفارش خود را از لینک زیر پیگیری نمایید</p>
                            </div>

                            <div className="col-12 center flex-column  getOrderInfoBtnWrapper">
                                <Button varient="contained" className="col-10 getOrderInfoBtn" onClick={this.handleAuthStatus}>پیگیری سفارش</Button>
                                <Button varient="contained" className="col-10 getOrderInfoBtn getBackStyle center"><Link className="col-12 h-100 whiteT center" to="/"> بازگشت به صفحه اصلی  </Link></Button>
                            </div>
                        </div>




                    </div>

                )

            } else if (this.state.data.status == 101) {
                return (


                    <div className="col-12 p-0 p-xl-5  center  paymentHandlerCont">

                        <div className="col-12 center flex-column  border position-relative paymentStatsCont">
                            <div className="col-12  border h1ForPaymentRepeatedTransaction">
                                <h1 className="">تراکنش تکراری</h1>
                            </div>

                            <div className="col-10">
                                <p>کاربر گرامی, شما احتمالا صفحه را رفرش کردید.</p>
                                <p>در صورتی که پرداخت موفق باشد, سفارش شما ثبت می شود.</p>
                            </div>

                            <div className="col-12 center flex-column  getOrderInfoBtnWrapper mt-4">
                                <Button varient="contained" className="col-10 getOrderInfoBtn getBackStyle center"><Link className="col-12 h-100 whiteT center" to="/"> بازگشت به صفحه اصلی  </Link></Button>
                            </div>
                        </div>




                    </div>

                )

            }

            else {
                return (


                    <div className="col-12 p-0 p-xl-5  center  paymentHandlerCont">

                        <div className="col-12 center flex-column  border position-relative paymentStatsCont">
                            <div className="col-12  border h1ForPaymentFailure">
                                <h1 className="">پرداخت ناموفق</h1>
                            </div>

                            <div className="col-10">
                                <p>کاربر گرامی پرداخت شما ناموفق بود. لطفا دوباره سعی نمایید.</p>
                            </div>

                            <div className="col-12 center flex-column  getOrderInfoBtnWrapper mt-4">
                                <Button varient="contained" className="col-10 getOrderInfoBtn getBackStyle center"><Link className="col-12 h-100 whiteT center" to="/"> بازگشت به صفحه اصلی  </Link></Button>
                            </div>
                        </div>




                    </div>

                )
            }


        }

    }
}

const mapStateToProps = (state) => {
    return {
        buyBasket: state.buyBasket
    }
}

const mapDispatchToProps = {

    setAuthStatusOpen: setAuthStatusOpen,
    reduxualBarOpen: reduxualBarOpen,
    reduxualBarClose: reduxualBarClose,
    setLuxAlert: setLuxAlert
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentHandler)) 
