import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertMessage from './components/alertComponents/AlertMessage';
import EnamadLogo from './components/alertComponents/EnamadLogo';
import AlertContent from './components/alertComponents/AlertContent';
import { CSSTransition } from 'react-transition-group';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setLuxAlert } from './redux/actions';
import { Fragment } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
class LuxeryAlert extends Component {

    state = {
        amILoaded: false
    }

    componentDidMount() {
        this.setState({ amILoaded: true })


    }


    closeThis = () => {
        this.props.setLuxAlert({ open: false })
    }

    render() {




        return (
            <Fragment>
                {
                    this.props.luxOpen &&

                    < CSSTransition
                        in={this.state.amILoaded}
                        classNames="opac"
                        timeout={400}
                        unmountOnExit
                    >

                        <div className='luxeryAlertParent'>
                            <div className='col-12 center AlertFirst'>
                                <div className='col-8 '>
                                    {this.props.severity == "enamad" && <AlertMessage severity="enamad" />}
                                    {(this.props.severity == "success" || this.props.severity == "failure") && <AlertMessage severity="message" title={this.props.luxTitle} />}
                                </div>
                                <div className='col-4 center justify-content-end'><Button onClick={this.closeThis} className="AlertCloseButton"><CloseIcon className='alertCloseIcon' /></Button></div>
                            </div>
                            <div className='col-12 center AlertSecond'>
                                <div className='col-10 col-md-9 center  justify-content-between'>
                                    <div>

                                        {this.props.severity == "enamad" && <AlertContent severity="enamad" />}
                                        {(this.props.severity == "success" || this.props.severity == "failure") && <AlertContent severity="message" content={this.props.luxContent} />}

                                    </div>
                                    <div>

                                        {this.props.severity == "enamad" && <EnamadLogo />}
                                        {this.props.severity == "success" && <DoneAllIcon className="luxAllDoneIcon" />}
                                        {this.props.severity == "failure" && <HighlightOffIcon className="luxAllDoneIcon redT" />}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </CSSTransition >
                }
            </Fragment>

        );
    }


}



const mapStateToProps = (state) => {
    return {

        navBarSmallView: state.navBarSmallView,

        luxOpen: state.luxOpen,
        luxTitle: state.luxTitle,
        luxContent: state.luxContent,
        severity: state.luxSeverity



    }
}

const mapDispatchToProps = {

    setLuxAlert: setLuxAlert



}

export default connect(
    mapStateToProps, mapDispatchToProps
)(LuxeryAlert);