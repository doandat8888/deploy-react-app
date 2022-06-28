import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminActions';
import './TableManageUser.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    
    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users,
            });
        }
    }

    onDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    }

    onHandleEditUser = (user) => {
        this.props.onHandleEditUser(user);
    }

    render() {
        
        let {users} = this.state;
        let user = users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.address}</td>
                    <td>{user.gender}</td>
                    <td>{user.roleId}</td>
                    <td>{user.positionId}</td>
                    <td>
                        <button className='btn-action'
                        >
                            <i class="fas fa-pencil-alt icon-pencil mr-10" onClick={() => this.onHandleEditUser(user)}></i></button>
                        <button 
                            className='btn-action'
                        ><i class="fas fa-trash icon-trash" onClick={() => this.onDeleteUser(user.id)}></i></button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <React.Fragment>
                        <table id="customers">
                            <tr>
                                <th>Email</th>
                                <th><FormattedMessage id="system.user-manage.first-name"/></th>
                                <th><FormattedMessage id="system.user-manage.last-name"/></th>
                                <th><FormattedMessage id="system.user-manage.mobile"/></th>
                                <th><FormattedMessage id="system.user-manage.address"/></th>
                                <th><FormattedMessage id="system.user-manage.gender"/></th>
                                <th><FormattedMessage id="system.user-manage.role-id"/></th>
                                <th><FormattedMessage id="system.user-manage.position"/></th>
                                <th><FormattedMessage id="system.user-manage.actions"/></th>
                                
                            </tr>
                            {user}
                        </table>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </React.Fragment>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => {
            dispatch(actions.fetchAllUsersStart());
        },
        deleteUser: (userId) => {
            dispatch(actions.deleteUser(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
