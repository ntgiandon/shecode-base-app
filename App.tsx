import React from 'react';
import AppContainer from 'src';
import {Provider} from 'react-redux';
import store from '~redux/store';
import Container from '~components/container';
import CodePushManager from '~components/codePushManager';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <AppContainer />
      </Container>
      <CodePushManager />
    </Provider>
  );
};

export default App;
