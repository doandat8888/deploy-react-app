import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DatePicker from '../../../components/Input/DatePicker';
import './ModalBookSchedule.scss';
import * as actions from '../../../store/actions/adminActions'
import DoctorProfile from './DoctorProfile';
import { postPatientBookAppointment, getDetailInforDoctor } from '../../../services/userService';
import { textSpanIntersectsWithTextSpan } from 'typescript';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';




class ModalBookSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: [],
            selectedGender: {},
            doctorId: '',
            timeType: '',
            date: '',
            time: '',
            addressClinic: '',
        }
    }

    

    async componentDidMount() {
        this.props.getGenders();
        let doctorInfor = await getDetailInforDoctor(Number.parseInt(this.props.doctorId));
        console.log(doctorInfor);
        // let addressClinic = doctorInfor.doctorDetailedInfo.Doctor_Infor.addressClinic;
        // this.setState({
        //     addressClinic: addressClinic,
        // })
        // this.setState({
        //     doctorId: this.props.doctorId
        // })
        //console.log((this.props.doctorId.toString()));
        // console.log(this.props.doctorId)
        // console.log(typeof Number.parseInt(this.props.doctorId));
    }

    handleOnChangeInput = (event, id) => {
        let value = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = value;
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDate = (date) => {
        this.setState({
            birthday: date[0]
        })
    }


    toggle = () => {
        
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if(data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    handleOnChangeSelect = (selectedGender) => {
        this.setState({
            selectedGender: selectedGender
        })
    }

    handleConfirmBooking = async () => {
        console.log("Thông tin đặt lịch: ", this.state);
        //console.log(this.props.time.timeType)
        let date = this.props.time.date;
        let res = await postPatientBookAppointment({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            time: this.props.language === LANGUAGES.VI ? this.props.time.timeTypeData.valueVi : this.props.time.timeTypeData.valueEn,
            addressClinic: this.state.addressClinic
        })
        if(res && res.errCode === 0) {
            toast.success(this.props.language === LANGUAGES.VI ? 'Đặt lịch thành công' : 'Book a new appointment succeed!');
            this.props.closeModal();
        }else {
            toast.error(this.props.language === LANGUAGES.VI ? 'Đặt lịch thất bại' : "Book a new appointment error!");
        }
    }
    
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            });
        }
        if(this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            });
        }
        if(this.props.doctorId !== prevProps.doctorId) {
            let doctorInfor = await getDetailInforDoctor(this.props.doctorId);
            let addressClinic = doctorInfor.doctorDetailedInfo.Doctor_Infor.addressClinic;
            this.setState({
                addressClinic: addressClinic,
            })
            this.setState({
                doctorId: this.props.doctorId
            })
            console.log(doctorInfor);
        }
        if(this.props.time !== prevProps.time) {
            this.setState({
                timeType: this.props.time.timeType,
                time: this.props.language === LANGUAGES.VI ? this.props.time.timeTypeData.valueVi : this.props.time.timeTypeData.valueEn,
                date: this.props.time.date
            })
        }
    }


    render() {
        let { isOpenModal, closeModal } = this.props;
        return (
            <div>
                <Modal 
                    isOpen={isOpenModal} 
                    toggle={this.toggle}
                    size='lg'
                    className="modal-book-schedule-container"
                    centered
                >
                    <div className="modal-book-schedule-content">
                        <div className="modal-book-schedule-header">
                            <div className="modal-book-schedule-header-left">
                                <span className="modal-book-schedule-header-left-content"><FormattedMessage id="system.patient-info.booking-info" /></span>
                            </div>
                            <div className="modal-book-schedule-header-right">
                                <span onClick={closeModal}><i className="fas fa-times modal-book-schedule-header-right-icon"></i></span>
                            </div>
                        </div>
                        <DoctorProfile doctorId={this.props.doctorId} isShowInforDoctor={false} timeBooking={this.props.time}/>
                        <div className="modal-book-schedule-body">
                            <div className="modal-book-schedule-body-doctor-infor"></div>
                            {/* <div className="modal-book-schedule-body-price">
                                Giá khám: 500.000
                            </div> */}
                            <div className="row modal-book-schedule-body-book">
                                <div className="col-6 form-group mb-32">
                                    <label><FormattedMessage id="system.patient-info.first-name" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'firstName')}/>
                                </div>
                                <div className="col-6 form-group mb-32">
                                    <label><FormattedMessage id="system.patient-info.last-name" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'lastName')}/>
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="system.patient-info.mobile" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}/>
                                </div>
                                <div className="col-6 form-group mb-32">
                                    <label><FormattedMessage id="system.patient-info.email" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'email')}/>
                                </div>
                                <div className="col-6 form-group ">
                                    <label><FormattedMessage id="system.patient-info.address" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'address')}/>
                                </div>
                                <div className="col-6 form-group mb-32">
                                    <label><FormattedMessage id="system.patient-info.reason" /></label>
                                    <input className="form-control" onChange={(event) => this.handleOnChangeInput(event, 'reason')}/>
                                </div>
                                <div className="col-6 form-group mb-32">
                                    <label><FormattedMessage id="system.patient-info.birthday" /></label>
                                    <DatePicker 
                                        className="form-control"
                                        value={this.state.birthday}
                                        minDate={this.state.minDate}
                                        onChange={this.handleOnChangeDate}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="system.patient-info.gender" /></label>
                                    <Select 
                                        options={this.state.genders}
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeSelect}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-book-schedule-footer">
                            <button className="modal-book-schedule-footer-button-confirm" onClick={this.handleConfirmBooking}><FormattedMessage id="system.patient-info.confirm" /></button>
                            <button className="modal-book-schedule-footer-button-delete" onClick={closeModal}><FormattedMessage id="system.patient-info.close" /></button>
                        </div>
                    </div>
                    
                    
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => {
            dispatch(actions.fetchGenderStart())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBookSchedule);



