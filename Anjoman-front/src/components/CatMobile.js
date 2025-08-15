

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

export class CatMobile extends Component {

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

        return (


            <Button className={`categoriesViewCont redT  ${this.state.categoryExpand && "catExpand glow-on-hover"} categoriesViewContMobile ${this.props.navBarSmallView && ""} position-relative`}>
                <Link className="textRLL catViewink d-flex flex-column center"  exact to={`/category/${this.props.name}/`}>
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
                                <Link className="textRLL d-flex flex-column center"   exact to={`/category/${this.props.name}`}>
                                    <TouchAppIcon className='textRLL seeMoreIcon' />
                                    <p>

                                        بیشتر ببین
                                    </p>
                                </Link>

                            </Button>

                        </CSSTransition>


                    </div>

                </div>
                <p className='divisionName'>{this.props.name}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CatMobile)