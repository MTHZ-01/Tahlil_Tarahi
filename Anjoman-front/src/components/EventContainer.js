import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import Card from './Card'
import { setProdData, setFirstPicData, setSecondPicData, setThirdPicData } from '../redux/actions'
import { Link } from 'react-router-dom'
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material'
import SmallImageRef from './SmallImageRef'
import CategoriesView from './CategoriesView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppsIcon from '@mui/icons-material/Apps';
import { CSSTransition } from 'react-transition-group'
import { InView } from 'react-intersection-observer';
import { Fragment } from 'react'
import { createRef } from 'react'
import CatMobile from './CatMobile'
import AppsSharpIcon from '@mui/icons-material/AppsSharp';


export class EventContainer extends Component {
    constructor() {
        super()

        this.initForImagesRef = new createRef()
    }


    state = {
        isCategorryOpen: false,
        firstImgIsInViewPort: false,
        secondImgIsInView: false,
        thirdImgIsInView: false,
        fourthImgIsInView: false,
    }


    getMainFirstData = () => {
        fetch("https://alucarddev.ir/digitalAssets/getMainMenu_first")
            .then(r => r.json())
            .then(d => this.props.setFirstPicData(d))

    }

    getMainSecData = () => {
        fetch("https://alucarddev.ir/digitalAssets/getMainMenu_Second")
            .then(r => r.json())
            .then(d => this.props.setSecondPicData(d.data))

    }

    getMainThirdData = () => {
        fetch("https://alucarddev.ir/digitalAssets/getMainMenu_Third")
            .then(r => r.json())
            .then(d => this.props.setThirdPicData(d.data))

    }


    handleIntersection = (entries) => {
        const firstImgIsInViewPort = entries[0].isIntersecting;
        this.setState({ firstImgIsInViewPort });


        this.setState({ firstImgIsInViewPort: true })

    }

    componentDidMount() {


        this.getMainFirstData()
        this.getMainSecData()
        this.getMainThirdData()
        fetch("https://alucarddev.ir/digitalAssets/events")
            .then(res => res.json())
            .then(data => {
                {
                    this.props.setProdData(data.EventData)
                    this.revevents = data.EventData.reverse()

                }
            }

            )

    }



    componentWillUnmount() {


    }


