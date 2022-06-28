import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../HomePage/Section/Header';
import './DetailDoctor.scss';
import { getExtraInforDoctor, getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES} from '../../../utils/constant';
import './DoctorInforExtra.scss';
import { FormattedMessage } from 'react-intl';

class DoctorInforExtra extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailed: false,
            nameClinic: '',
            addressClinic: '',
            price: '',
            payment: '',
            paymentId: '',
        }
    }

    async componentDidMount() {
        if(this.props.id) {
            let data = await getExtraInforDoctor(this.props.id);
            let dataExtra = await getDetailInforDoctor(this.props.id);
            if(data && data.errCode === 0) {
                let nameClinic = data.doctorExtraInfor.nameClinic;
                let addressClinic = data.doctorExtraInfor.addressClinic;
                let price = dataExtra.doctorDetailedInfo.Doctor_Infor.priceTypeData;
                let payment = dataExtra.doctorDetailedInfo.Doctor_Infor.paymentTypeData;
                let paymentId = dataExtra.doctorDetailedInfo.Doctor_Infor.paymentId;
                this.setState({
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    price: this.props.language === LANGUAGES.VI ? price.valueVi : price.valueEn,
                    payment: this.props.language === LANGUAGES.VI ? payment.valueVi : payment.valueEn,
                    paymentId: paymentId
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(this.props.language !== prevProps.language) {
            let data = await getExtraInforDoctor(this.props.id);
            if(data && data.errCode === 0) {
                let nameClinic = data.doctorExtraInfor.nameClinic;
                let addressClinic = data.doctorExtraInfor.addressClinic;
                let price = data.doctorExtraInfor.priceTypeData;
                let payment = data.doctorExtraInfor.paymentTypeData;
                let paymentId = data.doctorExtraInfor.paymentId;
                this.setState({
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    price: this.props.language === LANGUAGES.VI ? price.valueVi : price.valueEn,
                    payment: this.props.language === LANGUAGES.VI ? payment.valueVi : payment.valueEn,
                    paymentId: paymentId
                })
            }
        }
        if(prevProps.id !== this.props.id) {
            let data = await getExtraInforDoctor(this.props.id);
            if(data && data.errCode === 0) {
                let nameClinic = data.doctorExtraInfor.nameClinic;
                let addressClinic = data.doctorExtraInfor.addressClinic;
                let price = data.doctorExtraInfor.priceTypeData;
                let payment = data.doctorExtraInfor.paymentTypeData;
                let paymentId = data.doctorExtraInfor.paymentId;
                this.setState({
                    nameClinic: nameClinic,
                    addressClinic: addressClinic,
                    // price: this.props.language === LANGUAGES.VI ? price.valueVi : price.valueEn,
                    // payment: this.props.language === LANGUAGES.VI ? payment.valueVi : payment.valueEn,
                    // paymentId: paymentId
                })
            }
        }
    }

    onTogglePrice = (isShowDetailed) => {
        this.setState({ 
            isShowDetailed: isShowDetailed
        })
    }

    render() {
        
        let { nameClinic, addressClinic, price, payment, paymentId } = this.state;
        return (
            <div className="doctor-infor-extra-container">
                <div className="doctor-infor-extra-container-title">
                    <span><FormattedMessage id="system.doctor-extra-infor.address-clinic"/></span>
                </div>
                <div className="doctor-infor-extra-clicic-name">
                    { nameClinic }
                </div>
                <div className="doctor-infor-extra-clicic-address">
                    { addressClinic }
                </div>
                {this.state.isShowDetailed === false ?
                    <div className="doctor-infor-extra-clicic-price-false">
                        <span className="doctor-infor-extra-clicic-price-false-content">
                            <FormattedMessage id="system.doctor-extra-infor.price"/> : {price}{this.props.language === LANGUAGES.VI ? 'đ' : '$'}
                        </span>   
                        <span className="doctor-infor-extra-clicic-price-more" onClick={() => this.onTogglePrice(true)}><FormattedMessage id="system.doctor-extra-infor.show-detail"/></span>
                    </div>
                :
                    <div className="doctor-infor-extra-clicic-price-true">
                        <div className="doctor-infor-extra-clicic-price-true-header">
                            <FormattedMessage id="system.doctor-extra-infor.price"/>: 
                        </div> 
                        <div className="doctor-infor-extra-clicic-price-true-body">
                            <div className="doctor-infor-extra-clicic-price-true-body-top">
                                <div className="doctor-infor-extra-clicic-price-true-body-top-left"><FormattedMessage id="system.doctor-extra-infor.price"/>: </div>
                                <div className="doctor-infor-extra-clicic-price-true-body-top-right">{price}{this.props.language === LANGUAGES.VI ? 'đ' : '$'}</div>
                            </div>
                            <div className="doctor-infor-extra-clicic-price-true-body-bottom">
                                <span>{paymentId === 'PAY3' ? <FormattedMessage id="system.doctor-extra-infor.payment.all"/> : this.props.language === LANGUAGES.VI ? `Thanh toán bằng ${payment}` : `The clinic's fee can only be paid by ${payment}`}</span>
                            </div>
                        </div>  
                        <span className="doctor-infor-extra-clicic-price-hide" onClick={() => this.onTogglePrice(false)}><FormattedMessage id="system.doctor-extra-infor.hide"/></span>
                    </div>
                }
                
               
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInforExtra);