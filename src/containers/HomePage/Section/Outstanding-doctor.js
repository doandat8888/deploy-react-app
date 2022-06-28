import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Outstanding-doctor.scss';
//Import slide
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions/adminActions';
import {LANGUAGES} from '../../../utils/constant';
import {FormattedMessage} from 'react-intl';
import { withRouter } from 'react-router';
import DetailDoctor from '../../Patient/Doctor/DetailDoctor';
import axios from 'axios';


class doctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }
    
    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctors: this.props.topDoctors,
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        return (
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        )
    }

    render() {
        let { topDoctors } = this.state;
        let { language } = this.props;
        // topDoctors = topDoctors.concat(topDoctors).concat(topDoctors).concat(topDoctors);
        function SampleNextArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div
                    className={className}
                    style={{ ...style, display: "block", background: "white"}}
                    onClick={onClick}
                >
                </div>
            );
          }
          
        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
              <div
                className={className}
                style={{ ...style, display: "block", background: "white" }}
                onClick={onClick}
              />
            );
        }

        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4, //Hiển thị 4 ảnh trên 1 slide
            slidesToScroll: 1, //Next 2 cái 1 lần
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                  }
                },
            ]
        };

        let topDoctor = topDoctors.map((topDoctor, index) => {
            let nameVi = `${topDoctor.positionData.valueVi} ${topDoctor.firstName} ${topDoctor.lastName}`;
            let nameEn = `${topDoctor.positionData.valueEn} ${topDoctor.firstName} ${topDoctor.lastName}`;
            let imageBase64 = ''
            if(topDoctor.image) {
                imageBase64 = Buffer.from(topDoctor.image, 'base64').toString('binary');
            }
            return (
                <div className='doctor-content-body' onClick={() => this.handleViewDetailDoctor(topDoctor)}>
                    <img className='doctor-content-body-img' src={imageBase64}/>
                    <p className="doctor-content-body-text">{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                </div>
            )
        })
        
        return (
            
            <div className="section-doctor">
                <div className="doctor-content">
                    <h1 className="doctor-content-title"><FormattedMessage id="system.homepage.outstanding-doctor"/></h1>
                    <Slider {...settings}>
                    {/* <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2021/06/26/121702-bs-pham-thi-hong-hoa.jpg"/>
                        <p className="doctor-content-body-text">Tiến sĩ, bác sĩ Phạm Thị Hồng Hoa</p>
                    </div>
                    <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2020/01/03/085650-gs-pham-gia-khai.jpg"/>
                        <p className="doctor-content-body-text">Giáo sư, tiến sĩ Phạm Gia Khải</p>
                    </div>
                    <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2019/12/31/160952-pgs-nguyen-ngoc-tuoc.jpg"/>
                        <p className="doctor-content-body-text">PGS.TS Nguyễn Ngọc Tước</p>
                    </div>
                    <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2019/09/04/093422giao-su-thai-hong-quang.jpg"/>
                        <p className="doctor-content-body-text">GS.TS Thái Hồng Quang</p>
                    </div>
                    <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2018/03/29/174120bac-si-nguyen-van-quynh.jpg"/>
                        <p className="doctor-content-body-text">PGS.TS, B.sĩ chuyên khoa II Nguyễn Văn Quỳnh</p>
                    </div>
                    <div className='doctor-content-body'>
                        <img className='doctor-content-body-img' src="https://cdn.bookingcare.vn/fr/w200/2018/03/29/181659bac-s-nguyen-tuan-minh.jpg"/>
                        <p className="doctor-content-body-text">BS chuyên khoa II Nguyễn Tuấn Minh</p>
                    </div> */}
                    {topDoctor}
                    </Slider>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(doctor));
