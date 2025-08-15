

import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class AcoountManager extends Component {
    render() {
        return (
            <div className='col-12 center mt-5'>

                <div className='col-12 center flex-column  border position-relative paymentStatsCont p-4 align-items-start justify-content-start flex-column'></div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AcoountManager);