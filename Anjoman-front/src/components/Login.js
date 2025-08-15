

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import { Cookies } from "react-cookie";
import { withRouter, Link } from 'react-router-dom/cjs/react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FscreenLoadingComponent from './FscreenLoadingComponent';
import { CSSTransition } from 'react-transition-group';
import { setLuxAlert, setLogInStatus, reduxualBarOpen, reduxualBarClose } from '../redux/actions';

function mapStateToProps(state) {
    return {
        reduxualMessageBarOpen: state.reduxualMessageBarOpen
    };
}






class Login extends Component {
    constructor() {
        super()
        this.cookies = new Cookies()
    }

    state = {
        username: "",
        password: "",
        sessionId: null,
        showAlert: false,
        alertMessage: "",
        alertMessage2: "",
        amILoggingIn: false

    }

    componentDidMount() {

        try {

            this.props.goTop()
        } catch {

        }

    }


    showSuccessAlert = (message, subMessage, severity = "success") => {
        this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity: severity })

        setTimeout(() => this.props.setLuxAlert({ open: false }), 5000)
    }


    handleLogin = e => {
        e.preventDefault()
        this.setState({ amILoggingIn: true })
        fetch("https://alucarddev.ir/digitalAssets/Login", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(data => {




                // console.log("!!!!!!!!!!!!!!!!!!!!", data.status)
                if (data.status === 200) {
                    this.showSuccessAlert("موفق!", "شما وارد شدید")
                    this.setState({ sessionId: data.sessionId })
                    setTimeout(() => this.props.history.goBack(), 3000)
                    this.cookies.set("sessionId", data.sessionId, { path: "/" })
                    this.props.setLogInStatus(true)

                } else if (data.status === 201) {
                    this.showSuccessAlert("نمیشه!", "شما قبلا لوگین کرده اید", "failure")
                } else if (data.status === 199) {
                    this.showSuccessAlert("نمیشه!", "نام کاربری یا کلمه عبور اشتباه است", "failure")
                }


            })
            .then(() => this.setState({ amILoggingIn: false }))

    }

    render() {
        return (


            <div className="col-12 center ">
                {this.state.amILoggingIn &&
                    <FscreenLoadingComponent></FscreenLoadingComponent>

                }
                <form type="submit" className='col-12 center flex-column  border position-relative paymentStatsCont p-4 align-items-start justify-content-start flex-column' onSubmit={this.handleLogin}>

                    <div className="col-12 LoginHead">
                        <h1 className="p-3">ورود</h1>
                    </div>
                    <div className="m-3"></div>

                    <div className="col-12 center flex-column">

                        <TextField InputLabelProps={{ required: false }} variant="standard" required onChange={event => {
                            this.setState({ username: event.target.value })

                        }} id="standard-basic" className=' dirRtl textAreaForLogIn m-2' label="نام کاربری" />
                        <TextField type='password' InputLabelProps={{ required: false }} variant="standard" required onChange={event => {
                            this.setState({ password: event.target.value })

                        }} id="standard-basic" className=' dirRtl textAreaForLogIn m-2' label="کلمه عبور" />

                        <div className="col-12 center d-flex mt-5 mb-5 flex-column">
                            <Button variant="outlined" type="submit" className="whiteT loginBtn signUpBtn"><Link className="col-12 h-100 " to="/SignUp">ثبت نام</Link></Button>
                            <Button variant="contained" type="submit" className="whiteT loginBtn">ورود</Button>

                        </div>
                    </div>

                </form>

                <CSSTransition
                    in={this.state.showAlert}
                    classNames="opac"
                    timeout={300}
                    unmountOnExit
                >

                    <div className="col-12 alertCont">
                        <Alert severity="success" variant='filled'>
                            <AlertTitle>موفق</AlertTitle>
                            {this.state.alertMessage}  <strong>— {this.state.alertMessage2}</strong>
                        </Alert>
                    </div>

                </CSSTransition>

            </div>


        );
    }
}


const dispatchToProps = {
    setLogInStatus: setLogInStatus,
    reduxualBarClose: reduxualBarClose,
    reduxualBarOpen: reduxualBarOpen,
    setLuxAlert: setLuxAlert
}

export default withRouter(connect(
    mapStateToProps,
    dispatchToProps
)(Login))