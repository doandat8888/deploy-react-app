import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';


class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="footer-container-left">&copy; 2022 BookingCare</div>
                <div className="footer-container-right">
                    <div className="footer-container-right-icons">
                        <a className="footer-container-right-icons-link" href='https://www.facebook.com/bookingcare'>
                            <i class="fa-brands fa-facebook-square footer-container-right-icon fb"></i>
                        </a>
                        <a className="footer-container-right-icons-link" href="https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ">
                            <i class="fa-brands fa-youtube-square footer-container-right-icon ytb"></i>
                        </a>
                    </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
