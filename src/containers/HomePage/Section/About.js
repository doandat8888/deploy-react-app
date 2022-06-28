import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
//Import slide



class About extends Component {

    

    render() {
        return (
            <div className="section-about">
                <div className="about-content">
                    <h1 className="about-content-title">Truyền thông nói gì về BookingCare</h1>
                    <div className="about-content-body-container">
                        <div className='about-content-body'>
                            <iframe width="570" height="321" src="https://www.youtube.com/embed/FyDQljKtWnI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className='about-content-body'>
                            <iframe width="570" height="321" src="https://www.youtube.com/embed/7tiR7SI4CkI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
