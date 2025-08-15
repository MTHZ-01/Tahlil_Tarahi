

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import AddressArea from './AddressArea'
import { Link } from 'react-router-dom'
import ShoppingCartItem from './ShoppingCartItem'

import FinallizatorCart from './FinallizatorCart'
import { CSSTransition } from 'react-transition-group'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { clearBuyBasket_Full } from '../redux/actions'
import { Cookies } from 'react-cookie'


export class ShoppingCart extends Component {

    c = new Cookies()
    componentDidMount() {
        try {
            this.props.goTop()
        }
        catch {
            console.log()
        }
    }


    eliminateBuyBasket = () => {
        fetch("https://alucarddev.ir/digitalAssets/setServerCookie", {
            method: "POST",
            body: JSON.stringify({id: this.c.get("buyBasketId") ,data : {}})

        })

        .then(r => r.json())
        .then(data => console.log("Cookie Status:",data))
        this.props.clearBuyBasket_Full()
    }

    render() {

        console.log("Buy Basket Final !!!!",this.props.buyBasket)

        return (

            <div className="col-12 center marginallSoppingBox align-items-start dirLtr flex-column flex-xl-row">



                <div className='finalizatorCont z1 center d-flex flex-column'>

                    <CSSTransition
                        in={this.props.stages.confirm}
                        timeout={1000}
                        classNames="opac"
                        unmountOnExit
                    >

                        <FinallizatorCart></FinallizatorCart>

                    </CSSTransition>

                    <CSSTransition
                        in={this.props.stages.chooseAddress}
                        timeout={1000}
                        classNames="opac"
                        unmountOnExit
                    >

                        <AddressArea></AddressArea>

                    </CSSTransition>


                </div>


                <div className="col-12 col-xl-6 shoppingCartCont center ">

                    <div className="col-11 ">


                        <div className="col-12 d-flex flex-row d-flex center justify-content-start">
                            <button className='delBtn' onClick={this.eliminateBuyBasket}><ClearIcon></ClearIcon></button>
                            <p className='m-1'>سبد رو خالی کن</p>
                        </div>

                        <div className="col-12 marginalTopContent d-flex flex-row justify-content-between">
                            <div className=" PriceCont"><h2> سبد خرید <ShoppingCartIcon></ShoppingCartIcon></h2></div>


                        </div>

                        <div className={`shoppingCartProdCont border row center punchIn`}>



                            {this.props.buyBasket.prodData &&
                                    this.props.buyBasket.prodData.map(i => <ShoppingCartItem identifier={i.id} prod={i} ></ShoppingCartItem>)
                            }






                        </div>






                    </div>
                </div>
            </div>





        )
    }
}

const mapStateToProps = (state) => {
    return {
        stages: state.shoppingCartStages,
        buyBasket: state.buyBasket,
        navBarSmallView: state.navBarSmallView,
    }
}


const mapDispatchToProps = {
    clearBuyBasket_Full: clearBuyBasket_Full
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
