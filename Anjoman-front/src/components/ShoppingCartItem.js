

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from './Event'
import { delFromShoppingCart, cookieToBasket } from '../redux/actions'
import { Fragment } from 'react'
import { Cookies } from 'react-cookie'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';


export class ShoppingCartItem extends Component {
    constructor() {
        super()
        this.c = new Cookies()
    }

    del = () => {
        // this.props.delFromShoppingCart(this.props.identifier)
        fetch("https://alucarddev.ir/digitalAssets/deleteServerCookie", {
            method: "POST",
            body: JSON.stringify({ eliminationId: this.props.prod.eliminationId, cookieVal: this.c.get("buyBasketId") })
        })

            .then(r => r.json())
            .then(data => {

                this.props.cookieToBasket(data.data)
                console.log("Here's the data", data)
            }
            )

    }



    render() {
        const prod = this.props.prod




        return (
            <Fragment>
                {prod &&
                    <div className='col-12 border_red_b actualItems'>
                        <div className="col-12 d-flex flex-row p-3">
                            <Button onClick={this.del} className='delBtn redT'><DeleteForeverIcon></DeleteForeverIcon></Button>
                            <p className='m-1'>حذف از سبد</p>
                        </div>
                        <div className='eventshowُShopp'>
                            <div className='border borderRadHigh'>
                                <Event title={prod.title} price={prod.price} img={prod.imgUrl}></Event>
                            </div>
                        </div>


                        {!prod.doesItNeedSizing &&
                            <div className='col-10 d-flex flex-row center justify-content-start'>
                                <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>

                                <p className='pt-0'>تعداد: {prod.colorName}</p><div className=''>{prod.count} عدد</div>

                            </div>
                        }

                        {prod.doesItNeedSizing &&

                            <div className='col-12 center paddingForBottom  d-flex flex-column'>
                                <div className='col-10 d-flex flex-row center justify-content-start'>
                                    <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>
                                    <p className='pt-0'> ابعاد انتخابی شما {prod.width} سانتی متر طول و {prod.height} سانتی متر عرض می باشد </p>

                                </div>
                                <div className='m-3'></div>
                                <div className='col-10 d-flex flex-row center justify-content-start'>
                                    <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>

                                    <p className='pt-0'>موقعیت نصب زنجیر :{prod.chainPosition}</p>

                                </div>
                                <div className='m-3'></div>
                                <div className='col-10 d-flex flex-row center justify-content-start'>
                                    <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>

                                    <p className='pt-0'>محل نصب انجمن : {prod.installationPosition}</p>

                                </div>

                                <div className='m-3'></div>
                                <div className='col-10 d-flex flex-row center justify-content-start'>
                                    <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>

                                    <p className='pt-0'>توضیحات شما: {prod.description}</p>

                                </div>
                                <div className='m-3'></div>
                                <div className='col-10 d-flex flex-row center justify-content-start'>
                                    <LibraryAddCheckIcon className='delBtn redT'></LibraryAddCheckIcon>

                                    <p className='pt-0'>رنگ: {prod.colorName}</p><div style={{ background: prod.colorCode }} className='showColor'></div>

                                </div>



                            </div>
                        }



                    </div>

                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // info: state.buyBasket.prodData,
        buyBasket: state.buyBasket
    }
}

const mapDispatchToProps = {
    delFromShoppingCart: delFromShoppingCart,
    cookieToBasket: cookieToBasket

}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartItem)