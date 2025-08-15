import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';


function mapStateToProps(state) {
    return {

    };
}

class AlertMessage extends Component {
    state= {
        shouldILoad: false
    }



    componentDidMount() {
        setTimeout(()=> this.setState({shouldILoad: true}), 200)
    }

    render() {
        return (
            <CSSTransition
                in={this.state.shouldILoad}
                classNames="opac"
                timeout={400}
                unmountOnExit
            >
                <p className='luxeryAlerttitle'> {this.props.severity == "message" && this.props.title} {this.props.severity == "enamad" && "انجمن علمی مهندسی کامپیوتر"}</p>
            </CSSTransition>

        );
    }
}

export default connect(
    mapStateToProps,
)(AlertMessage);