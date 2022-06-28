import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome';
import Specialty from './Section/Specialty';
import OutstandingFacility from './Section/Outstanding-facility';
import OutstandingDoctor from './Section/Outstanding-doctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import Footer from './Section/Footer';
import './HomePage.scss';

class HomePage extends Component {

    render() {
        return (
            <div>
                <HeaderHome />
                <Specialty />
                <OutstandingFacility />
                <OutstandingDoctor /> 
                <Handbook />
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
