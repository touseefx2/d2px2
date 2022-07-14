import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Dimensions,
  Alert,
  Keyboard,
  Modal,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-easy-toast';
import NetInfo from '@react-native-community/netinfo';

export default observer(Login);
function Login(props) {
  const toast = useRef(null);
  const toastduration = 1000;

  const window = Dimensions.get('window');
  const {width, height} = window;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA + width / height;

  let loader = store.User.loginLoader;
  const mobileReg = /^[3]\d{9}$/ || /^[0][3]\d{9}$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  // const [phone, setphone] = useState('');
  const [email, setemail] = useState(''); //street adress
  const [pswd, setpswd] = useState('');
  const [spswd, setspswd] = useState(false);

  const goBack = () => {
    props.navigation.goBack();
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const goSignup = () => {
    props.navigation.navigate('Signup');
  };

  const Login = () => {
    Keyboard.dismiss();
    // if (phone == '') {
    //   toast?.current?.show('Please enter your phone number');
    //   return;
    // }

    // if (phone !== '' && mobileReg.test(phone) === false) {
    //   toast?.current?.show('Your phone number is inavlid');
    //   return;
    // }

    if (email == '') {
      toast?.current?.show('Please enter your email');
      return;
    }

    if (email !== '' && emailReg.test(email) === false) {
      toast?.current?.show('Your email pattern is invalid', 1000);
      return;
    }

    if (pswd == '') {
      toast?.current?.show('Please enter your password', 1000);
      return;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const data = {
          email: email,
          password: pswd,
          // registrationToken: store.User.notificationToken,
        };
        store.User.attemptToLogin(data, goHome);
        // props.navigation.navigate('OTP', {screen: 'login', data: data, s: s});
      } else {
        toast?.current?.show('Please connect internet', toastduration);
      }
    });
  };

  const renderBottomButton = () => {
    return (
      <>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 12,
            elevation: 20,
            backgroundColor: theme.color.background,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={Login}
            style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Login</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 7,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: theme.color.subTitle,
                fontFamily: theme.fonts.fontNormal,
                textAlign: 'center',
              }}>
              Don't have an Account?
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={goSignup}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: theme.color.subTitle,
                  fontFamily: theme.fonts.fontNormal,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const textInputRightIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setspswd(!spswd)}
        style={{
          width: '10%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={spswd ? 'eye-with-line' : 'eye'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.background}
        barStyle={'dark-content'}
      />
      <utils.Loader text={'Please wait'} load={loader} />

      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity activeOpacity={0.4} onPress={goBack}>
            <utils.vectorIcon.Ionicons
              name="chevron-back"
              color={theme.color.subTitle}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 26,
              color: theme.color.title,
              fontFamily: theme.fonts.fontMedium,
              marginBottom: 30,
            }}>
            Login
          </Text>

          <View style={styles.inputFieldConatiner}>
            <Text style={styles.inputTitle}>Email</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={email}
                onChangeText={val => {
                  setemail(val);
                }}
              />
            </View>
          </View>

          <View style={styles.inputFieldConatiner}>
            <Text style={styles.inputTitle}>Password</Text>
            <View
              style={[
                styles.InputContainer,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <TextInput
                secureTextEntry={!spswd}
                style={[styles.textInputStyle, {width: '85%'}]}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={pswd}
                onChangeText={val => {
                  setpswd(val);
                }}
              />

              {pswd.length > 0 && textInputRightIcon()}
            </View>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.color.subTitle,
                  fontFamily: theme.fonts.fontNormal,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderBottomButton()}

      <Toast ref={toast} position="center" />
    </SafeAreaView>
  );
}
