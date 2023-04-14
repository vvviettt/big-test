import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type SubmitButtonProps = {
  label: string;
  bgColor: string;
  textColor: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({label}) => {
  return (
    <TouchableOpacity>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
