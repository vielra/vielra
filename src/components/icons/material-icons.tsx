import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

type Props = IconProps;

export const MaterialIcons: FC<Props> = (props: Props) => <Icon {...props} />;
