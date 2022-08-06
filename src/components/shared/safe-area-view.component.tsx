import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { useTheme } from '@/modules/theme/hooks';
import { SafeAreaView as ReactNativeSafeAreaView } from 'react-native-safe-area-context';

interface Props extends PropsWithChildren<ReactNode | any> {
  backgroundColor?: 'paper' | 'default';
}

export const SafeAreaView: FC<Props> = ({ children, backgroundColor }) => {
  const theme = useTheme();
  return (
    <ReactNativeSafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          backgroundColor === 'default' ? theme.palette.background.default : theme.palette.background.paper,
      }}>
      {children}
    </ReactNativeSafeAreaView>
  );
};

SafeAreaView.defaultProps = {
  backgroundColor: 'paper',
};
