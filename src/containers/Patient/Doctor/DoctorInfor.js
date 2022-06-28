import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorInfor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES} from '../../../utils/constant';
import { Link } from 'react-router-dom';
class DoctorInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: {},
        }
    }

    async componentDidMount() {
        if(this.props.id) {
            let id = this.props.id;
            console.log(id);
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0) {
                this.setState({
                    doctorInfor: res.doctorDetailedInfo
                });
            }
        }else {
            console.log("Không nhận được id")
        }
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.id !== this.props.id) {
            let id = this.props.id;
            console.log(id);
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0) {
                this.setState({
                    doctorInfor: res.doctorDetailedInfo
                });
            }
        }
    }

    handleEventOnClick = (doctorId) => {
        return (
            this.props.history.push(`/detail-doctor/${doctorId}`)
        )
    }

    render() {
        let { doctorInfor } = this.state;
        console.log(doctorInfor);
        let nameVi = '';
        let nameEn = '';
        let provinceVi = '';
        let provinceEn = '';
        if(doctorInfor && doctorInfor.positionData) {
            console.log(doctorInfor.positionData)
            nameVi = `${doctorInfor.positionData.valueVi} ${doctorInfor.firstName} ${doctorInfor.lastName}`;
            nameEn = `${doctorInfor.positionData.valueEn} ${doctorInfor.lastName} ${doctorInfor.firstName}`;
        }
        if(doctorInfor && doctorInfor.Doctor_Infor && doctorInfor.Doctor_Infor.provinceTypeData) {
            console.log(doctorInfor.Doctor_Infor.provinceTypeData);
            provinceVi = `${doctorInfor.Doctor_Infor.provinceTypeData.valueVi}`;
            provinceEn = `${doctorInfor.Doctor_Infor.provinceTypeData.valueEn}`;
        }
        
        return (
            <div className="doctor-infor-container">
                <div className="doctor-infor-container-header">
                    <div className="doctor-infor-container-header-left">
                        <img src={doctorInfor && doctorInfor.image ? doctorInfor.image : ''} className="doctor-infor-container-header-left-img"></img>
                        <button className="doctor-infor-container-header-left-button"><Link to={`/detail-doctor/${this.props.id}`} className="doctor-infor-container-header-left-button-content">Xem thêm</Link></button>
                    </div>
                    <div className="doctor-infor-container-header-right">
                        <div className="doctor-infor-container-header-right-top">
                            <p>{this.props.language === LANGUAGES.EN ? nameEn : nameVi}</p>
                        </div>
                        <div className="doctor-infor-container-header-right-bottom">
                            <p>{doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.description ? doctorInfor.Markdown.description : ''}</p>
                            <div className="doctor-infor-container-header-right-bottom-position">
                                <i class="doctor-infor-container-header-right-bottom-position-icon fa-solid fa-location-dot"></i>
                                <p>{this.props.language === LANGUAGES.EN ? provinceEn : provinceVi}</p>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfor);