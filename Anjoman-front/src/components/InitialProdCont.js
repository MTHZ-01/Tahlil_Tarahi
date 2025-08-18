import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Event from './Event';
import { Swiper, SwiperSlide } from 'swiper/react';
import EventMobile from '../EventMobile';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';


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
        severity: state.severity



    }
}
class InitialProdCont extends Component {
    render() {

        // return (
        //     <Swiper
        //         effect={''}
        //         grabCursor={true}
        //         centeredSlides={true}
        //         loop={false}
        //         slidesPerView={6}
        //         autoplay={{
        //             delay: 3000, // Delay between slides in milliseconds (adjust as needed)
        //             disableOnInteraction: false, // Keep autoplay running even after user interaction
        //         }}
        //         coverflowEffect={{
        //             rotate: 0,
        //             stretch: 0,
        //             depth: 200,
        //             modifier: 1.7,
        //         }}
        //         pagination={{ el: '.swiper-pagination', clickable: true }}
        //         navigation={{
        //             nextEl: '.swiper-button-next',
        //             prevEl: '.swiper-button-prev',
        //             clickable: true,
        //         }}
        //         modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        //         className="swiper_container Slide"
        //     >
        //         {this.props.sliderData &&
        //             this.props.sliderData.map(i =>

        //                 <SwiperSlide className='center Slide'>

        //                             <Event title={i.title} price={i.price} img={i.imgUrl} data={i} />

        //                 </SwiperSlide>

        //             )
        //         }



        //     </Swiper>

        // )


        // Mobile view:
        if (this.props.navBarSmallView) {
            return (
                <Fragment>
                    <div className='col-12 center'>

                    </div>
                    <div className={`col-12 center ${this.props.navBarSmallView && "initProdContMobile "}`}>
                        <div className={`col-12 ${this.props.navBarSmallView && "noMargin border"} InitialProdCont`}>
                            <Swiper className='Topswiper'

                                // autoplay={{
                                //     delay: 5000, // Delay between slides in milliseconds (adjust as needed)
                                //     disableOnInteraction: false, // Keep autoplay running even after user interaction
                                //     reverseDirection: true,
                                // }}
                                grabCursor={true}
                                centeredSlides={false}
                                loop={false}
                                slidesPerView={2}

                                // pagination={{ el: '.swiper-pagination', clickable: true }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                                modules={[Navigation]}
                            >
                                <SwiperSlide>


                                </SwiperSlide>
                                {this.props.EventData &&


                                    this.props.EventData.filter(i => i.isFantastic ).map(i =>
                                        <SwiperSlide>

                                            <EventMobile title={i.title} price={i.price} img={i.imgUrl} data={i} />

                                        </SwiperSlide>
                                    )}


                                <div className="slider-controler">
                                    <div className="swiper-button-prev center pervBtnSwiper2 ">
                                        {/* <ChevronLeftIcon /> */}
                                    </div>
                                    <div className="swiper-button-next center nxtBtnSwiper2">
                                        {/* <ChevronRightIcon /> */}
                                    </div>
                                </div>

                            </Swiper>

                        </div>
                    </div>


                </Fragment>

            );
        }


        return (
            <Fragment>



            </Fragment>

        );
    }
}

export default connect(
    mapStateToProps,
)(InitialProdCont);