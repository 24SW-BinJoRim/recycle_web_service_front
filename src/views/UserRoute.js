import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '_selectors/selectors';
import { logout } from '_actions/authActions';

function UserRoute() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    console.log("UserRoute:", isAuthenticated);

    if (isAuthenticated) {
        dispatch(logout());
        alert("로그아웃 되었습니다.");
    }

    return <Navigate to="login" replace />
}

export default UserRoute;
