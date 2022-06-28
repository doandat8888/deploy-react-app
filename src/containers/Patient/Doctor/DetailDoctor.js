import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../HomePage/Section/Header';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES} from '../../../utils/constant';
import Footer from '../../HomePage/Section/Footer'
import DoctorSchedule from './DoctorSchedule';
import DoctorInforExtra from './DoctorInforExtra';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            console.log(id);
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0) {
                this.setState({
                    doctorInfor: res.doctorDetailedInfo
                });
            }
        }
    }


    render() {
        let { doctorInfor } = this.state;
        console.log(doctorInfor);
        let nameVi = '';
        let nameEn = '';
        if(doctorInfor && doctorInfor.positionData) {
            nameVi = `${doctorInfor.positionData.valueVi} ${doctorInfor.firstName} ${doctorInfor.lastName}`;
            nameEn = `${doctorInfor.positionData.valueEn} ${doctorInfor.lastName} ${doctorInfor.firstName}`;
        }

        let currentURL = `https://doandat8888.github.io/theband2/`
        
        return (
            <div>
                <Header />
                <div className="detail-doctor-container">
                    <div className="detail-doctor-container-header">
                        <div className="detail-doctor-container-header-left">
                            <img src={doctorInfor && doctorInfor.image ? doctorInfor.image : ''} className="detail-doctor-container-header-left-img"></img>
                        </div>
                        <div className="detail-doctor-container-header-right">
                            <div className="detail-doctor-container-header-right-top">
                                <p>{this.props.language === LANGUAGES.EN ? nameEn : nameVi}</p>
                            </div>
                            <div className="detail-doctor-container-header-right-bottom">
                                <p>{doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.description ? doctorInfor.Markdown.description : ''}</p>
                            </div>
                            {/* <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div> */}
                            {/* <LikeAndShare dataHref={currentURL} /> */}
                        </div>
                    </div>
                    <div className="detail-doctor-container-schedule">
                        <div className="detail-doctor-container-schedule-left">
                            <DoctorSchedule doctorInforId = {doctorInfor && doctorInfor.id ? doctorInfor.id : -1} />
                        </div>
                        <div className="detail-doctor-container-schedule-right">
                            <DoctorInforExtra id={this.props.match.params.id}/>
                        </div>
                    </div>
                    <div className="detail-doctor-container-detail">
                        {doctorInfor && doctorInfor.Markdown && doctorInfor.Markdown.contentHTML
                            && 
                            <div dangerouslySetInnerHTML={{__html: doctorInfor.Markdown.contentHTML}}>
                            </div>
                        }
                    </div>
                    {/* <div className="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div> */}
                    <Comment dataHref={currentURL}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);