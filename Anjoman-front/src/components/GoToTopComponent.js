import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import { Transition } from 'react-transition-group';

function mapStateToProps(state) {
    return {

    };
}

class GoToTopComponent extends Component {
    state = {
        beInRight: false
    }

    nodeRef = new React.createRef()

    getToTheRight = () => {
        this.setState({ beInRight: true })
    }


    componentDidMount() {
        setTimeout(this.getToTheRight, 1000)
    }


    render() {



        const defaultStyle = {
            transition: `right ${500}ms ease-in-out`,
            right: "calc(50% -32px )",
        }

        const transitionStyles = {
            entering: { right: "7px" },
            entered: { right: "7px" },
            exiting: { right: 'calc(50% -  32px )' },
            exited: { right: 'calc(50% - 32px )' },
        };

        return (
            <Transition nodeRef={this.nodeRef} in={this.state.beInRight} timeout={500}>
                {state =>
                    <Button style={{ ...defaultStyle, ...transitionStyles[state] }} className="GoToTop border" onClick={() => { this.props.goTop() }}><SwipeUpIcon className='' /></Button>
                }
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps,
)(GoToTopComponent);