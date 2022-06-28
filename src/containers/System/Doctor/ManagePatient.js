import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import {FormattedMessage} from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminActions';
import { LANGUAGES, CRUD_USER } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import {toast} from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { bulkCreateSchedule, getBookingInfor, sendBill } from '../../../services/userService';
import ModalSendBill from './ModalSendBill';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            // isSelected: false,
            minDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            bookingInfos: [],
            dataSendBill: {},
            isOpenModal: false,
        }
    }

    async componentDidMount() {
        let { userInfo } = this.props;
        console.log(userInfo);
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        console.log(formatedDate);
        let bookingInfos = await getBookingInfor(userInfo.id, formatedDate);
        if(bookingInfos) {
            this.setState({
                bookingInfos: bookingInfos.bookingInfor
            });
        }
        console.log("Type of user info id: ", typeof userInfo.id);
        console.log("Booking info: ", this.state.bookingInfos);
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.userInfo !== this.props.userInfo) {
            let { userInfo } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            //console.log(formatedDate);
            let bookingInfos = await getBookingInfor(userInfo.id, formatedDate);
            if(bookingInfos) {
                this.setState({
                    bookingInfos: bookingInfos.bookingInfor
                });
            }
            console.log("Booking info: ", this.state.bookingInfos);
        }
    }

    handleOnChangeDate = async(data) => {
        this.setState({
            currentDate: data
        });
        let { userInfo } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        //console.log(formatedDate);
        let bookingInfos = await getBookingInfor(userInfo.id, formatedDate);
        if(bookingInfos) {
            this.setState({
                bookingInfos: bookingInfos.bookingInfor
            });
        }
        //console.log("Booking info: ", this.state.bookingInfos);
    }

    handleBtnConfirm = async (item) => {
        //console.log("Item: ", item);
        let dataSendBill = {
            email: item.patientData.email,
            firstName: item.patientData.firstName,
            lastName: item.patientData.lastName,
            doctorId: item.doctorId,
            patientId: item.patientId,
            timeType: item.timeType
        }
        console.log("dataSendBill object: ", dataSendBill);
        await this.setState({
            isOpenModal: true,
            dataSendBill: dataSendBill
        });
    }

    onHandleToggleForm = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    onSendBill = async(dataSend) => {
        //console.log("Datasend: ", dataSend);
        let res = await sendBill(dataSend);
        if(res && res.errCode === 0) {
            if(this.props.language === LANGUAGES.EN) {
                toast.success('Update patient status successfully!');
            }else {
                toast.success('Cập nhật trạng thái đặt lịch thành công')
            }
            await this.fetchAllBookings();
        }else {
            if(this.props.language === LANGUAGES.EN) {
                toast.success('Update patient status failed!');
            }else {
                toast.success('Cập nhật trạng thái đặt lịch thất bại')
            }
        }
        this.onHandleToggleForm();
    }

    fetchAllBookings = async () => {
        let { userInfo } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        //console.log(formatedDate);
        let bookingInfos = await getBookingInfor(userInfo.id, formatedDate);
        if(bookingInfos) {
            this.setState({
                bookingInfos: bookingInfos.bookingInfor
            });
        }
    }

    render() {
        let { bookingInfos } = this.state;
        let bookingInfo = bookingInfos && bookingInfos.length > 0 && bookingInfos.map((bookingInfo, index) => {
            let nameEn = `${bookingInfo.patientData.lastName} ${bookingInfo.patientData.firstName}`;
            let nameVi = `${bookingInfo.patientData.firstName} ${bookingInfo.patientData.lastName}`;
            let timeEn = bookingInfo.timeTypeDataBooking.valueEn;
            let timeVi = bookingInfo.timeTypeDataBooking.valueVi;
            let genderEn = bookingInfo.patientData.gender === "M" ? "Male" : "Female";
            let genderVi = bookingInfo.patientData.gender === "M" ? "Nam" : "Nữ";
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</td>
                    <td>{this.props.language === LANGUAGES.VI ? timeVi : timeEn}</td>
                    <td>{bookingInfo.patientData.phonenumber}</td>
                    <td>{bookingInfo.patientData.address}</td>
                    <td>{this.props.language === LANGUAGES.VI ? genderVi : genderEn}</td>
                    <td>
                        <div className="booking-table-btn">
                            <button className="btn btn-warning" onClick={() => this.handleBtnConfirm(bookingInfo)}>
                                <FormattedMessage id="system.manage-patient.confirm"/>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-container-title">
                    <FormattedMessage id="system.manage-patient.title" />
                </div>
                <div className="manage-schedule-container-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="system.manage-patient.select-date"/></label>
                                <DatePicker 
                                    className="form-control"
                                    value={this.state.minDate}
                                    minDate={this.state.minDate}
                                    onChange={this.handleOnChangeDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='manage-schedule-container-users-table'>
                    <table id="customers">
                        <tr>
                            <th><FormattedMessage id="system.manage-patient.numerical-order"/></th>
                            <th><FormattedMessage id="system.user-manage.fullname"/></th>
                            <th><FormattedMessage id="system.manage-patient.time"/></th>
                            <th><FormattedMessage id="system.user-manage.mobile"/></th>
                            <th><FormattedMessage id="system.user-manage.address"/></th>
                            <th><FormattedMessage id="system.user-manage.gender"/></th>
                            <th><FormattedMessage id="system.manage-patient.actions"/></th>
                        </tr>
                        {bookingInfo}
                    </table>
                    <ModalSendBill 
                        isOpenModal={this.state.isOpenModal} dataSendBill={this.state.dataSendBill} 
                        onToggleForm={this.onHandleToggleForm}
                        onHandleSendBill={this.onSendBill}
                    />
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        dataTime: state.admin.dataTime,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => {
            dispatch(actions.fetchAllDoctors());
        },
        fetchAllScheduleTime: () => {
            dispatch(actions.fetchAllScheduleTime());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
