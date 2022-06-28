
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";


import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: true,
            roleId: '',
        }
    }

    

    componentDidMount() {
        if(this.props.userData) {
            console.log(this.props.userData)
            this.setState({
                id: this.props.userData.id,
                email: this.props.userData.email,
                password: this.props.userData.password,
                firstName: this.props.userData.firstName,
                lastName: this.props.userData.lastName,
                address: this.props.userData.address,
                phonenumber: this.props.userData.phonenumber,
                gender: this.props.userData.gender,
                roleId: this.props.userData.roleId,
            })
        }
    }


    // UNSAFE_componentWillReceiveProps(nextprops) {
    //     if(nextprops && nextprops.userData) {
    //         this.setState({
    //             id: this.props.userData.id,
    //             email: this.props.userData.email,
    //             password: this.props.userData.password,
    //             firstName: this.props.userData.firstName,
    //             lastName: this.props.userData.lastName,
    //             address: this.props.userData.address,
    //             phonenumber: this.props.userData.phonenumber,
    //             gender: this.props.userData.gender,
    //             roleId: this.props.userData.roleId,
    //         })
    //     }else if(!nextprops.userData){
    //         this.setState({
    //             id: '',
    //             email: '',
    //             password: '',
    //             firstName: '',
    //             lastName: '',
    //             address: '',
    //             phonenumber: '',
    //             gender: true,
    //             roleId: '',
    //         })
    //     }
    // }

    // componentDidUpdate() {
    //     if(this.props.userData) {
    //         this.setState({
    //             id: '',
    //             email: '',
    //             password: '',
    //             firstName: '',
    //             lastName: '',
    //             address: '',
    //             phonenumber: '',
    //             gender: true,
    //             roleId: '',
    //         })
    //     }
    // }

    toggle = () => {
        this.props.onHandleToggleForm();
    }

    handleOnChangeInPut = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    handleValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId'];
        for(let i = 0; i < arrInput.length ; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUserAndEdit = () => {
        if(this.props.id === '') {
            let isValid = this.handleValidateInput();
            if(isValid === true) {
                //call API create user
                this.props.onCreateNewUser(this.state);
                this.setState({
                    id: '',
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phonenumber: '',
                    gender: '',
                    roleId: '',
                })
            }
        }else{
            this.props.onEditUser(this.state);
        }
        
    }


    render() {
        return (
          <Modal 
            isOpen={this.props.isOpen} 
            toggle={this.toggle}
            className={'abcclassName'}
            userEditInfo={this.props.userEditInfo}
            size='lg'
            centered
          >
                <ModalHeader toggle={this.toggle}>
                    {this.props.id === '' ? <FormattedMessage id="system.user-manage.create-user"/> : <FormattedMessage id="system.user-manage.edit-user"/>}
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className={this.state.password === '' ? "form-group col-6" : "form-group col-12"}>
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" className="form-control" style={{marginBottom: 16}} id="inputEmail4" placeholder="Email" name="email" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.email}/>
                                </div>
                                {this.state.password === '' ? 
                                    <div className="form-group col-6 mb-8">
                                        <label for="inputPassword4"><FormattedMessage id="system.user-manage.password-input"/></label>
                                        <input type="password" className="form-control " id="inputPassword4" placeholder="Password" name="password" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.password}/>
                                    </div>
                                    : ''
                                }
                                
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4"><FormattedMessage id="system.user-manage.first-name"/></label>
                                    <input type="text" className="form-control" style={{marginBottom: 16}} id="inputEmail4" placeholder="First name" name="firstName" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.firstName}/>
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4"><FormattedMessage id="system.user-manage.last-name" /></label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Last name" name="lastName" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.lastName}/>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4"><FormattedMessage id="system.user-manage.address" /></label>
                                    <input type="text" className="form-control" style={{marginBottom: 16}} id="inputEmail4" placeholder="Address" name="address" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.address}/>
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4"><FormattedMessage id="system.user-manage.mobile"/></label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Phone number" name="phonenumber" onChange={(event) => this.handleOnChangeInPut(event)} value={this.state.phonenumber}/>
                                </div>
                            </div>
                            {this.state.password === '' ? 
                                <div className="row">
                                
                                    <div className="form-group col-6">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.gender"/></label>
                                        <select name="gender" className="form-control" onChange={(event) => this.handleOnChangeInPut(event)}>
                                            <option value="1" selected>Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-6">
                                        <label for="inputState"><FormattedMessage id="system.user-manage.role-id"/></label>
                                        <select name="roleId" className="form-control" onChange={(event) => this.handleOnChangeInPut(event)}>
                                        <option value="R1" selected>Admin</option>
                                        <option value="R2">Doctor</option>
                                        <option value="R3">Patient</option>
                                        </select>
                                    </div>
                                </div> 
                                : ''      
                            }
                                       
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleAddNewUserAndEdit} className='px-3'>
                        {this.props.id === '' ? <FormattedMessage id="system.user-manage.save"/> : <FormattedMessage id="system.user-manage.edit"/>}
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle} className='px-3'>
                        <FormattedMessage id="system.user-manage.close"/>
                    </Button>
                </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



