import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import React, { Component } from 'react'
import { connect } from 'react-redux'



export class SubCategoryComponent extends Component {
    render() {
        return (
            <Link to={`/category/همه/${this.props.title}`} className='SubCategoryComponentContainer center flex-column'>
                <div className='subCatImgCont center'>
                    <img src={this.props.imageUrl} alt={this.props.title} className='' />
                </div>
                <span>{this.props.title}</span>
            </Link>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryComponent)