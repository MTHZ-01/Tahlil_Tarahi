import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import RouteIcon from '@mui/icons-material/Route';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button } from '@mui/material';

function mapStateToProps(state) {
    return {

    };
}



class MobileNavigator extends Component {
    gotTo_amazings = () => {
        if (this.props.amazingsRef.current) {

            this.props.amazingsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    gotTo_Divisions = () => {
        if (this.props.amazingsRef.current) {

            this.props.prodContRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    gotTo_Events = () => {
        if (this.props.EventsRef.current) {

            this.props.EventsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    gotTo_Abouts = () => {
        if (this.props.aboutRef.current) {

            this.props.aboutRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    gotTo_Footer = () => {
        if (this.props.footerRef.current) {

            this.props.footerRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    render() {
        if (this.props.amazingsRef.current) {

            this.props.amazingsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        return (
            <div className="col-12 center row navigaorContainer">

                <div className='navigatiorItemContainer '>
                    <div className='naviagationIconContainer EventButtonShadow'><CategorySharpIcon className='navIcon' /></div>
                    <h3>رویداد ها</h3>
                    <Button className='shoppingButton ' onClick={this.gotTo_Events}></Button>
                </div>

                <div className='navigatiorItemContainer'>
                    <div className='naviagationIconContainer'><ConnectWithoutContactIcon className='navIcon' /></div>
                    <h3>تماس با ما</h3>
                    <Button className='shoppingButton' onClick={this.gotTo_Footer}></Button>
                </div>
                <div className='navigatiorItemContainer'>
                    <div className='naviagationIconContainer'><RouteIcon className='navIcon' /></div>
                    <h3>آدرس</h3>
                    <Button className='shoppingButton' onClick={this.gotTo_Footer}></Button>
                </div>
                <div className='navigatiorItemContainer'>
                    <div className='naviagationIconContainer'><HelpOutlineIcon className='navIcon' /></div>
                    <h3>درباره ی ما</h3>
                    <Button className='shoppingButton' onClick={this.gotTo_Abouts}></Button>
                </div>


            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(MobileNavigator);