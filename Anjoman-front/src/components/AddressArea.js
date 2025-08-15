


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { setLuxAlert, setShoppingCartStages, clearSearchPlaceItems, setBuyFormData, setCityValue, reduxualBarOpen, reduxualBarClose } from '../redux/actions'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClearIcon from '@mui/icons-material/Clear';
import { createRef } from 'react'
import { Cookies } from 'react-cookie'
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CSSTransition } from 'react-transition-group'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LinearProgress from '@mui/material/LinearProgress';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { sizeof } from 'stylis'

export class AddressArea extends Component {
    f1Ref = new createRef()

    constructor() {
        super()
        this.cookie = new Cookies()
    }


    state = {
        mapBox: false,
        field1Err: false,
        field2Err: false,
        field3Err: false,
        field4Err: false,
        selecedVal1: null,
        selecedVal2: null,
        selecedVal3: null,
        selecedVal4: null,
        states: null,
        cities: null,
        citystate: null,
        redirect: null,
        finalPriceFieldOpen: false,
        sendingFee: null,




    }

    showSuccessAlert = (message, subMessage, severity = "success") => {
        this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity: severity })

        setTimeout(() => this.props.setLuxAlert({ open: false }), 5000)
    }



    componentDidMount() {


        fetch("https://alucarddev.ir/digitalAssets/getCity")
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    this.showSuccessAlert("عدم اتصال", "اتصال اینترنت خود را چک کرده سپس رفرش کنید", "error")

                } else {

                    this.props.setCityValue(data.states)
                }



            })


    }


    handleRedirect = (url) => {
        this.setState({ redirect: url })
    }

    calculateSendingPrice = e => {
        e.preventDefault()

        if (isNaN(this.state.selecedVal3)) {
            this.showSuccessAlert("کد پستی", "کد پستی یک مقدار عددی است", "error")
            return
        }

        if (String(this.state.selecedVal3).length == 10) {
        } else {

            this.showSuccessAlert("کد پستی", "کد پستی ده رقم است", "error")
            // console.log(String(this.state.selecedVal3).length)
            // console.log(this.state.selecedVal3)
            return

        }



        if (this.state.selecedVal1 == null) {
            this.showSuccessAlert("شهر", "هنوز شهری انتخاب نشده است", "error")
            return
        }



        this.setState({ finalPriceFieldOpen: true })
        const data = {
            userId: this.cookie.get("sessionId"),
            dest: this.state.selecedVal1.id,
            postalCode: this.state.selecedVal3,
            address: this.state.selecedVal4,
            eventsInOrder: this.props.buyBasket.prodData,
            value: this.props.buyBasket.totalPrice
        }



        fetch("https://alucarddev.ir/digitalAssets/getChaparPrice", {
            method: "POST",
            body: JSON.stringify(data)

        })
            .then(r => r.json())
            .then(d => this.setState({ sendingFee: d.data }))


    }



    getPayed = () => {

        const data = {
            userId: this.cookie.get("sessionId"),
            cityId: this.state.selecedVal1,
            postalCode: this.state.selecedVal3,
            address: this.state.selecedVal4,
            eventsInOrder: this.props.buyBasket.prodData,
            description: "فروشگاه اینترنتی ماهور",
            amount: Number(this.props.buyBasket.totalPrice),
            verCode: null
        }

        
        const c = new Cookies()

        c.set("buyData", data, { path: "/" })

        console.log("BuyData set! BuyData set! BuyData set! BuyData set!")

        // console.log("runs")
        this.showSuccessAlert("", "به درگاه پرداخت هدایت می شوید.")

        // fetch("https://alucarddev.ir/verify/", {
            fetch("https://alucarddev.ir/pay", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(data => {

                window.location.href = data.url
            })

        // For testing perpouses:

        // fetch("https://alucarddev.ir/digitalAssets/submitBuy", {
        //     method: "POST",
        //     body: JSON.stringify(data)
        // })
        //     .then(r => r.json())
        //     .then(data => {
        //         console.log(data)
        //         // window.location.href = data.url
        //     })



    }

    submitBuy = e => {
        e.preventDefault()

        const data1 = {
            MMERCHANT_ID: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            amount: 5000,
            description: "پول وده, پول زور ورده",
            email: 'user@userurl.ir',
            mobile: '09123456789',
            CallbackURL: 'https://alucarddev.ir/verify/'


        }
        // fetch("https://alucarddev.ir/pay", {
        fetch("https://alucarddev.ir/verify/", {
            method: "POST",
            body: JSON.stringify(data1)
        }
        )
            .then(res => res.json())
            .then(data => {

                // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", data)
                // if (data.status === 200) {

                //     this.props.history.push("/paymentSuccess")
                // }

            })


        const data = {
            userId: this.c.get("sessionId"),
            cityId: this.state.selecedVal1,
            postalCode: "662266",
            address: "sadas",

            prodsInOrder: this.props.buyBasket.prodData,
            totalFee: this.props.buyBasket.totalPrice
        }




        fetch("https://alucarddev.ir/digitalAssets/submitBuy", {
            method: "POST",
            body: JSON.stringify(data)
        }
        )
            .then(res => res.json())
            .then(data => {

                // console.log(data)
                if (data.status === 200) {


                }

            })



    }




    handlef1Change = (e, newVal) => {




        this.setState({ selecedVal1: e.nativeEvent.originalTarget.firstChild.data })
        this.setState({ field1Err: false })



    }

    postalCodeRef = new createRef()

    handleSubmit = e => {
        e.preventDefault()

        // console.log(e)
        if (this.state.selecedVal1 === null) {
            this.setState({ field1Err: true })
            return

        } else if (this.state.selecedVal3 === null) {

            this.setState({ field3Err: true })
            return

        } else if (this.state.selecedVal4 === null) {

            this.setState({ field4Err: true })
            return

        }

        const data = {
            selecedVal1: this.state.selecedVal1,
            selecedVal2: this.state.selecedVal2,
            selecedVal3: this.state.selecedVal3,
            selecedVal4: this.state.selecedVal4,
        }

        // console.log(data)
        return






        // console.log("data", data)
        // this.props.setBuyFormData(data)
    }

    render() {
        const formatter = new Intl.NumberFormat('fa', {
            style: 'decimal',


            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        // Mobile:
        if (this.props.navBarSmallView) {
            return (
                <Fragment>
                    <CSSTransition
                        in={this.state.finalPriceFieldOpen}
                        classNames="opac"
                        timeout={300}
                        unmountOnExit
                    >

                        <div className='endPriceCalculatorParent center' >
                            <button type='button' onClick={() => this.setState({ finalPriceFieldOpen: false })} className='delBtn  center'><ClearIcon></ClearIcon></button>

                            <div className='endPriceCalculatorParentchild border'>
                                <p className='pricingFont'><PaymentsIcon className='redT m-2' /> دقت کنید که به دلیل تفاوت وزن رویداد ها, کرایه حمل به صورت پس کرایه محاسبه می شود, به همین دلیل هزینه حمل و نقل به صورت پس کرایه می باشد..</p>
                                <div className='endPriceCalculator'>
                                    <div className='col-12 center p-4 moneyIcon'>
                                        <AttachMoneyIcon className='redT ' />
                                    </div>
                                    <div className='col-12  p-3 paymentUnit mt-2'>
                                        <p className='pricingFont'><PaymentsIcon className='redT m-2' /> جمع رویداد ها:</p>
                                        <p className=' pricingPriceFont'>{formatter.format(this.props.buyBasket.totalPrice)} تومان</p>
                                    </div>

                                    <div className='col-12  p-3 paymentUnit mt-3'>
                                        <p className='pricingFont'><PaymentsIcon className='redT m-2' /> ارسال:</p>
                                        {!this.state.sendingFee &&

                                            <LinearProgress color="inherit" />

                                        }
                                        {this.state.sendingFee &&
                                            <p className=' pricingPriceFont'>پرداخت درب منزل</p>
                                        }
                                    </div>
                                    <div className='col-12 center p-3 mt-1 '>
                                        <p className='pricingFont'>قابل پرداخت : </p>
                                        <div className='m-2' />
                                        {!this.state.sendingFee &&

                                            <LinearProgress color="inherit" />

                                        }
                                        {this.state.sendingFee &&
                                            <p className=' pricingPriceFont'>{formatter.format(Number(this.props.buyBasket.totalPrice))} تومان</p>
                                        }
                                    </div>
                                    <div className='col-12 center '>


                                        {this.state.sendingFee &&

                                            <button onClick={this.getPayed} className="finalizasatorBtn center">انتقال به درگاه پرداخت <p> <CreditCardIcon></CreditCardIcon></p></button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </CSSTransition>


                    <form type="submit" onSubmit={this.calculateSendingPrice} className=" col-12 d-flex flex-column finalizasatorMobileView formPositioningFix border-top">
                        <Button className='arrBackBtnAddToCart repositionForAddressArea' onClick={() => this.props.setShoppingCartStages({
                            confirm: true,
                            chooseAddress: false,
                            presonalInformation: false
                        })}><ArrowLeftIcon></ArrowLeftIcon></Button>


                        {/* <div className='col-12 mt-5 d-flex flex-row justify-content-end'>
                            <p>مرحله قبل</p>
                            <button onClick={() => this.props.setShoppingCartStages({
                                confirm: true,
                                chooseAddress: false,
                                presonalInformation: false
                            })} className='delBtn  center'><ClearIcon></ClearIcon></button>


                        </div> */}

                        <div className='col-12 h-100 '>

                            <div className='center flex-column addressAreaContMobile h-fit '>

                                <div className="col-10 p-1 center mt-5 border-bottom">


                                    <div className='col-12 center justify-content=start flex-column col-12 p-3 center'>
                                        <h2 className='addressH2 redT'> انتخاب آدرس</h2>
                                    </div>


                                </div>

                                <div className='col-10 p-1 center mt-5'>
                                    <div className='col-12 center justify-content=start flex-column'>


                                        {this.state.field1Err && <div className='col-12'><span style={{ color: '#ff9494', direction: 'rtl' }}>لطفا انتخاب کنید</span></div>}


                                        {this.props.cityData == null &&
                                            <CircularProgress></CircularProgress>
                                        }
                                        {this.props.cityData != null &&

                                            <Autocomplete required value={this.state.selecedVal1} onChange={(event, newValue) => {
                                                this.setState({ selecedVal1: newValue })

                                            }} options={this.props.cityData} className='chooseAddressBtn chooseAddressBtnMobile dirRtl' renderInput={(params) => <TextField {...params} label="شهر" />}>  <ExpandMoreSharpIcon></ExpandMoreSharpIcon></Autocomplete>
                                        }
                                    </div>
                                </div>
                                <div className='col-10 p-1 center '>


                                </div>

                                <div className='col-10 p-1 center mt-5'>

                                    <div className='col-12 center'>
                                        {this.state.field3Err && <div className='col-12'><span style={{ color: '#ff9494' }}>لطفا انتخاب کنید</span></div>}
                                        <TextField InputLabelProps={{ required: false, ref: this.postalCodeRef }} required onChange={event => {
                                            if (isNaN(event.target.value)) {
                                                this.showSuccessAlert("", "کد پستی یک عدد است!", "warning")

                                            }
                                            else
                                                this.setState({ selecedVal3: event.target.value })

                                        }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="کد پستی" />

                                    </div>
                                </div>


                                <div className='col-10 p-1 center mt-5'>
                                    <div className='col-12 center'>

                                        {/* <TextField id="standard-basic" className='chooseAddressBtn addressTextFieldStandardazation' label="کد پستی" /> */}
                                        {this.state.field4Err && <div className='col-12'><span style={{ color: '#ff9494' }}>لطفا انتخاب کنید</span></div>}
                                        <TextField
                                            InputLabelProps={{ required: false }}
                                            id="outlined-textarea"
                                            label="آدرس"
                                            placeholder="تایپ کنید"
                                            multiline
                                            className='chooseAddressBtn addressTextFieldStandardazation dirRtl addressTextFieldStandardazationMobile chooseAddressBtnMobile'
                                            required
                                            onChange={event => {
                                                this.setState({ selecedVal4: event.target.value })

                                            }}
                                        />
                                    </div>
                                </div>




                            </div>


                            <div className="col-12 center goNextBtnWrapper">

                                <button type='submit' className="finalizasatorBtn center">نهایی سازی خرید<div className='m-2' /> <p> <ShoppingCartIcon></ShoppingCartIcon></p></button>

                            </div>
                        </div>

                    </form>
                </Fragment>

            )

        }





        // Desktop:
        if (!this.props.navBarSmallView) {

            return (

                <Fragment>
                    <CSSTransition
                        in={this.state.finalPriceFieldOpen}
                        classNames="opac"
                        timeout={300}
                        unmountOnExit
                    >
                        <div className='endPriceCalculatorParent center' >
                            <div className='endPriceCalculatorParentchild border'>

                                <div className='col-8 d-flex justify-content-start align-items-start flex-column dirRtl'>

                                    <button type='button' onClick={() => this.setState({ finalPriceFieldOpen: false })} className='delBtn  center'><ClearIcon></ClearIcon></button>

                                </div>
                                <div className='endPriceCalculator'>
                                    <div className='col-12 center p-4 moneyIcon'>
                                        <AttachMoneyIcon className='redT ' />

                                    </div>
                                    <div className='col-12  p-3 paymentUnit mt-2'>
                                        <p className='pricingFont'><PaymentsIcon className='redT m-2' /> جمع محصولات:</p>
                                        <p className=' pricingPriceFont'>{formatter.format(this.props.buyBasket.totalPrice)} تومان</p>
                                    </div>

                                    <div className='col-12  p-3 paymentUnit mt-3'>
                                        <p className='pricingFont'><PaymentsIcon className='redT m-2' /> ارسال:</p>
                                        {!this.state.sendingFee &&

                                            <LinearProgress color="inherit" />

                                        }

                                    </div>
                                    <div className='col-12 center p-3 mt-1 '>
                                        <p className='pricingFont'>قابل پرداخت :</p>
                                        <div className='m-2' />
                                        {!this.state.sendingFee &&

                                            <LinearProgress color="inherit" />

                                        }
                                        {this.state.sendingFee &&
                                            <p className=' pricingPriceFont'>{formatter.format(Number(this.props.buyBasket.totalPrice))} تومان</p>
                                        }
                                    </div>

                                    <div className='col-12 center '>
                                        {this.state.sendingFee &&

                                            <button onClick={this.getPayed} className="finalizasatorBtn center">انتقال به درگاه پرداخت <p> <CreditCardIcon></CreditCardIcon></p></button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>

                    <form type="submit" onSubmit={this.calculateSendingPrice} className="center col-12 flex-column ">

                        <div className='col-12 mt-5 d-flex flex-row d-flex center justify-content-end'>
                            <p>مرحله قبل</p>
                            <button type='button' onClick={() => this.props.setShoppingCartStages({
                                confirm: true,
                                chooseAddress: false,
                                presonalInformation: false
                            })} className='delBtn  center'><ClearIcon></ClearIcon></button>

                        </div>

                        <div className='center flex-column addressAreaCont mt-0'>

                            <div className="col-10 p-1 center mt-5 border-bottom">


                                <div className='col-12 center justify-content=start flex-column col-12 p-3 center'>
                                    <h2 className='addressH2 redT'> انتخاب آدرس</h2>
                                </div>


                            </div>

                            <div className='col-10 p-1 center mt-5'>
                                <div className='col-12 center justify-content=start flex-column'>


                                    {this.state.field1Err && <div className='col-12'><span style={{ color: '#ff9494', direction: 'rtl' }}>لطفا انتخاب کنید</span></div>}


                                    {this.props.cityData == null &&
                                        <CircularProgress></CircularProgress>
                                    }
                                    {this.props.cityData != null &&

                                        <Autocomplete required value={this.state.selecedVal1} onChange={(event, newValue) => {
                                            this.setState({ selecedVal1: newValue })

                                        }} options={this.props.cityData} className='chooseAddressBtn chooseAddressBtnMobile dirRtl' renderInput={(params) => <TextField {...params} label="شهر" />}>  <ExpandMoreSharpIcon></ExpandMoreSharpIcon></Autocomplete>
                                    }
                                </div>
                            </div>
                            <div className='col-10 p-1 center '>


                            </div>

                            <div className='col-10 p-1 center mt-5'>

                                <div className='col-12 center'>
                                    {this.state.field3Err && <div className='col-12'><span style={{ color: '#ff9494' }}>لطفا انتخاب کنید</span></div>}
                                    <TextField InputLabelProps={{ required: false }} required onChange={event => {
                                        if (isNaN(event.target.value)) {
                                            this.showSuccessAlert("", "کد پستی یک عدد است!", "warning")

                                        }
                                        else
                                            this.setState({ selecedVal3: event.target.value })

                                    }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="کد پستی" />

                                </div>
                            </div>


                            <div className='col-10 p-1 center mt-5'>
                                <div className='col-12 center'>

                                    {/* <TextField id="standard-basic" className='chooseAddressBtn addressTextFieldStandardazation' label="کد پستی" /> */}
                                    {this.state.field4Err && <div className='col-12'><span style={{ color: '#ff9494' }}>لطفا انتخاب کنید</span></div>}
                                    <TextField
                                        InputLabelProps={{ required: false }}
                                        id="outlined-textarea"
                                        label="آدرس"
                                        placeholder="تایپ کنید"
                                        multiline
                                        className='chooseAddressBtn addressTextFieldStandardazation dirRtl addressTextFieldStandardazationMobile chooseAddressBtnMobile'
                                        required
                                        onChange={event => {
                                            this.setState({ selecedVal4: event.target.value })

                                        }}
                                    />
                                </div>
                            </div>




                        </div>




                        <button type='submit' className="finalizasatorBtn center">نهایی سازی خرید<div className='m-2' /> <p> <ShoppingCartIcon></ShoppingCartIcon></p></button>

                    </form>
                </Fragment>
            )

        }

    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView,
        cityData: state.cityData,
        buyBasket: state.buyBasket

    }

}

const mapDispatchToProps = {
    setCityValue: setCityValue,
    setShoppingCartStages: setShoppingCartStages,
    clearSearchPlaceItems: clearSearchPlaceItems,
    setBuyFormData: setBuyFormData,
    reduxualBarClose: reduxualBarClose,
    reduxualBarOpen: reduxualBarOpen,
    setLuxAlert: setLuxAlert


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressArea))