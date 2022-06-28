import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_USER } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgURL: '',
            genderArr: [],
            positionArr: [],
            roleArr: [],
            isOpenImg: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            editUser: false,
            action: CRUD_USER.CREATE,
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let responseGender = await getAllCodeService("GENDER");
        //     let responsePosition = await getAllCodeService("POSITION");
        //     let responseRole = await getAllCodeService("ROLE");
        //     if(responseGender && responsePosition && responseRole && responseGender.errCode == 0 && responseRole.errCode == 0 && responsePosition.errCode == 0) {
        //         this.setState({ 
        //             genderArr: responseGender.data,
        //             positionArr: responsePosition.data,
        //             roleArr: responseRole.data
        //         })
        //     }
            
        // } catch (e) {
        //     console.log(e);
        // }
        
    }

    handleEventOnChange = async (event) => {
        let files = event.target.files;
        let file = files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            console.log(objectURL);
            this.setState({
                imgURL: objectURL,
                avatar: base64
            })
        }
    }

    openImage = () => {
        if(this.state.imgURL === '') {
            alert('Please upload image')
        }else{
            this.setState({
                isOpenImg: true,
            })
        }
    }

    handleOnChangeInput = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    
    handleSaveUser = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'position', 'role'];
        for(let i = 0; i < arrInput.length ; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        let {action} = this.state;
        if(isValid) {
            if(action === CRUD_USER.CREATE) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    phonenumber: this.state.phoneNumber,
                    avatar: this.state.avatar
                });
            }
            if(action === CRUD_USER.EDIT) {
                this.props.editUser({
                    // email: this.state.email, //Không cho đổi email
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    phonenumber: this.state.phoneNumber,
                    id: this.state.userEditId,
                    avatar: this.state.avatar,
                });
                
            }
        }
        this.setState({
            editUser: false
        })
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        let arrGenders = this.props.genderArr;
        let arrPositions = this.props.positionArr;
        let arrRoles = this.props.roleArr;
        //=>Render lần thứ 2 => Did update
        //So quá khứ với hiện tại
        //Hiện tại(this.props.genderArr) vs quá khứ (prevProps.genderArr)
        if(prevProps.genderArr !== this.props.genderArr || prevProps.positionArr !== this.props.positionArr || prevProps.roleArr !== this.props.roleArr) {
            this.setState({
                //Lấy giá trị mặc định cho 3 input gender, position, role
                genderArr: arrGenders,
                gender: arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                positionArr: arrPositions,
                position: arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                roleArr: arrRoles,
                role: arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            })
        }

        if(prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderArr;
            let arrPositions = this.props.positionArr;
            let arrRoles = this.props.roleArr;
            this.setState({
                isOpenImg: false,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                imgURL: '',
            })
        }
    }

    onHandleEditUser = (user) => {
        let imageBase64 = '';
        if(user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            imgURL: imageBase64,
            editUser: true,
            action: CRUD_USER.EDIT,
            userEditId: user.id,
        })
    }


    render() {
        var genders = this.state.genderArr;
        var positions = this.state.positionArr;
        var roles = this.state.roleArr;
        var language = this.props.language;
        var {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar, userEdit} = this.state;
        return (
            <div className="user-redux-container">
                <div className="title mb-32">
                    <FormattedMessage id="menu.system.system-administrator.user-redux"/>
                </div>
                
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                        <span className="mb-32"><FormattedMessage id="system.user-manage.add-user"/></span>
                            <form>
                                <div className="form-row mb-32">
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputEmail4">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" name='email' onChange={this.handleOnChangeInput} value={email} disabled={this.state.action === CRUD_USER.EDIT ? true : false}/>
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputPassword4"><FormattedMessage id="system.user-manage.password-input"/></label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" name='password'onChange={this.handleOnChangeInput} value={password} />
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputAddress"><FormattedMessage id="system.user-manage.first-name"/></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="First name" name='firstName'onChange={this.handleOnChangeInput} value={firstName}/>
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputAddress2"><FormattedMessage id="system.user-manage.last-name"/></label>
                                        <input type="text" className="form-control" id="inputAddress2" placeholder="Last name" name='lastName'onChange={this.handleOnChangeInput} value={lastName}/>
                                    </div>
                                </div>

                                <div className="form-row mb-32">
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputEmail4"><FormattedMessage id="system.user-manage.mobile"/></label>
                                        <input type="text" className="form-control" id="inputEmail4" placeholder="Phone number" name='phoneNumber'onChange={this.handleOnChangeInput} value={phoneNumber}/>
                                    </div>
                                    <div className="form-group col-md-9">
                                        <label for="inputPassword4"><FormattedMessage id="system.user-manage.address" /></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="Address" name='address'onChange={this.handleOnChangeInput} value={address}/>
                                    </div>
                                </div>

                                <div className="form-row mb-32">
                                
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.gender"/></label>
                                        <select name="gender" className="form-control" onChange={this.handleOnChangeInput} value={gender}>
                                            {genders && genders.length > 0 ? 
                                                genders.map((genderItem, index) => {
                                                    return(
                                                        <option key={index} value={genderItem.keyMap}>{language === LANGUAGES.VI ? genderItem.valueVi : genderItem.valueEn}</option>
                                                    ) 
                                                })
                                            : ''}
                                            
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.position"/></label>
                                        <select name="position" className="form-control" onChange={this.handleOnChangeInput} value={position}>
                                            {positions && positions.length > 0 ? 
                                                positions.map((positionItem, index) => {
                                                    return(
                                                        <option key={index} value={positionItem.keyMap} >{language === LANGUAGES.VI ? positionItem.valueVi : positionItem.valueEn}</option>
                                                    ) 
                                                })
                                            : ''}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.role-id"/></label>
                                        <select name="role" className="form-control" onChange={this.handleOnChangeInput} value={role}>
                                            {roles && roles.length > 0 ? 
                                                roles.map((roleItem, index) => {
                                                    return (
                                                        <option key={index} value={roleItem.keyMap} >{language === LANGUAGES.VI ? roleItem.valueVi : roleItem.valueEn}</option>
                                                    )
                                                })
                                            :" "}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 mr-16">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.avatar"/></label>
                                        <div className="preview-img-container">
                                            <input 
                                                id="previewImg" 
                                                type="file" 
                                                hidden
                                                onChange={this.handleEventOnChange}
                                            />
                                            <label className="label-upload mb-32" htmlFor="previewImg"><FormattedMessage id="system.user-manage.load-image"/><i class="fa-solid fa-upload"></i></label>
                                            <div 
                                                className="preview-image"
                                                style={this.state.imgURL !== '' ? {backgroundImage: `url(${this.state.imgURL})`} : {} }
                                                onClick={this.openImage}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                {this.state.editUser === true ? <button type='button' className="btn btn-warning" onClick={this.handleSaveUser}><FormattedMessage id="system.user-manage.edit-btn"/></button>
                                : <button type='button' className="btn btn-primary" onClick={this.handleSaveUser}><FormattedMessage id="system.user-manage.create-user"/></button>
                                }
                                
                            </form>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpenImg &&
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpenImg: false })}
                    /> 
                }
                    
                <TableManageUser onHandleEditUser={this.onHandleEditUser}/>
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderArr: state.admin.genders, //Lấy các state của Redux truyền vào react (state là state của Redux)
        positionArr: state.admin.positions,
        roleArr: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => {
            dispatch(actions.fetchGenderStart());
        },
        getGenderSuccess: () => {
            dispatch(actions.fetchGenderStart());
        },
        getGenderFailed: () => {
            dispatch(actions.fetchGenderFailed());
        },
        getPositionStart: () => {
            dispatch(actions.fetchPositionStart());
        },
        getPositionSuccess: () => {
            dispatch(actions.fetchPositionStart());
        },
        getPositionFailed: () => {
            dispatch(actions.fetchPositionFailed());
        },
        getRoleStart: () => {
            dispatch(actions.fetchRoleStart());
        },
        getRoleSuccess: () => {
            dispatch(actions.fetchRoleStart());
        },
        getRoleFailed: () => {
            dispatch(actions.fetchRoleFailed());
        },
        createNewUser: (data) => {
            dispatch(actions.createNewUser(data));
        },
        fetchAllUsersStart: () => {
            dispatch(actions.fetchAllUsersStart());
        },
        editUser: (data) => {
            dispatch(actions.editUser(data));
        }
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
