import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import './ModalSendBill.scss';
import CommonUtils from '../../../utils/CommonUtils';



class ModalSendBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgURL: '',
            avatar: '',
            firstName: '',
            lastName: '',
            email: '',
            patientId: '',
            doctorId: '',
            timeType: '',
        }
    }

    

    async componentDidMount() {
        let { dataSendBill } = this.props;
        await this.setState({ 
            email: dataSendBill.email,
            firstName: dataSendBill.firstName,
            lastName: dataSendBill.lastName,
            patientId: dataSendBill.patientId,
            doctorId: dataSendBill.doctorId,
            timeType: dataSendBill.timeType,
        })
        //console.log("Check send: ", this.state);
    }
    
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.dataSendBill !== this.props.dataSendBill) {
            await this.setState({ 
                email: this.props.dataSendBill.email,
                firstName: this.props.dataSendBill.firstName,
                lastName: this.props.dataSendBill.lastName,
                patientId: this.props.dataSendBill.patientId,
                doctorId: this.props.dataSendBill.doctorId,
                timeType: this.props.dataSendBill.timeType,
            })
            //console.log("Check send: ", this.state);
        }
    }

    toggle = () => {
        this.props.onToggleForm();
    }

    handleOnChangeImage = async(event) => {
        let files = event.target.files;
        let file = files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            console.log(objectURL);
            this.setState({
                imgURL: objectURL,
                avatar: base64
            });
        }
    }

    onHandleSendBill = () => {
        this.props.onHandleSendBill(this.state);
    }

    render() {
        let { isOpenModal, dataSendBill } = this.props;
        return (
            <Modal
                isOpen={isOpenModal} 
                toggle={this.toggle}
                size='lg'
                className="modal-send-bill-container"
                centered
            >
                <ModalHeader className="modal-send-bill-header" toggle={this.toggle}>
                    <FormattedMessage id="system.manage-patient.send-bill" />
                </ModalHeader>
                <ModalBody className="modal-send-bill-body">
                    <div className="modal-send-bill-body-left">
                        <p className="modal-send-bill-body-left-content">
                            <FormattedMessage id="system.manage-patient.email-patient"/>
                        </p>
                        <input type="text" className="modal-send-bill-body-left-button form-control" placeholder="Email" value={dataSendBill.email}/>
                    </div>
                    <div className="modal-send-bill-body-right form-group">
                        <p className="modal-send-bill-body-left-content">
                            <FormattedMessage id="system.manage-patient.choose-file"/>
                        </p>
                        <input type="file" className="form-control-file" onChange={(event) => this.handleOnChangeImage(event)}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onHandleSendBill} className='px-3'>
                        <FormattedMessage id="system.manage-patient.send"/>
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle} className='px-3'>
                        <FormattedMessage id="system.manage-patient.cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSendBill);



