import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminActions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_USER } from '../../../utils/constant';
import { getDetailInforDoctor } from '../../../services/userService';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry'},
//     { value: 'vanila', label: 'Vanila'}
// ]

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            contentMarkdown: '', 
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            hasOldData: false,
            action: '',
            price: '',
            payment: '',
            province: '',
            specialtyName: '',
            clinicName: '',

            //save infor doctor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    
    componentDidMount() {
        this.props.fetchAllDoctorsStart();
        this.props.getRequiredDoctorInfor();
        this.props.getAllSpecialty();
        this.props.getAllClinic();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
            });
        }
        if(prevProps.listSpecialty !== this.props.listSpecialty) {
            let listSpecialty = this.buildDataInput(this.props.listSpecialty);
            this.setState({
                listSpecialty: listSpecialty
            })
        }
        if(prevProps.listClinic !== this.props.listClinic) {
            let listClinic = this.buildDataInput(this.props.listClinic);
            this.setState({
                listClinic: listClinic
            });
            console.log('List clinic: ', this.state.listClinic);
        }
        if(prevProps.language !== this.props.language) {
            let allDoctors = this.buildDataInputSelect(this.props.allDoctors);
            let { allRequiredData } = this.props;
            let allPrices = this.buildAllRequiredDataSelect(allRequiredData.resPrice);
            let allPayments = this.buildAllRequiredDataSelect(allRequiredData.resPayment);
            let allProvinces = this.buildAllRequiredDataSelect(allRequiredData.resProvince);
            //let allSpecialty = this.buildAllRequiredDataSelect(allRequiredData.resSpecialty);
            this.setState({
                allDoctors: allDoctors,
                listPrice: allPrices,
                listPayment: allPayments,
                listProvince: allProvinces,
                //listSpecialty: allSpecialty
            });
            
        }
        if(prevProps.allRequiredData !== this.props.allRequiredData) {
            let { allRequiredData } = this.props;
            //console.log(allRequiredData.resPrice);
            let allPrices = this.buildAllRequiredDataSelect(allRequiredData.resPrice);
            let allPayments = this.buildAllRequiredDataSelect(allRequiredData.resPayment);
            let allProvinces = this.buildAllRequiredDataSelect(allRequiredData.resProvince);
            //let allSpecialty = this.buildAllRequiredDataSelect(allRequiredData.resSpecialty);
            this.setState({
                listPrice: allPrices,
                listPayment: allPayments,
                listProvince: allProvinces,
                //listSpecialty: allSpecialty
            });
        }
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleOnChange = async (selectedOption) => {
        this.setState({
            selectedOption,
        })
        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.doctorDetailedInfo && res.doctorDetailedInfo.Markdown 
            && res.doctorDetailedInfo.Doctor_Infor) {
            let markdown = res.doctorDetailedInfo.Markdown;
            let price = res.doctorDetailedInfo.Doctor_Infor.priceTypeData;
            let payment = res.doctorDetailedInfo.Doctor_Infor.paymentTypeData;
            let province = res.doctorDetailedInfo.Doctor_Infor.provinceTypeData;
            //let specialty = res.doctorDetailedInfo.Doctor_Infor.specialty;
            let nameClinic = res.doctorDetailedInfo.Doctor_Infor.nameClinic;
            let addressClinic = res.doctorDetailedInfo.Doctor_Infor.addressClinic;
            let note = res.doctorDetailedInfo.Doctor_Infor.note;
            

            let paymentId = res.doctorDetailedInfo.Doctor_Infor.paymentId;
            let priceId = res.doctorDetailedInfo.Doctor_Infor.priceId;
            let provinceId = res.doctorDetailedInfo.Doctor_Infor.provinceId;
            let specialtyId = res.doctorDetailedInfo.Doctor_Infor.specialtyId;
            let clinicId = res.doctorDetailedInfo.Doctor_Infor.clinicId;
            let {listPrice, listPayment, listProvince, listSpecialty, listClinic} = this.state;
            let findPrice = listPrice.find(item => {
                return item && item.value === priceId;
            })

            let findPayment = listPayment.find(item => {
                return item && item.value === paymentId;
            })
            let findProvince = listProvince.find(item => {
                return item && item.value === provinceId;
            })
            
            let findSpecialty = listSpecialty.find(item => {
                return item && item.value === specialtyId;
            })

            let findClinic = listClinic.find(item => {
                return item && item.value === clinicId
            })


            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                price: this.props.language === LANGUAGES.VI ? price.valueVi : price.valueEn,
                payment: this.props.language === LANGUAGES.VI ? payment.valueVi : payment.valueEn,
                province: this.props.language === LANGUAGES.VI ? province.valueVi : province.valueEn,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: findPrice,
                selectedPayment: findPayment,
                selectedProvince: findProvince,
                selectedSpecialty: findSpecialty,
                selectedClinic: findClinic,
                hasOldData: true, //Cho biết là bác sĩ đã có dữ liệu hay chưa
            });
            console.log(this.state);
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                price: '',
                payment: '',
                province: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                hasOldData: false, 
            })
        }
        console.log(res.doctorDetailedInfo);
    }

    handleTextChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleSaveDoctor = () => {
        let { hasOldData } = this.state;
        console.log("Check save state: ", this.state);
        this.props.saveInforDoctor({
            doctorId: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: hasOldData ? CRUD_USER.EDIT : CRUD_USER.CREATE,

            //Save extra doctor infor
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
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

    buildDataInput = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let name = item.name
                object.label = name;
                object.value = item.id;
                result.push(object);
            })
        }
        return result
    }

    buildAllRequiredDataSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let language = this.props.language;
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        // if(type === "PAYMENT") {
        //     if(inputData && inputData.length > 0) {
        //         inputData.map((item, index) => {
        //             let object = {};
        //             let language = this.props.language;
        //             object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        //             object.value = item.id;
        //             result.push(object);
        //         })
        //     }
        // }
        // if(type === "PROVINCE") {
        //     if(inputData && inputData.length > 0) {
        //         inputData.map((item, index) => {
        //             let object = {};
        //             let language = this.props.language;
        //             object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        //             object.value = item.id;
        //             result.push(object);
        //         })
        //     }
        // }
        return result;
    }

    handleOnChangePrice = (selectedPrice) => {
        this.setState({
            selectedPrice: selectedPrice
        });
    }

    handleOnChangePayment = (selectedPayment) => {
        this.setState({
            selectedPayment: selectedPayment
        })
    }

    handleOnChangeProvince = (selectedProvince) => {
        this.setState({
            selectedProvince: selectedProvince
        })
    }

    handleOnChangeSpecialty = (selectedSpecialty) => {
        this.setState({
            selectedSpecialty: selectedSpecialty
        })
    }

    handleOnChangeClinic = (selectedClinic) => {
        this.setState({
            selectedClinic: selectedClinic
        })
    }

    handleOnChangeText = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="manage-doctor-container">
                        <div className="manage-doctor-title">
                            <FormattedMessage id="system.homepage.create-doctor-info" />
                        </div>
                        <div className="manage-doctor-more-info">
                            <div className="manage-doctor-info-left">
                                <div className="manage-doctor-info-left-header">
                                    <p className="manage-doctor-info-left-header-choose"><FormattedMessage id="system.homepage.choose-doctor" /></p>
                                </div>
                                <Select value={this.state.selectedOption} onChange={this.handleOnChange} options={this.state.allDoctors} placeholder={'Chọn bác sĩ'}/>
                            </div>
                            <div className="manage-doctor-info-right">
                                <div className="manage-doctor-info-right-header">
                                    <p className="manage-doctor-info-right-header-choose"><FormattedMessage id="system.homepage.introduction" /></p>
                                </div>
                                <textarea className="manage-doctor-info-right-textarea" onChange= {this.handleTextChange} value={this.state.description}></textarea>
                            </div>
                        </div>
                        <div className="manage-doctor-more-info-extra row">
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.select-price"/></label>
                                <Select value={this.state.selectedPrice} onChange={this.handleOnChangePrice} options={this.state.listPrice} placeholder={<FormattedMessage id="system.manage-schedule.select-price"/>}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.select-payment"/></label>
                                <Select value={this.state.selectedPayment} onChange={this.handleOnChangePayment} options={this.state.listPayment} placeholder={<FormattedMessage id="system.manage-schedule.select-payment"/>}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.select-province"/></label>
                                <Select value={this.state.selectedProvince} onChange={this.handleOnChangeProvince} options={this.state.listProvince} placeholder={<FormattedMessage id="system.manage-schedule.select-province"/>}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.select-specialty"/></label>
                                <Select value={this.state.selectedSpecialty} onChange={this.handleOnChangeSpecialty} options={this.state.listSpecialty} placeholder={<FormattedMessage id="system.manage-schedule.select-specialty"/>}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.select-clinic"/></label>
                                <Select value={this.state.selectedClinic} onChange={this.handleOnChangeClinic} options={this.state.listClinic} placeholder={<FormattedMessage id="system.manage-schedule.select-clinic"/>}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.clinic-name"/></label>
                                <input className="form-control" onChange={this.handleOnChangeText} name="nameClinic" value={this.state.nameClinic}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.clinic-address"/></label>
                                <input className="form-control" onChange={this.handleOnChangeText} name="addressClinic" value={this.state.addressClinic}/>
                            </div>
                            <div className="col-4 form-group manage-doctor-more-info-extra-content mb-8">
                                <label className="mb-8"><FormattedMessage id="system.manage-schedule.note"/></label>
                                <input className="form-control" onChange={this.handleOnChangeText} name="note" value={this.state.note}/>
                            </div>
                        </div>
                        <div className="manage-doctor-editor">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown}/>
                        </div>
                        <button className="btn btn-primary save-user" onClick={this.handleSaveDoctor}><FormattedMessage id={this.state.hasOldData ? "system.homepage.save-info" : "system.homepage.create-doctor-info"} /></button>
                    </div>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredData: state.admin.allRequiredData,
        listSpecialty: state.admin.allSpecialty,
        listClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => {
            dispatch(actions.fetchAllUsersStart());
        },
        deleteUser: (userId) => {
            dispatch(actions.deleteUser(userId));
        },
        fetchAllDoctorsStart: () => {
            dispatch(actions.fetchAllDoctors());
        },
        saveInforDoctor: (data) => {
            dispatch(actions.saveDetailedInforDoctor(data));
        },
        getRequiredDoctorInfor: () => {
            dispatch(actions.getRequiredDoctorInfor());
        },
        getAllSpecialty: () => {
            dispatch(actions.getAllSpecialty());
        },
        getAllClinic: () => {
            dispatch(actions.getAllClinic());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
