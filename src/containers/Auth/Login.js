import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassWord: false,
            errMessage: '',
        }
    }

    handleOnChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !== 0) { //0 tức là đăng nhập thành công
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.userData);
                console.log(data.userData);
            }
        } catch (error) {
            if(error) {
                if(error.response) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
        
    }

    handleChangeType = () => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord,
        })
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        return (
           <div className='login-background'>
               <div className='login-container'>
                   <div className='login-content row'>
                       <div className='col-12 text-center login-content-text'>Login</div>
                       <div className='col-12 mb-4 login-content-username'>
                           <label>Username:</label>
                           <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username} name='username' onChange={(e) => this.handleOnChange(e)}/>
                       </div>
                       <div className='col-12 mb-4 login-content-password'>
                           <label>Password:</label>
                           <div className='login-content-password-input'>
                                <input type={this.state.isShowPassWord ? 'text' : 'password'} className='form-control'placeholder='Enter your password' value={this.state.password} name='password' onChange={(e) => this.handleOnChange(e)} onKeyDown={(event) => this.handleKeyDown(event)}/>
                                <i className={this.state.isShowPassWord ? 'far fa-eye login-content-password-input-icon' : 'far fa-eye-slash login-content-password-input-icon'}  onClick={this.handleChangeType}></i>
                           </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                       <div className='login-confirm'>
                            <button className='login-btn' onClick={this.handleLogin}>Log in</button>
                       </div>
                       <div className='col-12'>
                           <span>Forgot your password?</span>
                       </div>
                       <div className='col-12 sign-in-with'>
                            <div className='sign-in-text'>Or sign in with</div>
                            <ul className='sign-in-icons'>
                                <li className='sign-in-icon'>
                                    <a className='sign-in-icon-link'>
                                        <i className="fab fa-facebook sign-in-icon-facebook"></i>
                                    </a>
                                </li>
                                <li className='sign-in-icon'>
                                    <a className='sign-in-icon-link'>
                                        <i className="fab fa-twitter sign-in-icon-twitter"></i>
                                    </a>
                                </li>
                                <li className='sign-in-icon'>
                                    <a className='sign-in-icon-link'>
                                        <i className="fab fa-google-plus sign-in-icon-google"></i>
                                    </a>
                                </li>
                            </ul>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
