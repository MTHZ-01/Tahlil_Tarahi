import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';



function mapStateToProps(state) {
    return {

    };
}

class EnamadLogo extends Component {

    state = {
        shouldILoad: false
    }



    componentDidMount() {
        setTimeout(() => this.setState({ shouldILoad: true }), 700)
    }
    render() {
        return (
            <CSSTransition
                in={this.state.shouldILoad}
                classNames="opac"
                timeout={400}
                unmountOnExit
            >
                <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=419706&Code=eeB96b9B0ABf960018af47475c992A92'><img className='enamadStylingForAlert' referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=419706&Code=eeB96b9B0ABf960018af47475c992A92' alt='' Code='eeB96b9B0ABf960018af47475c992A92' /></a>
            </CSSTransition>

        );
    }
}

export default connect(
    mapStateToProps,
)(EnamadLogo);