import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNavMenuState } from '../redux/actions';
import { setSearchData } from '../redux/actions';
import { reduxualBarOpen } from '../redux/actions';
import { reduxualBarClose } from '../redux/actions';
import { ReactComponent as MahoorLogo } from '../assets//MahoorLogoType.svg';
import { Fragment } from 'react';
import { setSearchComponentStatus } from '../redux/actions';
import SearchIcon from '@mui/icons-material/Search';
const mapStateToProps = (state) => {
    return {
        navMenoOpen: state.navMenoOpen,
        divisionData: state.divisionData,
        data: state.buyBasket.prodData,
        searchResults: state.searchResults,
        navBarSmallView: state.navBarSmallView,
        navMenoExtended: state.navMenoExtended,
        isLoggedIn: state.isLoggedIn,
        isAuthOpen: state.isAuthOpen,
        reduxualMessageBarOpen: state.reduxualMessageBarOpen,
        reduxualMessageBar1: state.reduxualMessageBar1,
        reduxualMessageBar2: state.reduxualMessageBar2,
        searchMenuOpen: state.searchMenuOpen



    }
}

const mapDispatchToProps = {
    setNavMenuState: setNavMenuState,
    setSearchData: setSearchData,
    reduxualBarOpen: reduxualBarOpen,
    reduxualBarClose: reduxualBarClose,
    setSearchComponentStatus: setSearchComponentStatus


}

class SearchBarComponent extends Component {
    render() {
        return (
            <Fragment>
                
                <button onClick={() => { this.props.setSearchComponentStatus(!this.props.searchMenuOpen) }} className={ `d-flex justify-content-start searchBar align-items-center lightGrayT ${this.props.navBarSmallView && "noMargin_right"}`}>
                <SearchIcon className='m-2'/> جستجو در انجمن
                </button>

            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchBarComponent);