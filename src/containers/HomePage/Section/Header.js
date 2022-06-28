import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import {actChangeLanguage} from '../../../store/actions/appActions';
import { withRouter } from 'react-router';
import {Ficode, FiMenu, FiX} from 'react-icons/fi';
import './Header.scss';

class header1 extends Component {

    onChangeLanguage = (language) => {
        this.props.onChangeLanguage(language);
    }

    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="header1-container">
                    <div className="header1-left">
                        <ul className="header1-left-list">
                            <li className="header1-left-item">
                                <i className="fa-solid fa-bars header1-left-item-icon"></i>
                            </li>
                            <li className="header1-left-item">
                                <img src='https://bookingcare.vn/assets/icon/bookingcare-2020.svg' className="header1-left-item-logo" onClick={this.returnToHome}/>
                            </li>
                        </ul>
                    </div>
                    <div className="header1-center">
                        <ul className="header1-center-list">
                            <li className="header1-center-item">
                                <a className="header1-center-item-link" href="#">
                                    <div className="header1-center-item-link-content-top"><FormattedMessage id="home-header.speciality"/></div>
                                    <div className="header1-center-item-link-content-bottom"><FormattedMessage id="home-header.searchdoctor"/></div>
                                </a>
                            </li>
                            <li className="header1-center-item">
                                <a className="header1-center-item-link" href="#">
                                    <div className="header1-center-item-link-content-top"><FormattedMessage id="home-header.health-facility"/></div>
                                    <div className="header1-center-item-link-content-bottom"><FormattedMessage id="home-header.select-room"/></div>
                                </a>
                            </li>
                            <li className="header1-center-item">
                                <a className="header1-center-item-link" href="#">
                                    <div className="header1-center-item-link-content-top"><FormattedMessage id="home-header.doctor"/></div>
                                    <div className="header1-center-item-link-content-bottom"><FormattedMessage id="home-header.select-doctor"/></div>
                                </a>
                            </li>
                            <li className="header1-center-item">
                                <a className="header1-center-item-link" href="#">
                                    <div className="header1-center-item-link-content-top"><FormattedMessage id="home-header.fee"/></div>
                                    <div className="header1-center-item-link-content-bottom"><FormattedMessage id="home-header.check-health"/></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="header1-right">
                        <ul className="header1-right-list">
                            <li className="header1-right-item">
                                <a className="header1-right-item-link" href="#">
                                    <i className="fa-solid fa-circle-question header1-rigth-item-link-icon"></i>
                                </a>
                            </li>
                            <li className="header1-right-item">
                                <a className="header1-right-item-link" href="#">
                                    <span className='header1-right-item-link-content'><FormattedMessage id="home-header.support"/></span>
                                </a>
                                <div className='header1-right-item-language-en'><span onClick={() => this.onChangeLanguage(LANGUAGES.EN)}>EN</span></div>
                                <div className='header1-right-item-language-vn'><span onClick={() => this.onChangeLanguage(LANGUAGES.VI)}>VI</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
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
        onChangeLanguage: (language) => {
            dispatch(actChangeLanguage(language));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(header1));