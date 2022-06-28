import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import {FormattedMessage} from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminActions';
import { LANGUAGES, CRUD_USER } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import {toast} from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { bulkCreateSchedule } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            dataTime: [],
            selectedOption: '',
            currentDate: new Date(),
            isSelected: false,
            minDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
            });
        }
        if(prevProps.language !== this.props.language) {
            let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
            });
        }
        if(prevProps.dataTime !== this.props.dataTime) {
            let data = this.props.dataTime;
            data = data.map((item) => {
                item.isSelected = false;
                return item;
            })
            console.log(data);
            this.setState({
                dataTime: this.props.dataTime
            })
        }
    }


    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let language = this.props.language;
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleOnChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
    }

    handleSelected = (time) => {
        let { dataTime } = this.state;
        dataTime = dataTime.map(item => {
            if(item.id === time.id) {
                item.isSelected = !item.isSelected;
                return item;
            }
            this.setState({
                dataTime: dataTime
            })
        })
    }

    handleOnChangeDate = (data) => {
        this.setState({
            currentDate: data
        })
    }

    saveDoctorShedule =  async () => {
        let result = [];
        let { selectedOption, currentDate, dataTime } = this.state;
        if(!selectedOption) {
            toast.error('Please choose doctor first');
            return;
        }if(!currentDate) {
            toast.error('Please choose current date');
            return;
            
        }
        console.log(currentDate);
        let formatedDate = new Date(currentDate).getTime();
        console.log(formatedDate);
        if(dataTime && dataTime.length > 0) {
            let selectedTime = dataTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                    let object = {};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                })
            }else{
                toast.error('Please choose schedule time')
            }
        }
        console.log(result);
        let res = await bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedOption.value, 
            date: formatedDate
        });
    }


    render() {
        let {dataTime} = this.state;
        let time = dataTime.map((timeSchedule, index) => {
            return (
                <div className={timeSchedule.isSelected ? "pick-hour-time-selected btn" : "pick-hour-time btn"} onClick={() => this.handleSelected(timeSchedule)}>
                    <div>{this.props.language === LANGUAGES.VI ? timeSchedule.valueVi : timeSchedule.valueEn}</div>
                </div>
            )
        })
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-container-title">
                    <FormattedMessage id="system.manage-schedule.title" />
                </div>
                <div className="manage-schedule-container-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="system.manage-schedule.select-doctor"/></label>
                                <Select options={this.state.allDoctors} onChange={this.handleOnChange} value={this.state.selectedOption}/>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="system.manage-schedule.select-date"/></label>
                                <DatePicker 
                                    className="form-control"
                                    value={this.state.minDate}
                                    minDate={this.state.minDate}
                                    onChange={this.handleOnChangeDate}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {time && time.length > 0 ? time : ''}
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={this.saveDoctorShedule}><FormattedMessage id="system.manage-schedule.save"/></button>
                    </div>
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
        dataTime: state.admin.dataTime
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