    revevents = []
    render() {



        return (
            <Fragment>

                {!this.props.navBarSmallView &&
                    <div className='col-12 center'>
                        {/* <div className={`col-11 center justify-content-start ${this.props.navBarSmallView && ""} divisionIconContainer flex-column`}>
                            <div className='d-flex center flex-row justify-content-start wFit'>
                                <AppsSharpIcon className={`${this.props.navBarSmallView && "m-2"} divisionsSectionTxt`} />
                                <span className='divisionsSectionTxt'>
                                    دسته بندی ها
                                </span>
                            </div>
                            <div className='divisionsSectionLine'></div>
                        </div> */}
                    </div>
                }
                {this.props.navBarSmallView &&
                    <div className={`littleHackForMakingItBlurrySexy categoriesViewCont redT DivisionMarkerMobile ${this.state.categoryExpand && "catExpand glow-on-hover"} categoriesViewContMobile ${this.props.navBarSmallView && ""} position-relative`}>
                        <AppsSharpIcon className={`${this.props.navBarSmallView && "m-2"} divisionsSectionTxt`} />
                        <p>
                            دسته بندی
                        </p>
                    </div>}
                <div className={`center flex-row ${!this.props.navBarSmallView && "EventContainer"} dirLtr ${this.props.navBarSmallView && "noPadding_top "}`}>
                    <div className={`${!this.props.navBarSmallView && "col-11 "} EventDeck d-flex flex-column flex-xl-row  ${this.props.navBarSmallView && ""}  `}>
                        <div className={`col-12 leftSideOfevents dirRtl oxHidd `}>


                            <div className={`col-12 d-flex p-0  m-0 center row `}>
                                {/* 
                            <InView as="div" onChange={(inView, entry) => {
                                this.setState({ firstImgIsInViewPort: inView })
                                console.log(inView)
                            }}>

                                <CSSTransition
                                    in={this.state.firstImgIsInViewPort}
                                    timeout={2000}
                                    classNames="opacLong"

                                >


                                    <div className={`d-flex position-relative center `} >

                                        <div className={`GuiderbuttonCont center  `}>
                                            <div className='center flex-column'>
                                                <p className='h2ForMainContent  fontSm' >زیبا و شکیل</p>
                                                <Button varient="contained" className='Guiderbutton'>تنوعی بی نظیر, طرح و نقشی مثال زدنی!</Button>
                                                <p className='h2ForMainContent  fontSm' >با طراحی لوکس و مجلل</p>
                                            </div>


                                        </div>

                                        <div className={`imageCont center position-relative ${this.props.navBarSmallView && "GuiderbuttonContMobile"}`}>
                                            {this.props.firstItemPic != null &&
                                                <Fragment>
                                                    <Link className="col-12 h-100" to={``}>
                                                        <img src={this.props.firstItemPic} className='imageForProdCont' alt="" />
                                                    </Link>
                                                </Fragment>
                                            }
                                        </div>



                                    </div>
                                </CSSTransition>
                            </InView> */}

                                {/* 
                            <InView className='col-12 center p-0 m-0' onChange={(inView, entry) => {
                                this.setState({ secondImgIsInView: inView })
                                console.log(inView)
                            }}>

                                <Fragment>

                                    <CSSTransition
                                        in={this.state.secondImgIsInView}
                                        timeout={1000}
                                        classNames="left-to-right"

                                    >


                                        <div className='col-12 flex-column flex-xl-row row p-0 m-0 center mt-1 d-flex justify-content-xl-between w_95_p  '>
                                            {this.props.secondImageData != null &&
                                                this.props.secondImageData.map(i =>
                                                    <Button className={`briefView m-0 p-0 ${this.props.navBarSmallView && "mt-2"} prodContImgMobileView`}>
                                                        <img className='col-12 h-100' src={i.imgUrl} />
                                                    </Button>
                                                )
                                            }

                                        </div>

                                    </CSSTransition>
                                </Fragment>

                            </InView> */}




                                <span ref={this.initForImagesRef}></span>
                                <InView className={`${!this.props.navBarSmallView && "col-12 rounded divisionContainer border row center"} d-flex flex-row m-xl-0 p-0 ${this.props.navBarSmallView && "DivisionContainerMobile col-12 mt-3"}`} onChange={(inView, entry) => {
                                    this.setState({ fourthImgIsInView: inView })
                                    // console.log(inView)
                                }}>
                                    <CSSTransition
                                        in={this.state.fourthImgIsInView}
                                        timeout={1000}
                                        classNames="right-to-left"
                                    >

                                        <Fragment>



                                            {this.props.navBarSmallView && <div className={`categoriesViewCont redT DivisionMarkerMobile ${this.state.categoryExpand && "catExpand glow-on-hover"} categoriesViewContMobile ${this.props.navBarSmallView && ""} position-relative`}>

                                            </div>}
                                            {this.props.divDataWithImg != null &&
                                                (this.props.navBarSmallView
                                                    ? this.props.divDataWithImg.map(i =>
                                                        <CatMobile imgUrl={i.imgUrl} name={i.name} key={i.name}></CatMobile>
                                                    )
                                                    : (this.state.isCategorryOpen
                                                        ? this.props.divDataWithImg.map(i =>
                                                            <CategoriesView imgUrl={i.imgUrl} name={i.name} key={i.name}></CategoriesView>
                                                        )
                                                        : this.props.divDataWithImg.slice(0, 6).map(i =>
                                                            <CategoriesView imgUrl={i.imgUrl} name={i.name} key={i.name}></CategoriesView>
                                                        )
                                                    )
                                                )
                                            }


                                            {!this.props.navBarSmallView && !this.state.isCategorryOpen &&
                                                <Button className='redT' onClick={() => this.setState({ isCategorryOpen: true })}>
                                                    <ExpandMoreIcon className="redT"></ExpandMoreIcon>
                                                </Button>
                                            }
                                            {this.state.isCategorryOpen &&
                                                <Button className='redT' onClick={() => {
                                                    this.setState({ isCategorryOpen: false });
                                                    setTimeout(() => this.initForImagesRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
                                                }}>
                                                    <ExpandLessIcon className='redT'></ExpandLessIcon>
                                                </Button>
                                            }
                                        </Fragment>
                                    </CSSTransition>


                                </InView>


                                {/* 
                            <InView onChange={(inView, entry) => {
                                this.setState({ thirdImgIsInView: inView })
                                console.log(inView)
                            }}>

                                <CSSTransition
                                    in={this.state.thirdImgIsInView}
                                    timeout={1000}
                                    classNames="right-to-left"
                                    unmountOnExit
                                >

                                    <div className="col-12 center marginalDiv row p-0">
                                        {this.props.EventData != null &&
                                            this.props.EventData.slice(0, 5).map(i =>

                                                <SmallImageRef imgUrl={i.prodImgUrl[0]} title={i.title}></SmallImageRef>
                                            )
                                        }
                                    </div>
                                </CSSTransition>
                            </InView> */}





                            </div>

                        </div>
                    </div>
                </div >
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        EventData: state.EventData,
        divDataWithImg: state.divDataWithImg,
        navBarSmallView: state.navBarSmallView,
        firstItemPic: state.firstItemPic,
        firstItemDivision: state.firstItemDivision,
        firstItemSubDivision: state.firstItemSubDivision,
        firstItemProd: state.firstItemProd,
        secondImageData: state.secondImageData,
        thirdImageData: state.thirdImageData,
        navBarSmallView: state.navBarSmallView


    }
}

const mapDispatchToProps = {
    setProdData: setProdData,
    setFirstPicData: setFirstPicData,
    setSecondPicData: setSecondPicData,
    setThirdPicData: setThirdPicData
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)
