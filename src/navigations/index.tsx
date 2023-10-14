import React, {useEffect, useState} from 'react';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from '~hooks';
import AppsScreens from '~navigations/appNav';
import AuthScreens from '~navigations/authNav';

const MainNavigation = () => {
  const isLoggedIn = useAppSelector(
    state => state.AuthSlice.isLoggedIn,
    shallowEqual,
  );
  if (!isLoggedIn) {
    return <AuthScreens />;
  } else {
    return <AppsScreens />;
  }
};

export default MainNavigation;
