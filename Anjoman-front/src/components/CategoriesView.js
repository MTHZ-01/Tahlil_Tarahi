

import { ReactComponent as Logo } from '../assets//MahoorLogoType.svg';
import LaunchIcon from '@mui/icons-material/Launch';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { InView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group'
import TemporaryTextContent from './TemporaryTextContent';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Fragment } from 'react';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export class CategoriesView extends Component {

    state = {
        isInView: false,
        categoryExpand: false,
        componentExplainBase: false,



    }

    init_animateInitially = () => {
        this.setState({ componentExplainBase: true })



    }
    Finish_animateInitially = () => {

        this.setState({ componentExplainBase: false })


    }

    componentDidMount() {

        // if (this.props.animateInitially) {

        // }
    }

    render() {




        if (!this.props.navBarSmallView) {

            return (
                <Button className={`categoriesViewCont m-1 ${this.props.navBarSmallView && "categoriesViewContMobile"} position-relative `}>
                    <InView className={`col-12 h-100`} onChange={(inView, entry) => {
                        this.setState({ isInView: inView })
                        // console.log(inView)
                    }}>

                        <CSSTransition
                            in={this.state.isInView}
                            timeout={2000}
                            classNames="opac"

                        >
                            <img src={this.props.imgUrl} className='col-12 h-100' alt="" />
                        </CSSTransition>

                    </InView >

                    <div className='col-12 h-100 categoriesView center'>

                        <h3 className='categoryTitle '>{this.props.name}</h3>
                        <Link onMouseLeave={this.Finish_animateInitially} onMouseEnter={this.init_animateInitially}   to={`category/${this.props.name}/`} className="col-12 h-100 center">
                            {!this.state.componentExplainBase &&
                                <div className='innerViewCategoriesView center  justify-content-end'>  <ExpandMoreIcon></ExpandMoreIcon></div>
                            }


                            <CSSTransition
                                in={this.state.componentExplainBase}
                                timeout={400}
                                classNames="opac"
                                unmountOnExit
                            >
                                <div className='guider center justify-content-end'>
                                    <TemporaryTextContent />
                                </div>
                            </CSSTransition>
                            <p className='logoSm'> 
                            انجمن</p>

                        </Link>
                    </div>
                </Button>

            )

        }
        return (


            <Button className={`categoriesViewCont redT  ${this.state.categoryExpand && "catExpand glow-on-hover"}  ${this.props.navBarSmallView && "categoriesViewContMobile"} position-relative`}>
                <Link className="textRLL catViewink d-flex flex-column center"   to={`category/${this.props.name}/`}>
                </Link>
                <img className={`imgForDivView ${this.state.categoryExpand && "zInd-2"}`} alt={this.props.name} src={this.props.imgUrl} />
                <div className={`contentOfDivision center ${this.state.categoryExpand && "punchInOnly"}`}>
                    <div className={`col-12 h-100 ${this.state.categoryExpand && " seeMoreIcon"}`}>

                        {/* // NO EXPAND: */}

                        <CSSTransition
                            in={!this.state.categoryExpand}
                            timeout={400}
                            classNames="opac"
                            unmountOnExit
                        >

                            <Button className=' divisionExpandBtn' onClick={() => this.setState({ categoryExpand: true })}>

                            </Button>
                        </CSSTransition>



                        {/* // EXPAND: */}

                        <CSSTransition
                            in={this.state.categoryExpand}
                            timeout={400}
                            classNames="opac"
                            unmountOnExit
                        >

                            <Button className=' divisionUnexpandBtn' onClick={() => this.setState({ categoryExpand: false })}><ExpandLessIcon className='' /></Button>

                        </CSSTransition>
                        <CSSTransition
                            in={this.state.categoryExpand}
                            timeout={400}
                            classNames="opac"
                            unmountOnExit
                        >

                            <Button className=' divisionLinkBtn' onClick={() => this.setState({ categoryExpand: false })}>
                                <Link className="textRLL d-flex flex-column center"   to={`category/${this.props.name}/`}>
                                    <TouchAppIcon className='textRLL seeMoreIcon' />
                                    <p>

                                        بیشتر ببین
                                    </p>
                                </Link>

                            </Button>

                        </CSSTransition>


                    </div>

                <p className='divisionName'>{this.props.name}</p>
                </div>
            </Button>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        navBarSmallView: state.navBarSmallView,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView)