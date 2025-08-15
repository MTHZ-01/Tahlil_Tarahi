


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Button } from '@mui/material'

export class SmallImageRef extends Component {
    render() {
        return (
            <div className='imageRefsmCont p-3 position-relative'>
                <img src={this.props.imgUrl && this.props.imgUrl } className='col-12 h-100 borderRadu52' alt={this.props.title} />
                <Button className='shoppingButton' ><Link to={`/Events/${this.props.title}`} className="col-12 h-100"></Link></Button>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmallImageRef))