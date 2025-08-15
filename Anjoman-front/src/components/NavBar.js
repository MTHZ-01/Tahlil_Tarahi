import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  setLuxAlert,
  setNavMenuState,
  setSearchData,
  setLogInStatus,
  setAuthStatusOpen,
  reduxualBarClose,
  reduxualBarOpen
} from '../redux/actions';
import { Cookies } from 'react-cookie';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchBarComponent from './searchBarComponent';
import GoToTopComponent from './GoToTopComponent';
import Logo from '../assets/Anj.jpg';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.c = new Cookies();
    this.state = {
      menuOpen: false,
      showAlert: false,
      alertMessage: '',
      alertMessage2: '',
      // local viewport-based mobile flag (used to show/hide bottom nav)
      isMobile: (typeof window !== 'undefined') ? window.innerWidth < 768 : false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    // preserve original scroll listener behavior (if appRef provided) — do not remove
    try {
      if (this.props.appRef && this.props.appRef.current) {
        this.props.appRef.current.addEventListener('scroll', this.handleScroll);
      } else if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handleScroll);
      }
    } catch (e) { /* noop */ }

    // add resize listener to toggle mobile / desktop UI locally
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      // ensure initial flag correct (in case SSR -> hydration)
      this.setState({ isMobile: window.innerWidth < 768 });
    }
  }

  componentWillUnmount() {
    try {
      if (this.props.appRef && this.props.appRef.current) {
        this.props.appRef.current.removeEventListener('scroll', this.handleScroll);
      } else if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', this.handleScroll);
      }
    } catch (e) { /* noop */ }

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize() {
    if (typeof window === 'undefined') return;
    const isMobileNow = window.innerWidth < 768;
    if (isMobileNow !== this.state.isMobile) {
      this.setState({ isMobile: isMobileNow });
    }
  }

  handleScroll(e) {
    // intentionally minimal (keeps compatibility with earlier code)
  }

  showSuccessAlert(message, subMessage = '', severity = 'success') {
    if (this.props.setLuxAlert) {
      this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity });
      setTimeout(() => this.props.setLuxAlert({ open: false }), 5000);
    } else {
      this.setState({ showAlert: true, alertMessage: message, alertMessage2: subMessage });
      setTimeout(() => this.setState({ showAlert: false }), 5000);
    }
  }

  handleLogOut = () => {
    fetch('https://alucarddev.ir/digitalAssets/LogOut')
      .then(res => res.json())
      .then(() => this.props.setLogInStatus?.(false))
      .then(() => this.c.remove('sessionId'))
      .then(() => this.showSuccessAlert('شما از سیستم خارج شدید'))
      .catch(() => this.showSuccessAlert('خطا در خروج', '', 'error'));
  }

  hanleAuthStatus = () => this.props.setAuthStatusOpen?.(!this.props.isAuthOpen);
  resetDTitle = () => { document.title = 'انجمن علمی مهندسی کامپیوتر'; }
  handleLogoClick = () => { this.props.goTop?.(); this.resetDTitle(); }
  gotTo_Abouts = () => this.props.aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
  toggleMenu = () => this.setState(prev => ({ menuOpen: !prev.menuOpen }));

  render() {
    const { menuOpen, showAlert, alertMessage, alertMessage2, isMobile } = this.state;
    const { navMenoOpen, navBarSmallView, isLoggedIn } = this.props;

    // We use local isMobile to control mobile-only rendering (so bottom nav won't always appear)
    return (
      <Fragment>
        <header className="nav-shell">
          <div className="nav-inner">
            <div className="nav-left">
              <Link to="/" onClick={this.handleLogoClick} className="nav-logo" aria-label="خانه">
                <span className="nav-brand">
                  <Link to="/" className=""><img src={Logo} className='anjomanLogoSm' /></Link>
                  انجمن علمی مهندسی کامپیوتر

                </span>
              </Link>
            </div>

            <div className="nav-center">
              <SearchBarComponent />
            </div>

            <div className="nav-right">
              <div className="nav-actions">
                {!isLoggedIn ? (
                  <Link to="/Login" className="btn-link">ورود</Link>
                ) : (
                  <button className="action-icon buttonEffectKill" onClick={this.hanleAuthStatus} aria-label="پروفایل">
                    <AccountCircleOutlinedIcon />
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* TOP secondary nav: render only when NOT mobile */}
          {!isMobile && (
            <nav className="nav-secondary d-flex flex-row justify-content-around">
              <Link to="/" className="nav-link-small">خانه</Link>
              <button className="nav-link-small buttonEffectKill" onClick={this.gotTo_Abouts}>درباره پروژه</button>
            </nav>
          )}
        </header>

        {/* MOBILE bottom bar: render only on mobile */}
        {isMobile && (
          <div className="mobile-bottom">
            <Link to="/" className="mobile-btn">خانه</Link>
            {!isLoggedIn ? (
              <Link to="/Login" className="mobile-btn">حساب</Link>
            ) : (
              <button onClick={this.hanleAuthStatus} className="mobile-btn buttonEffectKill">پروفایل</button>
            )}
          </div>
        )}

        {showAlert && (
          <div className="nav-alert">
            <Alert severity="success" variant="filled">
              <AlertTitle>موفق</AlertTitle>
              {alertMessage} <strong>— {alertMessage2}</strong>
            </Alert>
          </div>
        )}

        <CSSTransition in={navMenoOpen} classNames="opac" timeout={300} unmountOnExit>
          <GoToTopComponent goTop={this.props.goTop} />
        </CSSTransition>

        {/* mobile slideout menu: only active on mobile */}
        <CSSTransition in={menuOpen && isMobile} classNames="opac" timeout={300} unmountOnExit>
          <div className="mobile-menu">
            <div className="mobile-menu-inner">
              <Link to="/" className="mobile-menu-item" onClick={this.toggleMenu}>خانه</Link>
              <button className="mobile-menu-item" onClick={() => { this.toggleMenu(); this.gotTo_Abouts(); }}>درباره ما</button>
              {!isLoggedIn && <Link to="/Login" className="mobile-menu-item" onClick={this.toggleMenu}>ورود / ثبت‌نام</Link>}
              {isLoggedIn && <button className="mobile-menu-item buttonEffectKill" onClick={() => { this.toggleMenu(); this.hanleAuthStatus(); }}>پروفایل</button>}
            </div>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  navMenoOpen: state.navMenoOpen,
  searchResults: state.searchResults,
  navBarSmallView: state.navBarSmallView,
  navMenoExtended: state.navMenoExtended,
  isLoggedIn: state.isLoggedIn,
  isAuthOpen: state.isAuthOpen,
});

const mapDispatchToProps = {
  setNavMenuState, setSearchData, setLogInStatus, setAuthStatusOpen, reduxualBarOpen, reduxualBarClose, setLuxAlert
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
