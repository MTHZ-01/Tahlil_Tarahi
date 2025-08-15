


import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
export class FscreenLoadingComponent extends Component {
    render() {
        return (
            <div className='col-12 h-100 LoadingFscreen center'>

                <div className='loaderMessager center'>
                    <div> انجمن علمی</div>
                    <section className='loadingSect'>
                        <CircularProgress></CircularProgress>
                        <div className='m-2'></div>
                        <h6 >بگیر که اومد!</h6>
                    </section>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FscreenLoadingComponent)