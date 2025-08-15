


import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import SmallImageRef from './SmallImageRef'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { InView } from 'react-intersection-observer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EventMobile from '../EventMobile'

export class Section extends Component {
    state = {
        more: false,
        subDivs: [],
        guiderOpen: false
    }


    componentDidMount() {
        fetch("https://alucarddev.ir/digitalAssets/getDivRel", {
            method: "POST",
            body: JSON.stringify({ divisionName: `${this.props.divisionData.name}` })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ subDivs: data.data })
            })

    }


 lorem
    componentDidMount() {
        console.log("divisionData", this.props.divisionData)
        console.log("EventData", this.props.EventData)

    }
    



    render() {
        // console.log("dd", this.props.divisionData)
        const events = this.props.EventData.filter(i => i.divisions == this.props.divisionData.name)
        // console.log(events)

        if (events.length !== 0) {
            return (
                <div className={`  center flex-column oHidd  position-relative sectWidthFix  ${this.props.navBarSmallView && "p-0 col-12 mt-3"} ${!this.props.navBarSmallView && "sectWidthFixDesktop"}`}>
                    <InView className={` ${true && "imageForDivision col-3 center flex-column justify-content-start "} ${this.props.navBarSmallView && "col-12"}`} onChange={(inView, entry) => {
                        this.setState({ guiderOpen: inView })
                        // console.log(inView)
                    }}>


                        <CSSTransition
                            in={this.state.guiderOpen}
                            timeout={1000}
                            classNames="right-to-left"
                            unmountOnExit
                        >

                            <Fragment>

                                <div className='center justify-content-start align-items-start col-12 '>

                                    <div className='center col-12'>
                                        <div className='d-flex flex-column w-100 start align-items-start'>

                                            <div className='center flex-column justify-content-'>

                                                <h2 className='divisionNameForBottom'>{this.props.divisionData.name}</h2>

                                            </div>
                                        </div>
                                        <Link exact to={`/category/${this.props.divisionData.name}`} className='seeMoreBtn redT d-flex flex-row'><ChevronLeftIcon /> مشاهده بیشتر</Link>

                                    </div>

                                </div>
                            </Fragment>



                        </CSSTransition>
                    </InView>
                    <div className={`innerDivisionContainer d-flex center row oHidd ${!this.props.navBarSmallView && ""} ${this.props.navBarSmallView && "noShadow"}`}>
                        {


                            events.slice(0, 4).map(i =>
                                <div className='sectionProdCont '>
                                    <EventMobile title={i.title} price={i.price} img={i.imgUrl} data={i} />
                                </div>
                            )}

                    </div>

                </div>

            )

           
        }
    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView,


    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Section)