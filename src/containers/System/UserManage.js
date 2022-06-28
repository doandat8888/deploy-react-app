import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import {actChangeLanguage} from '../../store/actions/appActions';
import { LANGUAGES } from '../../utils/constant';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userData: null,
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    handleEventOnclick = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    onHandleToggleForm = () => {
        this.setState({
            id: '',
            isOpenModalUser: false,
            userData: null,
        })
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({    //setState là 1 hàm bất đồng bộ
                arrUsers: response.users
            })
        }
    }

    onCreateNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }else{
                await this.getAllUsersFromReact();
                this.onHandleToggleForm();
            }
        } catch (e) {
            console.log(e);
        }
    }

    onHandleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }else{
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEventOnclickEdit = (user) => {
        this.setState({
            userData: user,
            id: user.id,
            isOpenModalUser: true
        })
    }

    onEditUser = async(data) => {
        try {
            let response = await editUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage);
            }else{
                this.onHandleToggleForm();
                await this.getAllUsersFromReact();
            }
        } catch(e) {
            console.log(e);
        }
    }


    render() {
        let {arrUsers} = this.state;
        let user = arrUsers.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.address}</td>
                    <td>{user.gender === true ? 'Nam' : 'Nữ'}</td>
                    <td>{user.roleId}</td>
                    <td>
                        <button className='btn-action'
                            onClick={() => this.handleEventOnclickEdit(user)}
                        ><i class="fas fa-pencil-alt icon-pencil mr-10"></i></button>
                        <button 
                            className='btn-action'
                            onClick={() => this.onHandleDeleteUser(user)}
                        ><i class="fas fa-trash icon-trash"></i></button>
                    </td>
                </tr>
            )
        })
        return (
          <div className="users-container">
            {this.state.isOpenModalUser ? 
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    onHandleToggleForm={this.onHandleToggleForm}
                    onCreateNewUser = {this.onCreateNewUser}
                    onEditUser={this.onEditUser}
                    userData={this.state.userData}
                    id={this.state.id}
                />
            : ''
            }
            
            <div className="title text-center"><FormattedMessage id="system.user-manage.manage-user"/></div>
            <div className='mx-1'>
                <button className='btn btn-primary px-3'
                    onClick={ this.handleEventOnclick }
                >
                    <i class="fas fa-plus"></i>
                    <FormattedMessage id="system.user-manage.add-user" />
                </button>
            </div>
            <div className='users-table mt-4 mx-1'>
                <table id="customers">
                    <tr>
                        <th><FormattedMessage id="system.user-manage.first-name"/></th>
                        <th><FormattedMessage id="system.user-manage.last-name"/></th>
                        <th><FormattedMessage id="system.user-manage.mobile"/></th>
                        <th><FormattedMessage id="system.user-manage.address"/></th>
                        <th><FormattedMessage id="system.user-manage.gender"/></th>
                        <th><FormattedMessage id="system.user-manage.role-id"/></th>
                        <th><FormattedMessage id="system.user-manage.actions"/></th>
                    </tr>
                    {user}

                </table>
            </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
