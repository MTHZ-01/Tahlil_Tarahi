import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import FscreenLoadingComponent from './FscreenLoadingComponent';
import SMSVerifyComponent from './SMSVerifyComponent';
import { setLuxAlert, setLogInStatus, reduxualBarOpen, reduxualBarClose } from '../redux/actions';

function mapStateToProps(state) {
  return {};
}

const dispatch = {
  setLogInStatus,
  reduxualBarOpen,
  reduxualBarClose,
  setLuxAlert,
};

class SignUp extends Component {
  state = {
    mobile: '',
    email: '', // Added email field
    firstname: '',
    lastname: '',
    password: '',
    showAlert: false,
    showFailAlert: false,
    alertMessage: '',
    alertMessage2: '',
    verifyOpen: false,
    verCode: null,
    isVerifyingUserName: false,
  };

  toggleLoading = () => {
    this.setState({ isVerifyingUserName: !this.state.isVerifyingUserName });
  };

  showSuccessAlert = (message, subMessage, severity = 'success') => {
    this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity });
    setTimeout(() => this.props.setLuxAlert({ open: false }), 5000);
  };

  componentDidMount() {
    try {
      this.props.goTop();
    } catch {
      // Ignore errors
    }
  }

  closeVerifectionCode = () => {
    this.setState({ verifyOpen: false });
  };

  showFailAlert = (message, subMessage) => {
    this.setState({
      showFailAlert: true,
      alertMessage: message,
      alertMessage2: subMessage,
    });
    setTimeout(() => this.setState({ showFailAlert: false, alertMessage: '', alertMessage2: '' }), 5000);
  };

  start_verifection = e => {
    e.preventDefault();
    const { mobile, email } = this.state;
    if (!mobile || !email) {
      this.showSuccessAlert('', 'لطفاً شماره موبایل و ایمیل را وارد کنید', 'error');
      return;
    }

    this.toggleLoading();
    fetch('https://alucarddev.ir/digitalAssets/userExistsTest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: mobile, email }), // Include email
    })
      .then(r => r.json())
      .then(data => {
        this.toggleLoading();
        if (data.status === 'DUP') {
          this.showSuccessAlert('', data.message || 'این شماره یا ایمیل در انجمن وجود دارد', 'error');
        } else if (data.status === 'OK') {
          this.setState({ verifyOpen: true });
        } else {
          console.log(data);
          this.showSuccessAlert('', 'مشکلی پیش آمده لطفا چند دقیقه بعد تلاش کنید', 'error');
        }
      })
      .catch(error => {
        this.toggleLoading();
        console.error('Error checking user:', error);
        this.showSuccessAlert('', 'خطا در ارتباط با سرور', 'error');
      });
  };

  setVerCodeAndSubmit = verCode => {
    this.handleCreateUser(verCode);
  };

  handleCreateUser = verCode => {
    const { mobile, email, firstname, lastname, password } = this.state;
    fetch('https://alucarddev.ir/digitalAssets/registerUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobile,
        email, // Include email
        password,
        firstname,
        lastname,
        verCode,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          this.props.history.push('/Login');
          this.showSuccessAlert('حساب جدید ساخته شد', 'انتقال به صفحه ورود');
          this.setState({ verifyOpen: false });
        } else if (data.status === 'DUP') {
          this.showFailAlert('این شماره یا ایمیل در دیتابیس موجود است', 'با شماره یا ایمیل دیگری امتحان کنید');
        } else if (data.status === 'verifection_failed') {
          this.showFailAlert('', 'کد وارد شده صحیح نیست');
        } else {
          this.showFailAlert('', 'خطا در ثبت‌نام');
        }
      })
      .catch(error => {
        console.error('Error creating user:', error);
        this.showFailAlert('', 'خطا در ارتباط با سرور');
      });
  };

  render() {
    const { isVerifyingUserName, verifyOpen, showAlert, showFailAlert, alertMessage, alertMessage2 } = this.state;

    return (
      <div className="col-12 center mt-5">
        {isVerifyingUserName && <FscreenLoadingComponent />}
        <CSSTransition in={verifyOpen} classNames="opac" timeout={400} unmountOnExit>
          <SMSVerifyComponent
            setVerCodeAndSubmit={this.setVerCodeAndSubmit}
            closeVerifectionCode={this.closeVerifectionCode}
            email={this.state.email} // Pass email to SMSVerifyComponent
          />
        </CSSTransition>

        <form
          type="submit"
          className="col-12 center flex-column border position-relative paymentStatsCont p-4 align-items-start justify-content-start flex-column"
          onSubmit={this.start_verifection}
        >
          <div className="col-12 LoginHead">
            <h1 className="">ثبت نام</h1>
          </div>
          <div className="m-3"></div>

          <div className="col-12 center flex-column">
            <TextField
              InputLabelProps={{ required: false }}
              variant="standard"
              required
              onChange={event => this.setState({ mobile: event.target.value })}
              className="dirRtl textAreaForLogIn m-2"
              label="موبایل"
            />
            <TextField
              InputLabelProps={{ required: false }}
              variant="standard"
              required
              type="email"
              onChange={event => this.setState({ email: event.target.value })}
              className="dirRtl textAreaForLogIn m-2"
              label="ایمیل"
            />
            <TextField
              InputLabelProps={{ required: false }}
              variant="standard"
              required
              onChange={event => this.setState({ firstname: event.target.value })}
              className="dirRtl textAreaForLogIn m-2"
              label="نام"
            />
            <TextField
              InputLabelProps={{ required: false }}
              variant="standard"
              required
              onChange={event => this.setState({ lastname: event.target.value })}
              className="dirRtl textAreaForLogIn m-2"
              label="نام خانوادگی"
            />
            <TextField
              type="password"
              InputLabelProps={{ required: false }}
              variant="standard"
              required
              onChange={event => this.setState({ password: event.target.value })}
              className="dirRtl textAreaForLogIn m-2"
              label="کلمه عبور"
            />
            <div className="col-12 mt-5 mb-5 center flex-column">
              <Button variant="contained" type="submit" className="whiteT loginBtn">
                ساخت حساب جدید
              </Button>
              <Button variant="outlined" className="whiteT loginBtn signUpBtn">
                <Link className="col-12 h-100" to="/Login">
                  حساب دارید؟ ورود
                </Link>
              </Button>
            </div>
          </div>
        </form>

        <CSSTransition in={showAlert} classNames="opac" timeout={300} unmountOnExit>
          <div className="col-12 alertCont">
            <Alert severity="success" variant="filled">
              <AlertTitle>موفق</AlertTitle>
              {alertMessage} <strong>— {alertMessage2}</strong>
            </Alert>
          </div>
        </CSSTransition>
        <CSSTransition in={showFailAlert} classNames="opac" timeout={300} unmountOnExit>
          <div className="col-12 alertCont">
            <Alert severity="error" variant="filled">
              <AlertTitle>خطا</AlertTitle>
              {alertMessage} <strong>— {alertMessage2}</strong>
            </Alert>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, dispatch)(SignUp));