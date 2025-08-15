import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import EventMobile from '../EventMobile'
import Footer from './Footer'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoriesView from './CategoriesView'
import CatMobile from './CatMobile'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link, withRouter } from 'react-router-dom'


export class Categories extends Component {

    componentDidMount() {
        this.props.goTop()
        if (this.props.match.params.id == "همه") {

            document.title = `${"جستجو در همه رویداد ها"}`
        }
    }
    render() {
        // const { id, subId } = this.props.match.params;
        const subid = this.props.match.params.subid

        const id = this.props.match.params.id
        var specificevents = this.props.EventData.filter(i => i.divisions === this.props.match.params.id)
        console.log(specificevents)




        if (!subid && id === "همه") {
            specificevents = this.props.EventData

        }
        console.log(specificevents)


        if (subid && id == "همه") {
            specificevents = this.props.EventData.filter(i => i.subDivisions == subid)
            // console.log("runs runs runs")

        }
        console.log(specificevents)

        if (subid) {

            // console.log("***************************", subid)
            // console.log("***************************", id)
            specificevents = specificevents.filter(i => i.subDivisions == subid)
        }

        console.log(specificevents)



        const groupedevents = specificevents.reduce((acc, Event) => {
            const subDivision = Event.subDivisions === "None" ? "سایر" : Event.subDivisions;
            if (!acc[subDivision]) {
                acc[subDivision] = [];
            }
            acc[subDivision].push(Event);
            return acc;
        }, {});



        // console.log(!subid)


        return (
            <div className='col-12 center position-relative flex-column align-items-start justify-content-start dirLtr heightAdjustment_categoryCont'>

                <div className={`col-12 center categoryInformation sFix ${this.props.navBarSmallView && "categoryViewMobile"}`}>
                    <div className={`center justify-content-end border-bottom flex-column col-11 col-xl-8 mb-3 paddTopBott backWhite categoryInfo `}>

                        <h2 className='StoreIntroductionForDivision'>انجمن علمی مهندسی کامپیوتر</h2>
                        <h1 className='boldhead'>{this.props.match.params.id}</h1>
                    </div>



                </div>
                {specificevents[0] &&this.props.navBarSmallView &&
                    <div className="col-12 center marginalTopContent ">
                        <div className='categoryCard'>
                            <div className='col-12 border-bottom p-1 '>
                                <h2>نتیجه</h2>
                            </div>
                            {
                                specificevents[0] &&
                                <div className='p-3 col-12  cardItemCont d-flex row center  '><p> <i className='regularSpan'>{specificevents.length}</i> نتیجه برای دسته ی <i className='divisionColoring'>{specificevents[0].divisions}</i> </p></div>
                            }
                        </div>
                    </div>
                }

                {specificevents.length == 0 && <div className='NoProd dirRtl'>رویدادی وجود ندارد.</div>}
                {specificevents.length != 0 &&
                    <div className='ProdInfoParent col-12 center flex-row justify-content-start p-0 align-items-start'>
                        <div className={`col-12 col-xl-12 center marginalTopContent ${!this.props.navBarSmallView && "justify-content-start"} `}>
                            <div className={`border borderRadu52 d-flex row oHidd center ${!this.props.navBarSmallView && "EventContForDivisionView"} col-12`}>
                                {Object.keys(groupedevents).sort((a, b) => a === "سایر" ? 1 : b === "سایر" ? -1 : 0).map(subDivision => (
                                    <React.Fragment key={subDivision}>
                                        <div className='SubDivisor d-flex justify-content-start align-items-center dirRtl'>
                                            {subDivision != "سایر" &&
                                                <Link className={`redT center m-1 LinkForCategory wFit ${this.props.navBarSmallView && "p-0"} p-0`} to={`/category/همه/${subDivision}`}>{subDivision} <ArrowLeftIcon /></Link>
                                            }
                                            {subDivision == "سایر" &&
                                                <Link className={`redT center m-1 LinkForCategory wFit ${this.props.navBarSmallView && "p-0"} p-0`} to={`/category/همه`}>{subDivision} <ArrowLeftIcon /></Link>
                                            }
                                            

                                        </div>
                                        {groupedevents[subDivision].map(Event => (
                                            <div className='widthFit mar-0 padding-0' key={Event.djangoId}>
                                                <EventMobile title={Event.title} price={Event.price} img={Event.imgUrl} data={Event} />
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>











                        <div className='col-3 position-sticky fixing '>

                            {!this.props.navBarSmallView &&
                                <Fragment>

                                    <div className={`col-12 h-100 pl-0 ${!this.props.navBarSmallView && "heightFixForCategories"}`} >
                                        <div className='categoryCard'>
                                            <div className='col-12 border-bottom p-1 '>
                                                <h2>نتیجه</h2>
                                            </div>
                                            <div className='p-3 col-12  cardItemCont d-flex row center  '><p> <i className='regularSpan'>{specificevents.length}</i> نتیجه برای دسته ی <i className='divisionColoring'>{specificevents[0].divisions}</i> </p></div>
                                        </div>
                                    </div>
                                    <div className='false row center m-xl-0 p-0 DivisionContainerMobile col-12 widthFix_Division position-absolute '>
                                        <h3 className='col-12 center mt-3'>دسته بندی های متنوع انجمن</h3>

                                        {this.props.divDataWithImg != null &&
                                            this.props.divDataWithImg.map(i =>
                                                <CatMobile imgUrl={i.imgUrl} name={i.name} ></CatMobile>
                                            )
                                        }
                                    </div>
                                </Fragment>

                            }
                        </div>


                    </div>
                }
            </div>



        )
    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView,
        divDataWithImg: state.divDataWithImg,

    }
}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))