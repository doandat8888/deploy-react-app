import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
//Import slide
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { getAllSpecialty } from '../../../services/userService';
import * as actions from '../../../store/actions/adminActions';
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }

    componentDidMount() {
        this.props.getAllSpecialty();
    }
    
    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                specialties: this.props.allSpecialty
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        //console.log(specialty)
        return (
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        )
    }


    render() {

        let { specialties } = this.state;
        console.log(specialties);

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

        let specialty = specialties.map((specialty, index) => {
            return (
                <div className='specialty-content-body' key={index} onClick={() => this.handleViewDetailSpecialty(specialty)}>
                    <img className='specialty-content-body-img' src={specialty.image}/>
                    <p className="specialty-content-body-text">{specialty.name}</p>
                </div>
            )
        })

        
        return (
            <div className="section-specialty">
                <div className="specialty-content">
                    <h1 className="specialty-content-title">Chuyên khoa phổ biến</h1>
                    <Slider {...settings}>
                    {/* <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121146-tai-mui-hong.jpg"/>
                        <p className="specialty-content-body-text">Tai mũi họng</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121215-cot-song.jpg"/>
                        <p className="specialty-content-body-text">Cột sống</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121232-y-hoc-co-truyen.jpg"/>
                        <p className="specialty-content-body-text">Y học cổ truyền</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121305-cham-cuu.jpg"/>
                        <p className="specialty-content-body-text">Châm cứu</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/181822-san-phu-khoa.jpg"/>
                        <p className="specialty-content-body-text">Sản phụ khoa</p>
                    </div>
                    <div className='specialty-content-body'>
                        <img className='specialty-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2019/12/16/181619-sieu-am-thai.jpg"/>
                        <p className="specialty-content-body-text">Siêu âm thai</p>
                    </div> */}
                    {specialty}
                    </Slider>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allSpecialty: state.admin.allSpecialty,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => {
            dispatch(actions.getAllSpecialty());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
