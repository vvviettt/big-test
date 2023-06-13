import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {BottomSheetModal, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import AddPostButton from '../../components/button/AddPostButton';
import {Colors} from '../../config/colors';
import ImageIcon from '../../assets/svg/image.svg';
import SurveyIcon from '../../assets/svg/survey.svg';
import ProgressCircle from 'react-native-progress-circle';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CloseIcon from '../../assets/svg/close.svg';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {submitNewPost} from '../../redux/post/postSlice';
import {NewPostFormData} from '../../redux/post/interfaces/NewPostFormData';

const AddPostScreen = () => {
  const schema = yup.object({
    content: yup.string().required(),
    images: yup.array().default([]),
    videos: yup.array().default([]),
  });
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const pickImage = useCallback(async () => {
    if ((getValues('images') ? getValues('images').length : 0) < 5) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit:
          5 - (getValues('images') ? getValues('images').length : 0),
      });
      if (result.assets) {
        setValue('images', [...(getValues('images') ?? []), ...result.assets]);
      }
    }
  }, []);
  const removeImage = useCallback((index: number) => {
    let images = getValues('images') as Array<any>;
    images.splice(index, 1);
    setValue('images', images);
  }, []);

  const onClose = useCallback(() => {
    if (nav.canGoBack()) {
      nav.goBack();
    } else {
      nav.navigate('content' as never);
    }
  }, []);

  const onSubmit = handleSubmit(data => {
    dispatch(submitNewPost(data as NewPostFormData));
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.wrapper}>
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => onClose()}>
              <CloseIcon width={25} height={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              activeOpacity={1}
              style={{...styles.submitBtn, opacity: isValid ? 1 : 0.5}}>
              <Text style={styles.submitText}>Đăng tin</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            <Controller
              name={'content'}
              control={control}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  onChangeText={value => {
                    if (value.length <= 500) {
                      onChange(value);
                    }
                  }}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Điều gì đang xảy ra?"
                  multiline
                  style={styles.contentInput}
                  placeholderTextColor={'#5c6c78'}
                />
              )}
            />
            {
              <Controller
                name={'images'}
                control={control}
                render={({field: {value}}) => {
                  return value != undefined ? (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      <View style={styles.imageWrapper}>
                        {value.map((item: any, index: number) => {
                          return (
                            <View key={index} style={styles.image}>
                              <ImageBackground
                                resizeMode="cover"
                                source={{uri: (item as any).uri}}
                                style={{flex: 1}}
                              />
                              <TouchableOpacity
                                onPress={() => removeImage(index)}
                                style={styles.imageBtn}>
                                <CloseIcon
                                  width={20}
                                  height={20}
                                  fill={Colors.white}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  ) : (
                    <View></View>
                  );
                }}
              />
            }
          </ScrollView>
          <View style={styles.bottomOption}>
            <View style={styles.leftOption}>
              <TouchableOpacity onPress={pickImage} activeOpacity={1}>
                <ImageIcon width={24} height={24} fill={Colors.blue} />
              </TouchableOpacity>
              <SurveyIcon width={24} height={24} fill={Colors.blue} />
            </View>
            <View>
              <Controller
                name={'content'}
                control={control}
                render={({field: {value}}) => {
                  return (
                    <ProgressCircle
                      percent={
                        value == undefined ? 0 : getValues('content').length / 5
                      }
                      radius={12}
                      borderWidth={3}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"></ProgressCircle>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  scrollView: {
    flex: 1,
    height: 10,
    paddingHorizontal: 20,
  },
  contentInput: {
    fontSize: 16,
    color: '#5c6c78',
    width: '100%',
    marginBottom: 20,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottomOption: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
    paddingHorizontal: 20,
  },
  leftOption: {
    flexDirection: 'row',
    gap: 25,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  submitBtn: {
    backgroundColor: Colors.blue,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  imageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 5,
    backgroundColor: '#000',
    opacity: 0.7,
    borderRadius: 20,
  },
  imageWrapper: {flexDirection: 'row', gap: 10},
});
