import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleByDate } from '../../../services/userService';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { FormattedMessage } from 'react-intl';
import ModalBookSchedule from './ModalBookSchedule';
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDate: [],
            availableTimes: [],
            isOpenModal: false,
            timeBooking: {},
            language: this.props.language
        }
    }

    async componentDidMount() {

        // console.log("Moment vie: ", moment(new Date()).format('dddd - DD/MM'));
        // console.log("Moment en: ", moment(new Date()).locale('en').format('ddd - DD/MM'));

        let arrDate = this.getArrDays(this.state.language);
        if(arrDate && arrDate.length > 0) {
            console.log('arr date: ', arrDate);
            this.setState({
                arrDate: arrDate,
            })
            let response = await getScheduleByDate(this.props.doctorInforId, arrDate[0].value);
            this.setState({
                availableTimes: response.schedules ? response.schedules : []
            })
        }

        

        // let schedules = await getScheduleByDate(25, 1647277200000);
        // console.log(schedules);

        
    }


    getArrDays = (language) => {
        let arrDate = [];
        for(let i = 0 ; i < 7 ; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                if( i === 0) {
                    let labelViToday = moment(new Date()).add(i, 'days').format('DD/MM');
                    let todayVi = `Hôm nay - ${labelViToday}`;
                    object.label = todayVi;
                }else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }else{
                if(i === 0) {
                    let labelEnToday = moment(new Date()).add(i, 'days').locale('en').format('DD/MM');
                    let todayEn = `Today - ${labelEnToday}`
                    object.label = todayEn;
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //startOf('day'): Lấy lúc 00:00:00, valueOf: chuyển sang ms
            arrDate.push(object);
        }
        return arrDate;
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        
        if(prevProps.language !== this.props.language) {
            let arrDate = this.getArrDays(this.props.language);
            this.setState({
                arrDate: arrDate,
            })
        }
        //Vì ban đầu thằng cha là DetailDoctor chưa kịp lấy doctorInfor mà thằng con nó đã lấy của thằng cha rồi => doctorInforId của thằng con có giá trị là -1 => Sau khi thằng cha lấy đc id = 25. Do componentDidMount chỉ render 1 lần => Thằng con vẫn là -1. Mà -1 khác 25 nên phải dùng như bên dưới
        if(prevProps.doctorInforId !== this.props.doctorInforId) {
            console.log('Doctor id schedule: ', this.props.doctorInforId)
            let arrDate = this.getArrDays(this.props.language);
            let response = await getScheduleByDate(this.props.doctorInforId, arrDate[0].value);
            if(response && response.errCode === 0) {
                this.setState({
                    arrDate: arrDate,
                    availableTimes: response.schedules ? response.schedules : []
                })
            }
            
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    handleOnChangSelect = async (event) => {
        this.setState({
            availableTimes: []
        })
        if(this.props.doctorInforId && this.props.doctorInforId !== -1) {
            let doctorInforId = this.props.doctorInforId;
            let dateSelect = event.target.value;
            console.log("Date selected: " + dateSelect);
            let response = await getScheduleByDate(doctorInforId, dateSelect);
            if(response && response.errCode === 0) {
                this.setState({
                    availableTimes: response.schedules ? response.schedules : []
                })
            }
        }
    }

    handleOnClick = (time) => {
        if(time) {
            this.setState({
                isOpenModal: true,
                timeBooking: time
            });
        }
    }

    closeModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let { arrDate, availableTimes } = this.state;
        console.log("Available times check: ", availableTimes)
        console.log('arr date check: ', arrDate)
        let date = arrDate && arrDate.length > 0 && arrDate.map((day, index) => {
            return (
                <option value={day.value} key={index}>{day.label}</option>
            )
        })
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select className="all-schedule-list" onChange={(event) => this.handleOnChangSelect(event)}>
                        {date}
                    </select>
                </div>
                <div className="doctor-schedule-text">
                    <i className="fa-solid fa-calendar-days calendar-icon"></i>
                    <p className="doctor-schedule-text-content"><FormattedMessage id="system.doctor-schedule.schedule"/></p>
                </div>
                <div className="all-available-time">
                    {availableTimes && availableTimes.length > 0 ? 
                        availableTimes.map((time, index) => {
                            return (
                                <div className="all-available-time-item" key={index} onClick={() => this.handleOnClick(time)}>
                                    <p className="all-available-time-item-content" >{this.props.language === LANGUAGES.VI ? time.timeTypeData.valueVi  : time.timeTypeData.valueEn}</p>
                                </div>
                            )
                        })
                    : <div><FormattedMessage id="system.doctor-schedule.no-schedule"/></div>}
                </div>
                {availableTimes && availableTimes.length > 0 ? 
                    <div className="doctor-schedule-container-book">
                        <div className="doctor-schedule-container-select"><FormattedMessage id="system.doctor-schedule.select"/></div>
                        <i className="fa-solid fa-hand-point-up"></i>
                        <div className="doctor-schedule-container-freebooking"><FormattedMessage id="system.doctor-schedule.and"/> <FormattedMessage id="system.doctor-schedule.free-booking"/></div>
                    </div>
                : ''} 
               <ModalBookSchedule isOpenModal={this.state.isOpenModal} closeModal={this.closeModal} doctorId={this.props.doctorInforId} time={this.state.timeBooking}/>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {  
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);