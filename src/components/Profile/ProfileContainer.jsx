import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reduser'
import {Navigate, useParams, useLocation, useNavigate} from 'react-router-dom'

import {compose} from "redux";





class ProfileContainer extends React.Component {

    constructor(props) {
        super( props );
        this.state = {
            isShowMyProfile: true
        }
    }

    componentDidMount() {

        let userIdFromPath = +this.props.router.params.userId;
        let autorizedUserId = this.props.autorizedUserId;

        if (userIdFromPath) {

            this.props.getUserProfile( userIdFromPath );
            this.props.getStatus( userIdFromPath );

        } else {

            if (this.props.isAuth) {
                this.props.getUserProfile( autorizedUserId );
                this.props.getStatus( autorizedUserId );
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let userIdFromPath = +this.props.router.params.userId;
        let autorizedUserId = this.props.autorizedUserId;
        let isShowMyProfile = this.state.isShowMyProfile;

        if (isShowMyProfile) {

            if (userIdFromPath === autorizedUserId) {
                this.setState( {isShowMyProfile: false} )
            }

            if (!userIdFromPath && this.props.isAuth) {
                this.props.getUserProfile( autorizedUserId );
                this.props.getStatus( autorizedUserId );
                this.setState( {isShowMyProfile: false} )
            }
        }
    }


    render() {

        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />
        }

        return (

            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
function withRouter(Component) {

    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <Component
            {...props}
            router={{location, navigate, params}} />;
    }

    return ComponentWithRouterProp;
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(withRouter,
    connect (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} )) (ProfileContainer)





