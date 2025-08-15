import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { InView } from 'react-intersection-observer';
import { Fragment } from 'react';
import { Button } from '@mui/material';
import { withRouter, Link } from 'react-router-dom'
import TemporaryBuyView from './components/TemporaryBuyView';


function mapStateToProps(state) {
    return {

    };
}

class EventMobile extends Component {

    state = {
        isInView: false,
        componentExplainBase: false,

    }

    init_animateInitially = () => {
        this.setState({ componentExplainBase: true })



    }
    Finish_animateInitially = () => {

        this.setState({ componentExplainBase: false })


    }
    render() {

        const shortIntro = this.props.data.introduction.length > 100
            ? this.props.data.introduction.substring(0, 100) + '...'
            : this.props.data.introduction;

        const formatter = new Intl.NumberFormat('fa', {
            style: 'decimal',


            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        var d = ""
        try {

            d = this.props.data.discount
        }
        catch {

        }
        return (
            <InView className={`EventMParent`} onChange={(inView, entry) => {
                this.setState({ isInView: inView })
                // console.log(inView)
            }}>

                <CSSTransition
                    in={this.state.isInView}
                    timeout={2000}
                    classNames="opacLong"

                >
                    <Fragment>
                        <div className='EventMobileView'>

                            <img src={this.props.img} alt={`Event_photo: ${this.props.title}`} className=''
                            />
                        </div>
                        <h3>{this.props.title}</h3>




                        <Button className='shoppingButton noMargin' ><Link onMouseLeave={this.Finish_animateInitially} onMouseEnter={this.init_animateInitially} to={`/Events/${this.props.title}`} className="col-12 h-100">
                            <CSSTransition
                                in={this.state.componentExplainBase}
                                // in={true}
                                timeout={400}
                                classNames="opac"
                                unmountOnExit
                            >
                                <div className='TempBuyView center dirRtl redT'>
                                    <TemporaryBuyView introduction={shortIntro} />
                                </div>
                            </CSSTransition>
                        </Link></Button>
                    </Fragment>

                </CSSTransition>
            </InView>

        );
    }
}

export default withRouter(connect(
    mapStateToProps,
)(EventMobile))