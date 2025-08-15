import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Card extends Component {
    render() {
        return (
            <div className='Card col-12 col-xl-6 d-flex flex-row'>
                <div className='cardPicCont h-100 center col-5'>
                    <img src=" https://dkstatics-public.digikala.com/digikala-Events/111820786.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90" className='col-11 ' alt="" />
                </div>
                <div className='col-7  p-3 d-flex flex-column justify-content-between infoCont h-100'>
                    <h2 className=' prodTitle'>تایتل مورد نظر شما</h2>
                    <p>اطلاعات مهم درباره ی این کارت</p>
                </div>
                <button className='shoppingButton'></button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Card)