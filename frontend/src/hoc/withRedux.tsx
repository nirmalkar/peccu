'use client';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

const withRedux = (Component: any) => {
  return function ComponentWithRedux(props: any) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};
export default withRedux;
