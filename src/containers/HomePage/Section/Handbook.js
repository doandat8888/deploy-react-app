import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handbook.scss';
//Import slide
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Handbook extends Component {

    

    render() {

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
            infinite: true,
            speed: 500,
            slidesToShow: 2, //Hiển thị 4 ảnh trên 1 slide
            slidesToScroll: 1, //Next 2 cái 1 lần
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                  }
                },
            ]
        };
        return (
            <div className="section-handbook">
                <div className="handbook-content">
                    <h1 className="handbook-content-title">Cẩm nang</h1>
                    <Slider {...settings} className="handbook-content-slider">
                        <div className='handbook-content-body'>
                            <img className='handbook-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2022/02/11/151051-cat-polyp-dai-trang-o-dau-tot.jpg"/>
                            {/* <div className="handbook-content-body-text">Cắt flop trực tràng ở đâu tốt Hà Nội</div> */}
                        </div>
                        <div className='handbook-content-body'>
                            <img className='handbook-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2022/02/10/120354-ra-mat-cong-dong-hoi-dap-app-bookingcare.jpg"/>
                            {/* <div className="handbook-content-body-text">Ra mắt cộng đồng hỏi đáp miễn phí trên Apps Bookingcare</div> */}
                        </div>
                        <div className='handbook-content-body'>
                            <img className='handbook-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2022/02/09/151905-dia-chi-kham-apxe-hau-mon.jpg"/>
                            {/* <div className="handbook-content-body-text">Khám áp xe hậu môn ở đâu tốt? 7 bệnh viện chữa áp xe hậu môn tại Hà Nội</div> */}
                        </div>
                        <div className='handbook-content-body'>
                            <img className='handbook-content-body-img' src="https://cdn.bookingcare.vn/fr/w300/2020/02/27/162959-kinh-nghiem-kham-cat-bao-quy-dau-tai-benh-vien-viet-duc.jpg"/>
                            {/* <div className="handbook-content-body-text">Chia sẻ kinh nghiệm Khám và cắt Bao quy đầu tại Bệnh viện Việt Đức</div> */}
                        </div>
                    </Slider>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
