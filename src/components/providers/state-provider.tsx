import React, { FC, ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';

interface Props {
  children: ReactNode;
}

const StateProvider: FC<Props> = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StateProvider;
