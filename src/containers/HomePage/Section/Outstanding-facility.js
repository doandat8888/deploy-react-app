import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
//Import slide
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions/adminActions';
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        }
    }

    async componentDidMount() {
        this.props.getAllClinic();
        // let res = await getAllClinicService();
        // if(res && res.errCode === 0) {
        //     this.setState({
        //         clinics: res.data
        //     })
        // }
        //console.log('Clinics check: ', this.state);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.allClinic !== this.props.allClinic) {
            this.setState({
                clinics: this.props.allClinic
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        //console.log(clinic);
        return (
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        )
    }

    render() {
        let {clinics} = this.state;
        console.log(clinics);
        let clinic = clinics && clinics.length > 0 && clinics.map((clinic, index) => {
            return (
                <div className='specialty-content-body' key={index} onClick={() => this.handleViewDetailClinic(clinic)}>
                    <img className='specialty-content-body-img' src={clinic.image}/>
                    <p className="specialty-content-body-text">{clinic.name}</p>
                </div>
            )
        })

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
            slidesToScroll: 2, //Next 2 cái 1 lần
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
        return (
            <div className="section-specialty">
                <div className="specialty-content">
                    <h1 className="specialty-content-title">Cơ sở y tế nổi bật</h1>
                    <Slider {...settings}>
                    {/* <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/095412-bv-hung-viet.jpg"/>
                        <p className="specialty-content-body-text">Bệnh viện Ung bướu Hưng Việt</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/093035-benh-vien-thu-cuc-1.jpg"/>
                        <p className="specialty-content-body-text">Hệ thống y tế Thu Cúc</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2021/04/29/145224-bn-nam-hoc-va-hiem-muon-hn.jpg"/>
                        <p className="specialty-content-body-text">Bệnh viện Nam học và hiếm muộn Hà Nội</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2019/09/04/172230benh-vien-hong-phat.jpg"/>
                        <p className="specialty-content-body-text">Bệnh viện đa khoa Hồng Phát</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/090854-bv-an-viet1.jpg"/>
                        <p className="specialty-content-body-text">Bệnh viện đa khoa An Việt</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w500/2020/06/06/161521-bv-yhcttw.jpg"/>
                        <p className="specialty-content-body-text">Bệnh viện y học cổ truyền trung </p>
                    </div> */}
                    {clinic}
                    </Slider>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinic: () => {
            dispatch(actions.getAllClinic());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
