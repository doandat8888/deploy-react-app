import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import {FormattedMessage} from 'react-intl';
import {LANGUAGES, USER_ROLE} from '../../utils/constant';
import {actChangeLanguage} from '../../store/actions/appActions';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu,
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                {/* Languages */}
                <div className="header-languages">
                    <span className="welcome"><FormattedMessage id="home-header.welcome-back"/>, {userInfo && userInfo.firstName ? this.props.userInfo.firstName : " "} {userInfo && userInfo.lastName ? this.props.userInfo.lastName : " "}</span>
                    <span className="header-languages-en"
                        onClick={() => this.props.onChangeLanguage(LANGUAGES.EN)}
                    >EN</span>
                    <span className="header-languages-vn"
                        onClick={() => this.props.onChangeLanguage(LANGUAGES.VI)}
                    >VN</span>
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title="Log out">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        onChangeLanguage: (language) => {
            dispatch(actChangeLanguage(language));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
