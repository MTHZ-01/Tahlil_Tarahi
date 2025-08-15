import WhatshotIcon from '@mui/icons-material/Whatshot';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import RouteIcon from '@mui/icons-material/Route';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArticleInfo from './components/ArticleInfo';
import ArticleComponent from "./components/ArticleComponent";
import SubCategoryComponent from "./components/SubCategoryComponent";
import NavBar from "./components/NavBar"
import NewsSlider from "./components/NewsSlider";
import PhotoSlider from "./components/PhotoSlider";
import ItemBox from "./components/ItemBox";
import GifBox from "./components/GifBox";
import Footer from "./components/Footer";
import NavItemCont from "./components/NavItemCont";
import SpecialEvents from "./components/SpecialEvents";
import EventInfo from "./components/EventInfo";
import Section from "./components/Section";
import Categories from "./components/Categories";
import ShoppingCart from "./components/ShoppingCart";
import ShoppingBix from "./components/ShoppingBix";
import PaymentHandler from "./components/PaymentHandler";
import { setArticles, setLuxAlert, setNavMenuState, setProdData, setDivisionData, setSliderData, cookieToBasket, setSearchData, setDivDataWithImg, setNavSmallView, setLogInStatus, setAuthStatusOpen, reduxualBarOpen } from "./redux/actions";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AcoountManager from "./components/AcoountManager";
import EventContainer from "./components/EventContainer";
import CardContainer from "./components/CardContainer";
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';
import { Fragment } from "react";
import { Cookies } from "react-cookie";
import FscreenLoadingComponent from "./components/FscreenLoadingComponent";
import AuthStatus from "./components/AuthStatus";
import { Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css'
import SearchComponent from "./components/SearchComponent";
import { CSSTransition } from "react-transition-group";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LoadingComponent from "./components/LoadingComponent";
import InitialProdCont from "./components/InitialProdCont";
import "./Swiper.css"
import "./media.css"
import "./App.css"
import EventMobile from "./EventMobile";
import MobileNavigator from "./components/MobileNavigator";
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import LuxeryAlert from "./LuxeryAlert";
import NewsList from './components/NewsList.jsx';
import NewsDetail from './components/NewsDetail.jsx';

export class App extends Component {
  constructor() {
    super()
    this.appRef = React.createRef()
    this.initSpanRef = React.createRef()
    this.amazingsRef = React.createRef()
    this.EventsRef = React.createRef()
    this.aboutRef = React.createRef()
    this.footerRef = React.createRef()
    this.cookies = new Cookies()
  }



  state = {
    authStatusOpen: false,

    subDivData: null
  }






  scrollHandler = () => {

    if (Number(this.appRef.current.scrollTop) < 10 && this.props.navMenoOpen) {

      this.props.setNavMenuState(false)
      return
    }


    if (Number(this.appRef.current.scrollTop) > 10 && !this.props.navMenoOpen) {

      this.props.setNavMenuState(true)
      return
    }
  }
  gotTo_amazings = () => {
    if (this.amazingsRef.current) {

      this.amazingsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  gotTo_Divisions = () => {
    if (this.prodContRef.current) {

      this.prodContRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  gotTo_Events = () => {
    if (this.EventsRef.current) {

      this.EventsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  gotTo_Abouts = () => {
    if (this.aboutRef.current) {

      this.props.aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  gotTo_Footer = () => {
    if (this.footerRef.current) {

      this.footerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }



  goTop = () => {
    // this.appRef.current.scrollTop = 0
    // window.scrollTo(this.initSpanRef)
    this.initSpanRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  handleResize = () => {
    // console.log(window.innerWidth)
    if (window.innerWidth < 1200) {
      // console.log("happening")
      this.props.setNavSmallView(true)
      return
    }
    this.props.setNavSmallView(false)

  }

  getArticles = () => {
    fetch("https://alucarddev.ir/digitalAssets/getArticles")
      .then(r => r.json())
      .then(d => {
        this.props.setArticles(d.items)
        // console.log("Articles Articles Articles Articles ", d)
      }
      )

  }

  getSubDivisions = () => {
    fetch("https://alucarddev.ir/digitalAssets/getSubDivisions")
      .then(r => r.json())
      .then(d => {
        this.setState({ subDivData: d.data })
        // console.log("subCat subCat subCat subCat subCat subCat subCat subCat subCat subCat ", d)
      }
      )
  }


  componentDidMount() {

    this.getArticles()
    const initCookie = this.cookies.get("initCookie")

    if (!initCookie) {
      this.props.setLuxAlert({ open: true, severity: "enamad", title: "سلام", content: "تستی" })
      this.cookies.set("initCookie", "Initialized", { path: "/" })
    }
    // fetch("https://alucarddev.ir/digitalAssets/slider")
    //   .then(res => res.json())
    //   .then(data => this.props.setSliderData(data.data.reverse()))



    try {
      const c = this.cookies.get("sessionId")
      // console.log("sessionId", c)

      if (typeof c !== "undefined") {

        // console.log("succerRuns", c)
        this.props.setLogInStatus(true)

      } else {
        this.props.setLogInStatus(false)

      }

    } catch {
      this.props.setLogInStatus(false)
    }


    this.handleResize()
    window.addEventListener("resize", this.handleResize)





    var raw = JSON.stringify({
      "data": "sadlad"
    });

    var requestOptions = {
      method: 'POST',

      body: raw,

    };



    try {

      console.log(JSON.stringify({ cookieVal: this.cookies.get("buyBasketId") }))
      fetch("https://alucarddev.ir/digitalAssets/getServerCookie", {
        method: "POST",
        body: JSON.stringify({ id: this.cookies.get("buyBasketId") })


      })

        .then(r => r.json())
        .then(d => {

          try {

            // var buyBasket = JSON.parse(d.data)


            // console.log("buyBasket!!!! buyBasket!!!! buyBasket!!!! buyBasket!!!! buyBasket!!!!", d)



          }
          catch (error) {
            console.log("No cookie found!", error)
          }


        })



    } catch (error) {
      console.log(error)
    }

    this.goTop()



    // .then(setInterval(this.goRight, 2000))


    fetch("https://alucarddev.ir/digitalAssets/events")
      .then(res => res.json())
      .then(data => {
        {
          this.props.setProdData(data.EventData)

        }
      }

      )
    fetch("https://alucarddev.ir/digitalAssets/divisions")
      .then(res => res.json())
      .then(data => {
        {
          this.props.setDivisionData(data.data)
          // console.log("ddddddddd", data.data)
        }
      }
      )

    fetch("https://alucarddev.ir/digitalAssets/divisionsImg")
      .then(res => res.json())
      .then(data => {
        {
          this.props.setDivDataWithImg(data.data)
          // console.log("ddddddddd", data.data)
        }
      }
      )
    this.getSubDivisions()

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)

  }


  goRight = () => {
    // console.log("!!!!!!!!!!!!!!!", this.props.sliderData)
    var arr = this.props.sliderData
    var initItem = arr[0]
    var first = arr.slice(1, ((arr.length) / 2) + 1)
    var second = arr.slice(arr.length - ((arr.length - 1) / 2))

    first.splice(0, 0, initItem)
    second.splice(second.length, 0, first.pop())
    initItem = second.shift()

    arr = [...[initItem], ...first, ...second]

    this.props.setSliderData(null)
    this.props.setSliderData(arr)


  }


  handleAuthStatus = () => {
    this.props.setAuthStatusOpen(!this.props.isAuthOpen)
  }

  prodContRef = React.createRef()

  render() {


    return (

      <Fragment>

        <LuxeryAlert />
        <div className="app" onClick={() => this.props.setSearchData(null)} ref={this.appRef} onScroll={this.scrollHandler}>
          <span ref={this.initSpanRef}></span>
          <BrowserRouter>
            <SearchComponent />
            <Router>


              <CSSTransition
                in={this.props.isAuthOpen}
                classNames="opac"
                timeout={400}
                unmountOnExit
              >


                <AuthStatus></AuthStatus>

              </CSSTransition>




              <NavBar aboutRef={this.aboutRef} prodContRef={this.prodContRef} appRef={this.appRef} goTop={this.goTop} />

              {/* <NewsSlider /> */}
              {!this.props.navBarSmallView &&
                <Fragment>



                </Fragment>
              }





              <CSSTransition
                in={this.props.reduxualMessageBarOpen}
                classNames="opac"
                timeout={300}
                unmountOnExit
              >

                <div className="col-12 center ">
                  <div className="col-12 alertCont center">

                    <Alert severity={this.props.severity} >

                      {this.props.reduxualMessageBar1}  <strong>— {this.props.reduxualMessageBar2}</strong>
                    </Alert>
                  </div>
                </div>

              </CSSTransition>

              <Route exact path="/ShoppingCart">

                <ShoppingCart goTop={this.goTop} ></ShoppingCart>

              </Route>

              <Route path="/news/:id"  >
                <NewsDetail goTop={this.goTop} />
              </Route>
              {/* <Route exact path="/news" component={} /> */}
              <Route exact path="/">



                {!this.props.navBarSmallView &&
                  <Fragment>

                    {/* <InitialProdCont EventData={this.props.EventData} /> */}
                    <PhotoSlider></ PhotoSlider>
                    <div className="dirLtr col-12 row d-flex m-0 p-0  center mt-3">

                      <NewsList goTop={this.goTop} />
                    </div>
                    <EventContainer ></EventContainer>
                    <span ref={this.prodContRef}></span>
                  </Fragment>
                }
                {this.props.navBarSmallView &&
                  <Fragment>
                    <PhotoSlider></ PhotoSlider>
                    <div className="dirLtr col-12 row d-flex m-0 p-0  center mt-3">

                      <NewsList goTop={this.goTop} />
                    </div>

                    <MobileNavigator footerRef={this.footerRef} aboutRef={this.aboutRef} EventsRef={this.EventsRef} prodContRef={this.prodContRef} amazingsRef={this.amazingsRef} />
                    <EventContainer ></EventContainer>
                    <span ref={this.amazingsRef}></span>
                    {/* <InitialProdCont EventData={this.props.EventData} /> */}
                    <span ref={this.prodContRef}></span>
                  </Fragment>
                }
                <div className={`${!this.props.navBarSmallView && " center"}  over_x_scroll mt-1 ${this.props.navBarSmallView && "d-flex justify-content-start align-items-start over_x_scroll mt-1"}`}>
                  {this.state.subDivData != null &&

                    this.state.subDivData.map(i => <SubCategoryComponent title={i.title} imageUrl={i.imageUrl} />)

                  }
                </div>



                {/* <div className="col-12 p-5 center">

                <button class='glowing-btn'><span class='glowing-txt'>ک<span class='faulty-letter'>ل</span>یک</span></button>
              </div>
 */}




                <div className="col-12 center contOfsectionContainer">


                  <div className={`col-12 col-xxl-12 sectionContainer   ${this.props.navBarSmallView && "sectionContainerMobile"}`}>

                    <span ref={this.EventsRef}></span>
                    <div className='col-12 center'>

                      <div className='col-11 center   divisionIconContainer flex-column '>

                        <div className='center flex-row '>
                          <CategorySharpIcon className='m-2 eventsSectionTxt' />
                          <span className='eventsSectionTxt'>
                            روردیداد ها
                          </span >
                        </div>
                        <div className='eventsSectionLine'></div>
                      </div>
                    </div>

                    <div className="dirLtr col-12 row d-flex m-0 p-0  center mt-3">

                      {

                        this.props.divDataWithImg != null && this.props.EventData != null &&
                        this.props.divDataWithImg.map(i =>

                          <Section divisionData={i} EventData={this.props.EventData} ></Section>

                        )
                      }


                    </div>
                  </div>
                </div>

                <span ref={this.aboutRef}></span>
                {/* <CardContainer></CardContainer> */}
                {/* <ItemBox></ItemBox> */}
                <div className={`${this.props.navBarSmallView && "d-flex justify-content-start align-items-start over_x_scroll"} ${!this.props.navBarSmallView && "articleContainer center"}  `}>
                  {this.props.articleData &&
                    this.props.articleData.map(i =>
                      <ArticleComponent header={i.title} article={i.article} date={i.date} imageUrl={i.imageUrl} />
                    )
                  }

                </div>

              </Route>

              <Route exact path={`/Events/:id`}   >
                {this.props.EventData == null &&
                  <FscreenLoadingComponent></FscreenLoadingComponent>
                }

                {this.props.EventData != null &&
                  <EventInfo goTop={this.goTop}></EventInfo>
                }



              </Route>

              <Route exact path={`/category/:id?/:subid?`}   >

                {this.props.EventData == null && this.props.divisionData != null &&
                  <FscreenLoadingComponent></FscreenLoadingComponent>
                }
                {this.props.EventData != null && this.props.divisionData != null &&
                  <Categories goTop={this.goTop} EventData={this.props.EventData} divisionData={this.props.divisionData} ></Categories>
                }


              </Route>



              <Route exact path="/paymentSuccess">

                <div className="col-12 p-0 p-xl-5  center  ">

                  <div className="col-12 center flex-column  border position-relative paymentStatsCont">
                    <div className="col-12  border h1ForPaymentSuccess">
                      <h1 className="">پرداخت موفق</h1>
                    </div>

                    <div className="col-10">
                      <p>کاربر گرامی پرداخت شما موفق بود. شما می توانید سفارش خود را از لینک زیر پیگیری نمایید</p>
                    </div>

                    <div className="col-12 center flex-column  getOrderInfoBtnWrapper">
                      <Button varient="contained" className="col-10 getOrderInfoBtn" onClick={this.handleAuthStatus}>پیگیری سفارش</Button>
                      <Button varient="contained" className="col-10 getOrderInfoBtn getBackStyle center"><Link className="col-12 h-100 whiteT" to="/"> بازگشت به صفحه اصلی  </Link></Button>
                    </div>
                  </div>




                </div>

              </Route>


              <Route path="/callBack/:status?/:verifectionCode?">
                <PaymentHandler />
              </Route>


              <Route exact path="/account">
                <AcoountManager></AcoountManager>
              </Route>

              <Route exact path="/SignUp">
                <SignUp goTop={this.goTop}></SignUp>
              </Route>


              <Route exact path="/login">
                <Login goTop={this.goTop} ></Login>
              </Route>




              <Route path="/404">
                <div className="m-5">
                  <h1>
                    404- صفحه ای سرچ کردید وجود ندارد
                  </h1>


                </div>
              </Route>

              <Route path="/articles/:header?">
                {this.props.articleData &&
                  <ArticleInfo goTop={this.goTop} />
                }
              </Route>

              {/* <SpecialEvents></SpecialEvents> */}

              <Footer goTop={this.goTop}></Footer>

            </Router>
          </BrowserRouter>
          <span ref={this.footerRef}></span>
        </div>

      </Fragment >

    )
  }
}

const mapStateToProps = (state) => {
  return {
    navMenoOpen: state.navMenoOpen,
    EventData: state.EventData,
    divisionData: state.divisionData,
    sliderData: state.sliderData,
    divDataWithImg: state.divDataWithImg,
    navBarSmallView: state.navBarSmallView,
    authStatus: state.authStatus,
    isLoggedIn: state.isLoggedIn,
    isAuthOpen: state.isAuthOpen,
    reduxualMessageBarOpen: state.reduxualMessageBarOpen,
    reduxualMessageBar1: state.reduxualMessageBar1,
    reduxualMessageBar2: state.reduxualMessageBar2,
    severity: state.severity,
    luxOpen: state.luxOpen,
    luxTitle: state.luxTitle,
    luxContent: state.luxContent,
    articleData: state.articleData




  }
}

const mapDispatchToProps = {
  setNavMenuState: setNavMenuState,
  setProdData: setProdData,
  setDivisionData: setDivisionData,
  setSliderData: setSliderData,
  cookieToBasket: cookieToBasket,
  setDivDataWithImg: setDivDataWithImg,
  setNavSmallView: setNavSmallView,
  setLogInStatus: setLogInStatus,
  setAuthStatusOpen: setAuthStatusOpen,
  setAuthStatusOpen: setAuthStatusOpen,
  setSearchData: setSearchData,
  reduxualBarOpen: reduxualBarOpen,
  setLuxAlert: setLuxAlert,
  setArticles: setArticles



}

export default connect(mapStateToProps, mapDispatchToProps)(App)






