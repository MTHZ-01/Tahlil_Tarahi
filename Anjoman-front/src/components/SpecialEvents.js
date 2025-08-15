

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CSSTransition } from 'react-transition-group'
import { InView } from 'react-intersection-observer';
import { Fragment } from 'react';
import Logo from '../assets/Anj.jpg';
import { Link } from '@mui/material';

export class SpecialEvents extends Component {

    state = {
        fourthImgIsInView: false,
        title: null,
        content: null
    }


    getData = () => {

        fetch("https://alucarddev.ir/getAboutInfo")
            .then(r => r.json())
            .then(d => this.setState({ title: d.title, content: d.content }))
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div className={`specialCont center ${this.props.navBarSmallView && "mt-5"}`}>
                <div >

                    <div className='col-12 col-xl-6  posrel d-flex flex-column-reverse flex-xl-row '>
                        <div className='col-12 col-xl-6 specialInfoCont center justify-content-between justify-content-xl-between pt-0'>
                            <div className='col-12 col-xl-12 center flex-column'>

                                <InView className={`col-9 col-xl-12 d-flex justfy-content-end flex-column ${this.props.navBarSmallView && "mt-3"}`} onChange={(inView, entry) => {
                                    this.setState({ fourthImgIsInView: inView })
                                    // console.log(inView)
                                }}>

                                    <CSSTransition
                                        in={this.state.fourthImgIsInView && this.state.title != null && this.state.content != null}
                                        timeout={1000}
                                        classNames="right-to-left"
                                        unmountOnExit
                                    >





                                        <h2 className='mahoorIntroduction'>{this.state.title}</h2>


                                    </CSSTransition>
                                    <CSSTransition
                                        in={this.state.fourthImgIsInView && this.state.title != null && this.state.content != null}
                                        timeout={1000}
                                        classNames="BTT"
                                        unmountOnExit
                                    >
                                        <p>{this.state.content}</p>
                                    </CSSTransition>
                                </InView>
                            </div>

                        </div>
                        <div className='col-12 col-xl-6 center justify-content-center justify-content-xl-end align-items-start'>
                            <CSSTransition
                                in={this.state.fourthImgIsInView && this.state.title != null && this.state.content != null}

                                timeout={1000}
                                classNames="left-to-right"
                                unmountOnExit
                            >
                                <div className='mahoorLogoBig'>

                                    <Link to="/" className="mahoorLogoBig"><img src={Logo} className='anjomanLogoBIG' /></Link>

                                </div>
                            </CSSTransition>
                        </div>

                    </div>
                </div>


            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialEvents)