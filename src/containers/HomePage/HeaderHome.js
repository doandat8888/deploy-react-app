import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import {actChangeLanguage} from '../../store/actions/appActions';
import './HomeHeader.scss';
import Header from './Section/Header';

class HomeHeader extends Component {

    onChangeLanguage = (language) => {
        this.props.onChangeLanguage(language);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="home-header-banner">
                    <div className="home-header-banner-search">
                        <div className="home-header-banner-search-top">
                            <h1 className="home-header-banner-search-top-content">
                                <FormattedMessage id="banner.medical-background"/>
                                <br />
                                <b><FormattedMessage id="banner.health-care"/></b>
                            </h1>
                        </div>
                        <br />
                        <div className="home-header-banner-search-center">
                            <div className="home-header-banner-search-center-left">
                                <i className="fa-solid fa-magnifying-glass home-header-banner-search-center-left-icon"></i>
                            </div>
                            <div className="home-header-banner-search-center-right">
                                <input type="text" className="home-header-banner-search-center-right-input" />
                            </div>
                        </div>
                        <br />
                        <div className="home-header-banner-search-bottom">
                            <ul className='home-header-banner-search-bottom-list'>
                                <li className='home-header-banner-search-bottom-item'>
                                    <a className='home-header-banner-search-bottom-item-link' href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare">
                                        <img src='https://bookingcare.vn/assets/icon/google-play-badge.svg' className='home-header-banner-search-bottom-item-link-img'/>
                                    </a>
                                </li>
                                <li className='home-header-banner-search-bottom-item'>
                                    <a className='home-header-banner-search-bottom-item-link' href='https://apps.apple.com/vn/app/bookingcare/id1347700144'>
                                        <img src='https://bookingcare.vn/assets/icon/app-store-badge-black.svg' className='home-header-banner-search-bottom-item-link-img'/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-header-banner-medical-services'>
                        <ul className='home-header-banner-medical-services-list'>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.exam-specialty" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.remote" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.general" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.medical-test" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                            <FormattedMessage id="banner.mental" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.dental" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/134356-goi-phau-thuat.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.surgery" />
                                    </div>
                                </a>
                            </li>
                            <li className='home-header-banner-medical-services-item'>
                                <a className='home-header-banner-medical-services-item-link' href='#'>
                                    <div className='home-header-banner-medical-services-item-link-img-container'>
                                        <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png' className='home-header-banner-medical-services-item-link-img'/>
                                    </div>
                                    <div className='home-header-banner-medical-services-item-link-content'>
                                        <FormattedMessage id="banner.medical-products" />
                                    </div>
                                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
