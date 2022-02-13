import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
import {useNavigate} from "react-router-dom";
// import {Navigate} from "react-router-dom";


const Logout = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.logout();
    }, [])
        return null
        // TODO сделать ридерект <Redirect />);}
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);