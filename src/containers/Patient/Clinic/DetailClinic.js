import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import {getSpecialtyByIdService} from '../../../services/userService';
import {getAllCodeService, getAllDoctorByClinic, getClinicByIdService} from '../../../services/userService';
import Header from '../../HomePage/Section/Header';
import Footer from '../../HomePage/Section/Footer';
import './DetailClinic.scss';
import DoctorInfor from '../Doctor/DoctorInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from '../Doctor/DoctorInforExtra';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router';
class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailClinic: {},
            doctorInfors: [],
            province: '',
            listProvince: [],
        }
    }

    // buildAllRequiredDataSelect = (inputData) => {
    //     let result = [];
    //     if(inputData && inputData.length > 0) {
    //         inputData.map((item, index) => {
    //             let object = {};
    //             let language = this.props.language;
    //             object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
    //             object.value = item.keyMap;
    //             result.push(object);
    //         })
    //     }
    //     return result;
    // }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getClinicByIdService(id);
            if(res && res.errCode === 0) {
                this.setState({
                    detailClinic: res.data,
                });
            }
            let resDoctor = await getAllDoctorByClinic(id, 'ALL'); 
            let resProvince = await getAllCodeService('PROVINCE');
            if(resDoctor && resDoctor.errCode === 0 && resProvince && resProvince.errCode === 0) {
                this.setState({
                    doctorInfors: resDoctor.doctorInfo,
                    listProvince: resProvince.data
                })
            }
            
            // if(resProvince && resProvince.errCode === 0) {
            //     //console.log(resProvince)
            //     this.setState({
            //         listProvince: resProvince
            //     })
            //     console.log('Check province state: ', this.state.listProvince)
            // }
            //console.log('Check detail specialty state: ', this.state)
        }

        
            
    }

    handleOnChangeSelect = async(e) => {
        let target = e.target;
        //let name = target.name;
        let value = target.value;
        let location = value;

        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getClinicByIdService(id);
            if(res && res.errCode === 0) {
                this.setState({
                    detailClinic: res.data,
                });
            }
            let resDoctor = await getAllDoctorByClinic(id, location);
            let resProvince = await getAllCodeService('PROVINCE');
            let doctorInfor = {}
            if(resDoctor && resDoctor.errCode === 0 && resProvince && resProvince.errCode === 0) {
                this.setState({
                    doctorInfors: resDoctor.doctorInfo,
                    listProvince: resProvince.data
                });
                let { doctorInfors } = this.state;
                doctorInfor = doctorInfors.map((doctorInfor, index) => {
                    return (
                        <div className="detail-clinic-containter-bottom-list" key={index}>
                            <div className="detail-clinic-containter-bottom-item item-left">
                                <DoctorInfor id={doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : ''} />
                            </div>
                            <div className="detail-clinic-containter-bottom-item item-right">
                                <div className="detail-clinic-containter-bottom-item-top">
                                    <DoctorSchedule doctorInforId = {doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : -1}/>
                                </div>
                                <div className="detail-clinic-containter-bottom-item-bottom">
                                    <DoctorInforExtra id={doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : ''}/>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
            // if(resProvince && resProvince.errCode === 0) {
            //     //console.log(resProvince)
            //     this.setState({
            //         listProvince: resProvince
            //     })
            //     console.log('Check province state: ', this.state.listProvince)
            // }
            //console.log('Check detail specialty state: ', this.state)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {

        if(prevProps.language !== this.props.language) {
            let resProvince = await getAllCodeService('PROVINCE');
            if(resProvince && resProvince.errCode === 0) {
                //console.log(resProvince)
                this.setState({
                    listProvince: resProvince.data
                })
                //console.log('Check province state: ', this.state.listProvince)
            }
        }
        if(prevProps.match.params.id !== this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getClinicByIdService(id);
            if(res && res.errCode === 0) {
                this.setState({
                    detailClinic: res.data,
                });
            }
            let resDoctor = await getAllDoctorByClinic(id, 'ALL'); //Lấy nhều bác sĩ thuộc chuyên khoa
            let resProvince = await getAllCodeService('PROVINCE');
            if(resDoctor && resDoctor.errCode === 0 && resProvince && resProvince.errCode === 0) {
                this.setState({
                    doctorInfors: resDoctor.doctorInfo,
                    listProvince: resProvince.data
                })
            }
            
            // if(resProvince && resProvince.errCode === 0) {
            //     //console.log(resProvince)
            //     this.setState({
            //         listProvince: resProvince
            //     })
            //     console.log('Check province state: ', this.state.listProvince)
            // }
            //console.log('Check detail specialty state: ', this.state)
        }
    }

    render() {
        let {detailClinic, doctorInfors, listProvince} = this.state;
        //console.log("list provice", listProvince);
        let { language } = this.props;
        // if(listProvince && listProvince.length > 0) {
        //     province = listProvince.map((province, index) => {
        //         return (
        //             <option key={index}>{language === LANGUAGES.VI ? province.valueVi : province.valueEn}</option>
        //         )
        //     })
        // }
        
        let doctorInfor = doctorInfors.map((doctorInfor, index) => {
            return (
                <div className="detail-clinic-containter-bottom-list" key={index}>
                    <div className="detail-clinic-containter-bottom-item item-left">
                        <DoctorInfor id={doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : ''} />
                    </div>
                    <div className="detail-clinic-containter-bottom-item item-right">
                        <div className="detail-clinic-containter-bottom-item-top">
                            <DoctorSchedule doctorInforId = {doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : -1}/>
                        </div>
                        <div className="detail-clinic-containter-bottom-item-bottom">
                            <DoctorInforExtra id={doctorInfor && doctorInfor.doctorId ? doctorInfor.doctorId : ''}/>
                        </div>
                    </div>
                </div>
            )
        })

        // let province = listProvince.map((province, index) => {
        //     return (
        //         <option
        //             key={index}
        //             value={province.keyMap}
        //         >{language === LANGUAGES.VI ? province.valueVi : province.valueEn}
        //         </option>
        //     )
        // })
        return (
            <div>
                <Header />
                <div className="detail-clinic-containter">
                    <div className="detail-clinic-containter-content">
                        <div className="detail-clinic-containter-header">
                            {detailClinic.name}
                        </div>
                        <div className="detail-clinic-containter-top">
                            {detailClinic && detailClinic.contentHTML
                                && 
                                <div dangerouslySetInnerHTML={{__html: detailClinic.contentHTML}}>
                                </div>
                            }
                        </div>
                        {doctorInfors ? 
                            <div className="detail-clinic-containter-bottom">
                                <div className="detail-clinic-containter-bottom-title">
                                    Các bác sĩ thuộc {detailClinic.name}
                                </div>
                                {/* <Select value={this.state.selectedProvince} onChange={this.handleOnChangeProvince} options={this.state.listProvince} placeholder={<FormattedMessage id="system.manage-schedule.select-province"/>}/> */}
                                <select onChange={(event) => this.handleOnChangeSelect(event)} name="province" 
                                    className="detail-clinic-containter-bottom-select"
                                >
                                    <option value="ALL">{language === LANGUAGES.VI ? 'Toàn quốc' : 'All province'}</option>
                                    {listProvince && listProvince.length > 0 &&
                                        listProvince.map((province, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={province.keyMap}
                                                >{language === LANGUAGES.VI ? province.valueVi : province.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                {doctorInfor}
                            </div>
                            : 'Không có bác sĩ thuộc phòng khám này'
                        }
                    </div>
                    
                    
                </div>
                <Footer />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
