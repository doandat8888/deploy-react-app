import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import * as actions from '../../../store/actions/adminActions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyName: '',
            contentMarkdown: '',
            contentHTML: '',
            image: '',
        }
    }

    

    componentDidMount() {
    }
    
    async componentDidUpdate(prevProps, prevState, snapShot) {
        
    }

    handleEventOnChangeImg = async(event) => {
        let files = event.target.files;
        let file = files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            console.log(objectURL);
            this.setState({
                image: base64
            })
        }
    }

    handleEventOnChangeInput = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleCreateNewSpecialty = async() => {
        let res = await createNewSpecialty({
            name: this.state.specialtyName,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            image: this.state.image
        });
        if(res && res.errCode === 0) {
            toast.success('Add new specialty succeed!');
        }else {
            toast.error('Add new specialty failed!');
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="manage-specialty-container">
                        <div className="manage-specialty-title">
                            <FormattedMessage id="system.manage-specialty.create" />
                        </div>
                        <div className="manage-specialty-more-info mb-8">
                            <div className="manage-specialty-info-left">
                                <div className="manage-specialty-info-left-header">
                                    <p className="manage-specialty-info-left-header-choose"><FormattedMessage id="system.manage-specialty.name" /></p>
                                </div>
                                <input className="manage-specialty-info-left-header-input" type="text" placeholder="Nhập tên chuyên khoa" name="specialtyName" value={this.state.specialtyName} onChange={this.handleEventOnChangeInput}/>
                            </div>
                            <div className="manage-specialty-info-right">
                                <div className="manage-specialty-info-right-header">
                                    <p className="manage-specialty-info-right-header-choose"><FormattedMessage id="system.manage-specialty.image" /></p>
                                </div>
                                <input type='file' onChange={this.handleEventOnChangeImg}/>
                            </div>
                        </div>
                        <div className="manage-specialty-editor">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown}/>
                        </div>
                        <button className="btn btn-primary save-user" onClick={this.handleCreateNewSpecialty}><FormattedMessage id={"system.homepage.save-info"} /></button>
                    </div>
                </div>
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
        createNewSpecialty: (data) => {
            dispatch(actions.createSpecialty(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);



