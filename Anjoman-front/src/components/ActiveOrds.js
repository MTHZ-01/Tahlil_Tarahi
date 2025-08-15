



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { TextField } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import ClearIcon from '@mui/icons-material/Clear';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import WarningIcon from '@mui/icons-material/Warning';
import { CSSTransition } from 'react-transition-group';


function mapStateToProps(state) {
    return {

    };
}

class ActiveOrds extends Component {
    state = {
        deleteFormOpen: false,
        deleteReson: ""

    }



    handleDeleteSubmit = () => {
        const data = {
            ordId: this.props.data.ordId,
            delResaon: this.state.deleteReson
        }


        fetch("https://alucarddev.ir/digitalAssets/deleteOrd", {
            method: "POST",
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => console.log("ProdDataFromModel",data))


    }

    render() {
        console.log("ProdsInOrder", this.props.data)
        return (
            <div className='ordCont m-1 oHidd '>

                <div className="col-12 p-4 border-bottom center justify-content-between ">
                    <h1 className='lightGrayT'>اقلام:</h1>
                    <div className="d-flex flex-row center">
                        <h1 className='lightGrayT m-0 p-0'> {this.props.index} </h1>
                        <LabelImportantIcon className='redT font-Med'></LabelImportantIcon>
                    </div>
                </div>
                <div className="col-12 center p-3 flex-column dirRtl justify-content-between">
                    {this.props.data.prodsInOrder.map((i) =>
                        <div className="col-12 m-2 dirRtl justify-content-between row">
                            <div className='col-12 col-sm-3  center imgContForAuthStatus '>
                                <img class=" col-12 h-100" src={`${i.prod.imgUrl}`} alt=""></img>
                            </div>
                            <div className="col-12 col-xl-7 p-5 center justify-content-start align-items-start flex-column">
                                <p className='m-2 lightGrayT'>{i.prod.title}</p>
                                <p className='m-2 lightGrayT'><DoneOutlineIcon></DoneOutlineIcon> توضیح شما : <strong className='redT'> {i.explainations} </strong> </p>
                                <p className='m-2 lightGrayT'><DoneOutlineIcon></DoneOutlineIcon> محل قرارگیری زنجیر : <strong className='redT'> {i.chainPosition} </strong></p>
                                <p className='m-2 lightGrayT'><DoneOutlineIcon></DoneOutlineIcon> محل نصب پرده : <strong className='redT'> {i.installationPosition} </strong></p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-12 p-4 border-top bg-light center  flex-column">
                    <div className="col-12 infoForOrd p-1 center justify-content-start">
                        <p className='m-2'>وضعیت فعلی : <strong className='redT'> {this.props.data.status} </strong> </p>
                        <p className='m-2'>کد پستی : <strong className='redT'> {this.props.data.postalCode} </strong> </p>
                        <p className='m-2'>آدرس : <strong className='redT'> {this.props.data.address} </strong> </p>
                    </div>


                    <div className="col-12 center justify-content-end pt-3 pb-3 d-flex flex-column">
                        <div className="col-12 d-flex justify-content-end">
                            <Button className='whiteT redBg ' variant="contained" onClick={() => this.setState({ deleteFormOpen: true })}>لغو سفارش <PhonelinkEraseIcon> </PhonelinkEraseIcon> </Button>
                        </div>

                        <CSSTransition
                            in={this.state.deleteFormOpen}
                            classNames="opac"
                            timeout={500}
                            unmountOnExit
                        >

                            <form action="submit" className='d-flex flex-column mt-4 position-relative'>

                                <Button className='arrBackBtnAddToCart repositionForAddressArea' onClick={() => this.setState({ deleteFormOpen: false })}><ClearIcon></ClearIcon></Button>


                                <div className='col-12 center justify-content=start flex-column col-12 p-3 center'>
                                    <h2 className='addressH2 redT'> لغو سفارش</h2>
                                </div>
                                <input type="hidden" name='csrfmiddlewaretoken'  />
                                <TextField InputLabelProps={{ required: false }} required onChange={event => {
                                    this.setState({ deleteReson: event.target.value })

                                }} id="standard-basic" className='chooseAddressBtn dirRtl addressTextFieldStandardazation addressTextFieldStandardazationMobile chooseAddressBtnMobile' label="علت لغو" />

                                <div className="col-12 center">
                                    <Button className='whiteT redBg ' variant="contained" onClick={this.handleDeleteSubmit}> <WarningIcon > </WarningIcon>  تایید لغو  </Button>
                                </div>


                            </form>
                        </CSSTransition>
                    </div>

                </div>



            </div >
        );
    }
}

export default connect(
    mapStateToProps,
)(ActiveOrds);