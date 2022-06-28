import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctor } from '../../../services/userService';
import './DoctorProfile.scss';
import _ from 'lodash';
import moment from 'moment';

class DoctorProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorImg: '',
            price: '',
            description: '',
            position: '',
            fullName: '',
            timeBooking: {},
        }
    }

    async componentDidMount() {
        this.setState({
            timeBooking: this.props.timeBooking
        })
        if(this.props.doctorId) {
            let doctorId = this.props.doctorId;
            let data = await getProfileDoctor(doctorId);
            console.log(data);
            if(data) {
                if(data.profileDoctor.Markdown && data.profileDoctor.Markdown.description && data.profileDoctor.Doctor_Infor && data.profileDoctor.Doctor_Infor.priceTypeData && data.profileDoctor.positionData && data.profileDoctor.image) {
                    let doctorImg = data.profileDoctor.image;
                    let priceData = data.profileDoctor.Doctor_Infor.priceTypeData;
                    let description = data.profileDoctor.Markdown.description;
                    let positionData = data.profileDoctor.positionData;
                    this.setState({
                        doctorImg: doctorImg,
                        price: this.props.language === LANGUAGES.VI ? priceData.valueVi : priceData.valueEn,
                        description: description,
                        position: this.props.language === LANGUAGES.VI ? positionData.valueVi : positionData.valueEn,
                        fullName: this.props.language === LANGUAGES.VI ? `${data.profileDoctor.firstName} ${data.profileDoctor.lastName}` : `${data.profileDoctor.lastName} ${data.profileDoctor.firstName}`
                    });
                }
                
            }
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.timeBooking !== this.props.timeBooking) {
            this.setState({
                timeBooking: this.props.timeBooking
            })
        }
        if(prevProps.language !== this.props.language) {
            if(this.props.doctorId) {
                let doctorId = this.props.doctorId;
                let data = await getProfileDoctor(doctorId);
                console.log(data);
                if(data) {
                    if(data.profileDoctor.Markdown && data.profileDoctor.Markdown.description && data.profileDoctor.Doctor_Infor && data.profileDoctor.Doctor_Infor.priceTypeData && data.profileDoctor.positionData && data.profileDoctor.image) {
                        let doctorImg = data.profileDoctor.image;
                        let priceData = data.profileDoctor.Doctor_Infor.priceTypeData;
                        let description = data.profileDoctor.Markdown.description;
                        let positionData = data.profileDoctor.positionData;
                        this.setState({
                            doctorImg: doctorImg,
                            price: this.props.language === LANGUAGES.VI ? priceData.valueVi : priceData.valueEn,
                            description: description,
                            position: this.props.language === LANGUAGES.VI ? positionData.valueVi : positionData.valueEn,
                            fullName: this.props.language === LANGUAGES.VI ? `${data.profileDoctor.firstName} ${data.profileDoctor.lastName}` : `${data.profileDoctor.lastName} ${data.profileDoctor.firstName}`
                        });
                    }
                    
                }
            }
        }
    }


    // renderTimeBooking = (timeBooking) => {
    //     if(timeBooking && !_.isEmpty(timeBooking)) {
    //         return (
    //             <>
    //                 <div>
    //                     {this.props.language === LANGUAGES.VI ? timeBooking.valueVi : timeBooking.valueEn}
    //                 </div>
    //             </>
                
    //         )
    //     }
    //     return <></>
    // }

    formatTime = (timeBooking) => {
        if(timeBooking && !_.isEmpty(timeBooking)) {
            let date = this.props.language === LANGUAGES.VI ? 
                moment.unix(+timeBooking.date / 1000).format('dddd - DD/MM/YYYY')   //do unix tính theo đơn vị ms nên phải đem chia 1000 để ra s
                :
                moment.unix(+timeBooking.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            if(this.props.language === LANGUAGES.VI) {
                return `${timeBooking.timeTypeData.valueVi} - ${date}`
            }else {
                return `${timeBooking.timeTypeData.valueEn} - ${date}`
            }
        }else {
            return '';
        }
    }

    render() {
        let { doctorImg, price, description, position, fullName, timeBooking} = this.state;
        let time = this.formatTime(timeBooking);
        return (
            <div className="doctor-profile-container">
                <div className="doctor-profile-container-content">
                    <div className="doctor-profile-container-content-img">
                        <img src={doctorImg} className="doctor-profile-container-content-img-content"/>
                    </div>
                    <div className="doctor-profile-container-content-description">
                        <div className="doctor-profile-container-content-description-header">
                            <span>{position} {fullName}</span>
                        </div>
                        {this.props.isShowInforDoctor === true ? <span>{description}</span> : 
                            <div>
                                {time}
                                <div><FormattedMessage id="system.patient-info.free-booking" /></div>
                            </div>
                            
                        }
                    </div>
                </div>
                <div className="doctor-profile-container-price">
                    <FormattedMessage id="system.patient-info.price" />: {price}{this.props.language === LANGUAGES.VI ? 'VNĐ' : '$'}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);