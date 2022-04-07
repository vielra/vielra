import React, { FC, ReactNode } from 'react';
import { SafeAreaProvider as Provider } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
}

const SafeAreaProvider: FC<Props> = ({ children }: Props) => <Provider>{children}</Provider>;

export default SafeAreaProvider;
