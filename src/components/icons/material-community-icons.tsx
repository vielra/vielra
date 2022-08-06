import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

type Props = IconProps;

export const MaterialCommunityIcons: FC<Props> = (props: Props) => <Icon {...props} />;
