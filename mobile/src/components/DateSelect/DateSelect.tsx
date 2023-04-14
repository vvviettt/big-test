import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Colors} from '../../config/colors';
import {Control, Controller} from 'react-hook-form';

type DateSelectProps = {
  name: string;
  control: Control;
};

const DateSelect: React.FC<DateSelectProps> = ({control, name}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <DateSelectView
            onSelected={date => {
              onChange(date);
            }}
            errorText={error?.message}
          />
        );
      }}
    />
  );
};

const DateSelectView: React.FC<{
  onSelected: (date: Date) => void;
  errorText?: string;
}> = ({onSelected, errorText}) => {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  var currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => {
    return {data: currentYear - i, text: `${currentYear - i}`};
  });
  const months = Array.from({length: 12}, (_, i) => {
    return {data: i + 1, text: `Tháng ${i + 1}`};
  });
  const days = Array.from(
    {length: new Date(year, month, 0).getDate()},
    (_, i) => {
      return {data: i + 1, text: `${i + 1}`};
    },
  );
  useEffect(() => {
    if (day != 0 && month != 0 && year != 0) {
      const date = new Date(`${year}-${month}-${day}`);
      onSelected(date);
    }
  }, [day, month, year]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.dateWrapper}>
        <SelectDropdown
          buttonStyle={styles.selectBtn}
          data={years}
          onSelect={item => {
            setYear(item.data);
          }}
          defaultButtonText={'Năm'}
          buttonTextStyle={styles.textBtn}
          rowTextForSelection={item => {
            return item.text;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.text;
          }}
        />
        <SelectDropdown
          buttonStyle={styles.selectBtn}
          data={months}
          onSelect={item => {
            setMonth(item.data);
          }}
          defaultButtonText={'Tháng'}
          buttonTextStyle={styles.textBtn}
          rowTextForSelection={item => {
            return item.text;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.text;
          }}
        />
        <SelectDropdown
          buttonStyle={styles.selectBtn}
          disabled={year == 0 && month == 0}
          data={days}
          onSelect={item => {
            setDay(item.data);
          }}
          defaultButtonText={'Ngày'}
          buttonTextStyle={styles.textBtn}
          rowTextForSelection={item => {
            return item.text;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.text;
          }}
        />
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default DateSelect;
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },
  dateWrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  selectBtn: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%',
    backgroundColor: 'transparent',
  },
  textBtn: {
    color: Colors.placeholder,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.error,
  },
});
