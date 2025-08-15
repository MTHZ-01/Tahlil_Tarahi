import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { setShoppingCartStages, setPersonalBuyerData } from '../redux/actions'
import { TextField, InputLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Button } from '@mui/material'

export class PersonalInfo extends Component {

    changeData = (fn, ln, pn) => {
        const data = {
            firstName: fn,
            lastName: ln,
            PhoneNumber: pn,
        }


        this.props.setPersonalBuyerData(data)
    }

    submitBuy = e => {
        e.preventDefault()

        fetch("https://alucarddev.ir/digitalAssets/submitBuy", {
            method: "POST",
            body: JSON.stringify({
                data: this.props.events,
                buyFormData: this.props.buyFormData,
                personalBuyerInfo: this.props.personalBuyerInfo

            })
        }
        )
            .then(res => res.json())


        this.props.history.push("/paymentSuccess")

    }





    render() {


        // Mobile:
        if (this.props.navBarSmallView) {
            return (

                <form type="submit" onSubmit={
                    this.submitBuy
                } className='center flex-column col-12  finalizasatorMobileView formPositioningFix border-top'>
                    {/* <div className='col-12 mt-5 d-flex flex-row justify-content-end'>



                        <Button className='arrBackBtnAddToCart repositionForAddressArea' onClick={() => this.props.setShoppingCartStages({
                            confirm: false,
                            chooseAddress: true,
                            presonalInformation: false

                        })}><ArrowLeftIcon></ArrowLeftIcon></Button>

                    </div>

                    <div className=' col-11  AreaContMobilePersonalInfo position-relative center flex-column justify-content-start'>


                        <div className="col-10 p-1 center mt-5 border-bottom">


                            <div className='col-12 center justify-content=start flex-column col-12 p-3 center'>
                                <h2 className='addressH2 redT'>مشخصات فردی</h2>

                            </div>


                        </div>


                        <div className='col-12 center flex-column d-flex'>


                            <div className='col-9 center d-flex flex-column pt-5'>


                                <div className='col-11 d-felx justify-content-start pt-4 flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="نام" InputLabelProps={{ required: false }} />


                                </div>



                                <div className='col-11 d-felx justify-content-start pt-4 flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="نام خانوادگی" InputLabelProps={{ required: false }} />


                                </div>



                                <div className='col-11 d-felx justify-content-start pt-4 flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="تلفن همراه" InputLabelProps={{ required: false }} />


                                </div>

                            </div>



                        </div>


                    </div> */}

                    <div className="col-12 center goNextBtnWrapper">

                        <button type='submit' className="finalizasatorBtn center"><p>انتقال به درگاه پرداخت</p></button>
                    </div>

                </form>

            )
        }


        // Desktop: 
        if (!this.props.navBarSmallView) {

            return (

                <form type="submit" onSubmit={this.submitBuy} className='center flex-column col-12'>
                    <div className='col-12 mt-5 d-flex flex-row justify-content-end'>
                        <p>مرحله قبل</p>
                        <button onClick={() => this.props.setShoppingCartStages({
                            confirm: false,
                            chooseAddress: true,
                            presonalInformation: false

                        })} className='delBtn fa fa-times'></button>
                    </div>

                    <div className=' addressAreaCont position-relative center flex-column justify-content-start'>
                        <div className='topPartShop  position-absolute posForTopPartShop'>
                        </div>

                        <div className='col-12 p-4 center'>
                            <div className='col-10 center border-bottom p-4 pt-0'>
                                <h2 className='addressH2 '>مشخصات فردی</h2>
                            </div>
                        </div>
                        <div className='col-12 center flex-column d-flex'>


                            <div className='col-12 center d-flex flex-column'>


                                <div className='col-8 d-felx justify-content-start flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn addressTextFieldStandardazation' label="نام" InputLabelProps={{ required: false }} />


                                </div>



                                <div className='col-8 d-felx justify-content-start flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn addressTextFieldStandardazation' label="نام خانوادگی" InputLabelProps={{ required: false }} />


                                </div>



                                <div className='col-8 d-felx justify-content-start flex-column marginBottom'>

                                    <TextField required onChange={event => {
                                        this.changeData(event.target.value, this.props.personalBuyerInfo.lastName, this.props.personalBuyerInfo.PhoneNumber)

                                    }} id="standard-basic" className='chooseAddressBtn addressTextFieldStandardazation' label="تلفن همراه" InputLabelProps={{ required: false }} />


                                </div>

                            </div>



                        </div>


                    </div>
                    <button type='submit' className="finalizasatorBtn center"><p>انتقال به درگاه پرداخت<i className='fa fa-chevron-left'></i></p></button>

                </form>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {

        personalBuyerInfo: state.personalBuyerInfo,
        navBarSmallView: state.navBarSmallView,
        events: state.buyBasket.prodData,
        buyFormData: state.buyFormData,
        personalBuyerInfo: state.personalBuyerInfo



    }
}

const mapDispatchToProps = {
    setShoppingCartStages: setShoppingCartStages,
    setPersonalBuyerData: setPersonalBuyerData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalInfo))