import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setSliderData } from '../redux/actions'
import { Link, withRouter } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';



export class PhotoSlider extends Component {

  state = {
    sliderData: null
  }
  componentDidMount() {



    fetch("https://alucarddev.ir/digitalAssets/slider")
      .then(res => res.json())
      .then(data => {
        this.setState({ sliderData: data.data.reverse() })
        // console.log("Slider set !!!!")
      })



  }




  render() {

    if (this.props.navBarSmallView) {
      return (



        <Fragment>
          {this.state.sliderData &&
            <Swiper
              effect={''}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={1}
              autoplay={{
                delay: 5000, // Delay between slides in milliseconds (adjust as needed)
                disableOnInteraction: false, // Keep autoplay running even after user interaction
              }}

              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className={`swiper_container Slide ${this.props.navBarSmallView && "SlideMobile"}`}

            >
              {this.state.sliderData &&
                this.state.sliderData.map(i =>

                  <SwiperSlide className={`center Slide ${this.props.navBarSmallView && "SlideMobile"}`}>



                    <Link   className={`imageContainerLink rightBasic slide_image center`} exact to={`/${i.route}`} >

                      <img src={i.img} className='slide_image' alt="SliderImage" />

                    </Link>

                  </SwiperSlide>

                )
              }

              <div className="slider-controler">
                <div className="swiper-button-prev center pervBtnSwiper">
                  {/* <ChevronLeftIcon /> */}
                </div>
                <div className="swiper-button-next center nxtBtnSwiper">
                  {/* <ChevronRightIcon /> */}
                </div>
                <div className='col-12 center'>
                  <div className="swiper-pagination paginationPosFix"></div>
                </div>
              </div>

            </Swiper>

          }
        </Fragment>


      )
    }
    return (

      <Fragment>
        {this.state.sliderData &&
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={6}
            
            autoplay={{
              delay: 3000, // Delay between slides in milliseconds (adjust as needed)
              disableOnInteraction: true, // Keep autoplay running even after user interaction
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1.7,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className={`swiper_container Slide `}
          >
            {this.state.sliderData &&
              this.state.sliderData.map(i =>

                <SwiperSlide className={`center Slide `}>


                  <Link   className={`imageContainerLink rightBasic slide_image`} exact to={`/${i.route}`} >

                    <img src={i.img} className='slide_image' alt="SliderImage" />

                  </Link>

                </SwiperSlide>

              )
            }

            <div className="slider-controler">

            <div className="swiper-button-prev center pervBtnSwiper4">
                  {/* <ChevronLeftIcon /> */}
                </div>
                <div className="swiper-button-next center nxtBtnSwiper4" >
                  {/* <ChevronRightIcon /> */}
                </div>
              <div className='col-12 center '>
                <div className="swiper-pagination pagCont paginationPosFix"></div>
              </div>
            </div>

          </Swiper>
        }
      </Fragment>


    )


  }
}

const mapStateToProps = (state) => {
  return {
    sliderData: state.sliderData,
    navBarSmallView: state.navBarSmallView,


  }
}

const mapDispatchToProps = {
  setSliderData: setSliderData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoSlider))