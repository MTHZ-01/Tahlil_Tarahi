import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group'


function mapStateToProps(state) {
    return {

    };
}

class TemporaryTextContent extends Component {


    state = {
        componentExplainContent: false,
    }


    componentDidMount() {
        setTimeout(() => this.setState({ componentExplainContent: true }), 300)
        console.log("TemporaryTextContent TemporaryTextContent TemporaryTextContent")
    }

    render() {
        return (

            <CSSTransition
                in={this.state.componentExplainContent}
                timeout={400}
                classNames="opac"
                unmountOnExit
            >

                <Fragment>
                    <span>
                        بیشتر ببین
                    </span>  <ChevronLeftIcon></ChevronLeftIcon>
                </Fragment>

            </CSSTransition>
        );
    }
}

export default connect(
    mapStateToProps,
)(TemporaryTextContent);