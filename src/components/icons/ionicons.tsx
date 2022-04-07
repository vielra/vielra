import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

type Props = IconProps;

const Ionicons: FC<Props> = (props: Props) => <Icon {...props} />;

export default Ionicons;
