import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';

const RegisterForm: FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Register Form</Text>
      <Button onPress={() => navigation.navigate('Welcome')} title="Go to welcome" />
    </View>
  );
};

export default RegisterForm;
