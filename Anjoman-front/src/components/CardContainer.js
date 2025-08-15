
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './Card'


export class CardContainer extends Component {
    render() {
        return (
            <div className='CardParent col-12 center'>
                <div className='CardContainer col-12 row d-flex justify-content-start'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)