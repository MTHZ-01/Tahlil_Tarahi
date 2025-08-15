import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { setNavMenuExtend } from "../redux/actions"

import Card from './Card'
import Event from './Event'
import NavMenuItems from './NavMenuItems'
import ShoppingBix from './ShoppingBix'
import { setProdData } from '../redux/actions'
export class NavItemCont extends Component {

    componentDidMount() {

    }


    render() {




        return (


            <div className={`NavItemCont center col-12  flex-column  ${this.props.navMenoExtended && this.props.searchResults != null && "navExtended"} ${this.props.navMenoOpen && this.props.searchResults == null && "noHeight"}  `} onMouseLeave={() => this.props.setNavMenuExtend(false)} onMouseEnter={() => this.props.setNavMenuExtend(true)}>

    

                {!this.props.navMenoExtended && this.props.searchResults == null &&
                    <div className='col-11 center navGifParentCont '>

                        {!this.props.navBarSmallView &&
                            <Fragment>
                                <div className='col-3  navMenuGifCont'><img className='col-12 h-100' src="https://pardehstore.com/wp-content/uploads/2023/07/makhmale-talakoob.png" alt="" /></div>
                                <div className='col-3  navMenuGifCont'><img className='col-12 h-100' src="https://pardehstore.com/wp-content/uploads/2023/07/makhmal.png" alt="" /></div>
                            </Fragment>
                        }
                        <div className='col-3  navMenuGifCont'><img className='col-12 h-100' src="https://pardehstore.com/wp-content/uploads/2023/07/koosan-makhmal-2-300x300-1.png" alt="" /></div>
                        <div className='col-3  navMenuGifCont'><img className='col-12 h-100' src="https://pardehstore.com/wp-content/uploads/2023/07/Zebra.png" alt="" /></div>
                    </div>
                }


                <CSSTransition
                    in={this.props.navMenoExtended && this.props.searchResults == null}
                    classNames="BottomToTop"
                    timeout={100}
                    unmountOnExit

                >

                    <div className=' navItemBox '>


                        <div className='y_overFlow'>
                            <NavMenuItems />
                            <NavMenuItems />
                            <NavMenuItems />




                        </div>



                    </div>
                </CSSTransition>



                {Array.isArray(this.props.searchResults) &&

                    <div className=' navItemBox '><div className='y_overFlow row'>

                        {
                            this.props.searchResults.map(i => <div className='col-12 col-xl-6 p-0 m-0'><Event title={i.title} price={i.price} img={i.imgUrl} data={i} /></div>)
                        }
                        {this.props.searchResults.length == 0 &&

                            <Fragment>

                                <div className='col-12 h-100 center flex-column'>
                                    <div className='notFoundCont p-5'>
                                        <p className='border-bottom'>پیدا نشد</p>
                                        <div className='col-12 p-3'><p>کاربر عزیز, نتیجه ای برای جستجوی شما پیدا نشد.</p></div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </div>
                    </div>



                }







            </div>



        )
    }
}

const mapStateToProps = (state) => {
    return {
        navMenoOpen: state.navMenoOpen,
        navMenoExtended: state.navMenoExtended,
        navBarData: state.navBarData,
        searchResults: state.searchResults,
        navBarSmallView: state.navBarSmallView

    }
}


const mapDispatchToProps = {
    setNavMenuExtend: setNavMenuExtend,
    setProdData: setProdData
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItemCont)