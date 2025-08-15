import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';

function mapStateToProps(state) {
    return {

    };
}

class AlertContent extends Component {

    state = {
        shouldILoad: false
    }



    componentDidMount() {
        setTimeout(() => this.setState({ shouldILoad: true }), 200)
    }

    render() {
        return (
            <CSSTransition
                in={this.state.shouldILoad}
                classNames="opac"
                timeout={400}
                unmountOnExit
            >

                <Fragment>
                    {this.props.severity == "enamad" &&

                        <p className='luxAlertMessage '> تحلیل و طراحی: محمد حسین تقی زاده - تابستان 1404 - بعد از جنگ 12 روزه<br /> انجمن علمی مهندسی کامپیوتر</p>
                    }
                    {this.props.severity == "message" &&

                        <p className='luxAlertMessage fntVeryBig'>{this.props.content}</p>
                    }
                </Fragment>


            </CSSTransition>

        );
    }
}

export default connect(
    mapStateToProps,
)(AlertContent);