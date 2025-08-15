import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { setNavMenuState } from '../redux/actions';
import { setSearchData } from '../redux/actions';
import { reduxualBarOpen } from '../redux/actions';
import { reduxualBarClose } from '../redux/actions';
import { setSearchComponentStatus } from '../redux/actions';
import { CSSTransition, Transition } from 'react-transition-group';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import NavItemCont from './NavItemCont';

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
class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.triggerSearchComponent = this.triggerSearchComponent.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event) {
        if (event.key === "Escape") {
            //Do whatever when esc is pressed
            if (this.props.searchMenuOpen) {

                this.props.setSearchComponentStatus(!this.props.searchMenuOpen)
            }
        }
    }

    navSearch = (e) => {
        if (e.target.value === "") {
            this.props.setSearchData(null)
            return
        }


        fetch(`https://alucarddev.ir/digitalAssets/search?searchQuerry=${e.target.value}`)
            .then(res => res.json())
            .then(data => this.props.setSearchData(data.Value))
    }



    triggerSearchComponent = event => {

        try {
            if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {

                this.props.setSearchComponentStatus(!this.props.searchMenuOpen)
            }
        }
        catch {

        }
    }


    componentDidMount() {
        document.addEventListener("mousedown", this.triggerSearchComponent);
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.triggerSearchComponent);
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {


        const defaultStyle = {
            transition: `top ${200}ms ease-in-out`,
            top: "24%",
        }

        const transitionStyles = {
            entering: { top: "10%" },
            entered: { top: "10%" },
            exiting: { top: '24%' },
            exited: { top: '24%' },
        };


        return (
            <Fragment>
                <CSSTransition
                    in={this.props.searchMenuOpen}
                    classNames="opac"
                    timeout={400}
                    unmountOnExit
                >

                    {/* ${Array.isArray(this.props.searchResults) && "isSearchingClass"} */}
                    < div className='searchView'   >
                        <Button className='closeBtn'><CloseIcon /></Button>
                        <Transition nodeRef={this.wrapperRef} in={Array.isArray(this.props.searchResults)} timeout={200}>
                            {state =>

                                <input style={{ ...defaultStyle, ...transitionStyles[state] }} onChange={this.navSearch} ref={this.wrapperRef} className={`SearchComponentInput col-11 col-md-8 `} type="text" placeholder='اینجا تایپ کن تا جستجو کنی . . .' />
                            }

                        </Transition>
                        <div className='searchResultArea col-12 col-xxl-8  center'>
                            {Array.isArray(this.props.searchResults) &&
                                <NavItemCont />
                            }
                        </div>
                    </div >



                </CSSTransition>
            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchComponent);