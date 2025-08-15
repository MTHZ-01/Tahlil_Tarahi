import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Logo from '../assets/Anj.jpg';
import { Link } from 'react-router-dom'
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { NearbyOffOutlined } from '@mui/icons-material';
import { setDivDataWithImg } from '../redux/actions';
import RouteIcon from '@mui/icons-material/Route';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CSSTransition } from 'react-transition-group';
import SpecialEvents from './SpecialEvents';
import { InView } from 'react-intersection-observer';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerifiedIcon from '@mui/icons-material/Verified';
import Groups2Icon from '@mui/icons-material/Groups2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
export class Footer extends Component {

    state = {
        address: null,
        accessData: null,
        divData: null,
        subDivData: null,
        divisionsOpen: false,
        eventsOpen: false,
        subDivsOpen: false,
        isInView: false,

    }

    getAddressInfo = () => {
        fetch("https://alucarddev.ir/webInfo/address")
            .then(r => r.json())
            .then(d => this.setState({ address: d.data }))
    }
    getAccessData = () => {
        fetch("https://alucarddev.ir/webInfo/getAccessData")
            .then(r => r.json())
            .then(d => this.setState({ accessData: d.data }))
    }


    getSubDivisions = () => {
        fetch("https://alucarddev.ir/digitalAssets/getSubDivisions")
            .then(r => r.json())
            .then(d =>
                this.setState({ subDivData: d.data })
            )
    }

    componentDidMount() {
        this.getAddressInfo()
        this.getAccessData()
        this.getSubDivisions()

        fetch("https://alucarddev.ir/digitalAssets/divisionsImg")
            .then(res => res.json())
            .then(data =>
                this.setState({ divData: data.data })
            )


    }

    render() {
        return (
            <div className='col-12 center d-flex justify-content-start row m-0 footerCont'>
                <footer className={`d-flex border-top col-12 row punchIn ${!this.props.navBarSmallView && "noPadding"} p-0 pt-5`}>
                    <SpecialEvents />
                    <div className="col-12 bg-white footerHeadItemWrapper">

                        <div className='col-12 center'>

                            <div className='col-12 col-xl-10 center justify-content-between footerTopParent'>

                                <div className={`col-6 d-flex flex-row p-0 p-xl-3 pb-0 ${this.props.navBarSmallView && "center"}`}>
                                    <Link to="/" className="logoCont"><img src={Logo} className='mahoorLogo' /></Link>
                                </div>

                                <button onClick={this.props.goTop} className=" border round goTopBtn"> ابتدای سایت <ArrowDropUpIcon></ArrowDropUpIcon></button>

                            </div>
                        </div>
                        <div className='col-12 center'>

                            <div className={`col-11  d-flex flex-row  ${this.props.navBarSmallView && "center m-0 col-12"}`}>
                                <p className='phoneNumCont'>
                                    05137240726
                                </p>
                                <p className='phoneNumContV2'>شماره تماس فروشگاه</p>
                            </div>
                        </div>
                    </div>




                    <div className='col-12 center pt-5  p-2 p-xl-5'>

                        <div className='col-12 col-xl-8 center justify-content-around row'>

                            <div className='d-flex flex-column center wid-fit widthFix_navElem'>
                                <AutoAwesomeIcon className='IconImg' />
                                <h6 className='m-2 justBold  text-dark'>دانش افروزی</h6>
                            </div>
                            <div className='d-flex flex-column center widthFix_navElem'>
                                <VerifiedIcon className='IconImg' />
                                <h6 className='m-2 justBold  text-dark'>تحصیلات</h6>
                            </div>
                            <div className='d-flex flex-column center widthFix_navElem'>
                                <Groups2Icon className='IconImg' />
                                <h6 className='m-2 justBold  text-dark'>توسعه ارتباطات</h6>
                            </div>



                        </div>

                    </div>

                    <div className="col-12 center">

                        <div className='col-12 col-xl-8 center flex-column flex-md-row justify-content-md-around align-items-md-start'>

                            <div className='footerSectorCont'>
                                <p className='FooterTitle '>دسته بندی ها</p>
                                <div className='col-12 pt-3'>

                                    {this.state.divData != null &&
                                        this.state.divData.slice(0, 5).map(i =>
                                            <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link to={`/category/${i.name}`}   className="col-12 h-100 whiteT"> {i.name} </Link><i className='fa fa-chevron-left'> </i></button>

                                        )
                                    }






                                    {this.state.divData != null && this.state.divData.length >= 5 && this.state.divisionsOpen &&
                                        this.state.divData.slice(5).map(i =>

                                            <CSSTransition
                                                in={this.state.divisionsOpen}
                                                classNames="left-to-right"
                                                timeout={300}
                                                unmountOnExit
                                            >
                                                <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link to={`/category/${i.name}`}   className="col-12 h-100 whiteT"> {i.name} </Link><i className='fa fa-chevron-left'> </i></button>
                                            </CSSTransition>

                                        )
                                    }

                                    {this.state.divData != null && !this.state.divisionsOpen && this.state.divData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ divisionsOpen: true })}><ExpandMoreIcon /></Button>
                                    }
                                    {this.state.divData != null && this.state.divisionsOpen && this.state.divData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ divisionsOpen: false })}><KeyboardArrowUpIcon /></Button>
                                    }
                                </div>
                            </div>

                            <div className='footerSectorCont'>
                                <p className='FooterTitle '>زیر دسته ها</p>
                                <div className='col-12 pt-3'>
                                    {this.state.subDivData != null &&
                                        this.state.subDivData.slice(0, 5).map(i =>

                                            <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link className="col-12 h-100 whiteT" to={`/category/همه/${i.title}`}   > {i.title} </Link> <i className='fa fa-chevron-left'> </i></button>
                                        )
                                    }
                                    {this.state.subDivData != null && this.state.subDivData >= 5 && this.state.subDivData &&
                                        this.state.subDivData.slice(5).map(i =>

                                            <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link className="col-12 h-100 whiteT" to={`/category/همه/${i.title}`}   > {i.title} </Link> <i className='fa fa-chevron-left'> </i></button>
                                        )
                                    }
                                    {this.state.subDivData != null && !this.state.subDivsOpen && this.state.subDivData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ subDivsOpen: true })}><ExpandMoreIcon /></Button>
                                    }
                                    {this.state.subDivData != null && this.state.subDivsOpen && this.state.subDivData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ subDivsOpen: false })}><KeyboardArrowUpIcon /></Button>
                                    }
                                </div>

                            </div>

                            <div className='footerSectorCont'>
                                <p className='FooterTitle '>رویداد ها</p>
                                <div className='col-12 pt-3'>
                                    {this.props.EventData != null &&
                                        this.props.EventData.slice(0, 5).map(i =>
                                            <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link to={`/Events/${i.title}`} className="col-12 h-100 whiteT"> {i.title}</Link> <i className='fa fa-chevron-left'> </i></button>
                                        )
                                    }
                                    {this.props.EventData != null && this.props.EventData.length >= 5 && this.state.eventsOpen &&
                                        this.props.EventData.slice(0, 5).map(i =>
                                            <button className='eventsHeading footerBtnExt eventsHeadignV2'><Link to={`/Events/${i.title}`} className="col-12 h-100 whiteT"> {i.title}</Link> <i className='fa fa-chevron-left'> </i></button>
                                        )
                                    }
                                    {this.props.EventData != null && !this.state.eventsOpen && this.props.EventData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ eventsOpen: true })}><ExpandMoreIcon /></Button>
                                    }
                                    {this.props.EventData != null && this.state.eventsOpen && this.props.EventData.length >= 5 &&
                                        <Button className='redT wFull' onClick={() => this.setState({ eventsOpen: false })}><KeyboardArrowUpIcon /></Button>
                                    }

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-12 center d-flex row p-5 justify-content-around m-0">

                        <InView className={`footerAddressCont center ${this.props.navBarSmallView && "mt-4"}`} onChange={(inView, entry) => {
                            this.setState({ isInView: inView })
                            // console.log(inView)
                        }}>
                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >


                                <div className='col-12 footerSectHead'><p><RouteIcon className='delBtn redT m-0' /> آدرس: </p></div>
                            </CSSTransition>

                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >

                                <div className='footerTextCont col-8'>
                                    <p>{this.state.address != null && `${this.state.address}`}</p>
                                </div>

                            </CSSTransition>

                        </InView>
                        <InView className={`footerAddressCont center ${this.props.navBarSmallView && "mt-4"}`} onChange={(inView, entry) => {
                            this.setState({ isInView: inView })
                            // console.log(inView)
                        }}>
                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >
                                <div className='col-12 footerSectHead'><p><ConnectWithoutContactIcon className='delBtn redT m-0' /> تماس با ما:  </p></div>
                            </CSSTransition>

                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >
                                <div className='footerTextCont col-8 social'>
                                    <div className='col-12 d-flex flex-row'>

                                        {/* <Link className=""><TelegramIcon className='socialInfo'></TelegramIcon></Link> */}
                                        {/* <Link className=""><InstagramIcon className='socialInfo'></InstagramIcon></Link> */}
                                    </div>
                                    {
                                        this.state.accessData != null &&
                                        this.state.accessData.map(i =>

                                            <div className="col-12 center justify-content-start"><p className=''> {i.title}: {i.value}</p> </div>
                                        )
                                    }

                                </div>
                            </CSSTransition>


                        </InView>
                        {/* <InView className={`footerAddressCont center ${this.props.navBarSmallView && "mt-4"}`} onChange={(inView, entry) => {
                            this.setState({ isInView: inView })
                            // console.log(inView)
                        }}>

                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >
                                <div className='col-12 footerSectHead'><p><VerifiedUserIcon className='delBtn redT m-0' /> مجوز ها: </p></div>
                            </CSSTransition>

                            <CSSTransition
                                in={this.state.isInView}
                                classNames="left-to-right"
                                timeout={1000}
                                unmountOnExit
                            >
                                <div className='footerTextCont col-8 center'>


                                    <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=419706&Code=eeB96b9B0ABf960018af47475c992A92'><img className='enamadStyling' referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=419706&Code=eeB96b9B0ABf960018af47475c992A92' alt='' Code='eeB96b9B0ABf960018af47475c992A92' /></a>


                                </div>
                            </CSSTransition>

                        </InView> */}


                    </div>


                    <div className={`footerEnd ${this.props.navBarSmallView && "copyrightBackgroundSolutionForMobile"}`}><p>copyright © 1402 تمامی حقوق محفوظ است</p></div>
                </footer >
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView,
        divDataWithImg: state.divDataWithImg,
        EventData: state.EventData,
        subDivData: state.subDivData

    }
}

const mapDispatchToProps = {
    setDivDataWithImg: setDivDataWithImg
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)