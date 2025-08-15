import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './Card'

export class NavMenuItems extends Component {
    render() {
        return (
            <div className='col-12 center flex-row-reverse navBoxItem'>
                <div className='col-3 center'>
                    <button className='navItemBoxBtn'></button>
                </div>
                <div className='col-8'><Card /></div>
                <div className='col-1 center'>
                    <div>
                        <button className='navSeeAllBtn  center'>
                            <i className='fa fa-chevron-left text-light'></i>
                        </button>
                        <p>دیدن همه</p>
                    </div>

                </div>
            </div >

        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenuItems)