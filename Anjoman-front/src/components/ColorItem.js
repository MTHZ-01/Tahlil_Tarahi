import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';

function mapStateToProps(state) {
    return {

    };
}

class ColorItem extends Component {

    state = {
        shouldIRender: false,

    }


    componentDidMount() {
        setTimeout(() => this.setState({ shouldIRender: true }), Math.random() * 1100)

    }

    render() {
        return (

            <Button onClick={() => this.props.selectColor(this.props.i)} className='colorChooseButton center flex-column redT'>
                <CSSTransition
                    in={this.state.shouldIRender}
                    classNames="opac"
                    timeout={400}
                    unmountOnExit
                >
                    <Fragment>

                        <div style={{ background: this.props.i.color }} className='colorHolder center'>

                            <CSSTransition
                                in={this.props.selectedColor == this.props.i.colorName}
                                classNames="opac"
                                timeout={400}
                                unmountOnExit
                            >

                                <DoneIcon className='selectedItem' />
                            </CSSTransition>

                        </div>
                        <p className='lightGrayT'> {this.props.i.colorName} </p>
                    </Fragment>

                </CSSTransition>
            </Button>

        );
    }
}

export default connect(
    mapStateToProps,
)(ColorItem);