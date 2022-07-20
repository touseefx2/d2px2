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

import {getCountries, getStates} from 'country-state-picker';
import IntlPhoneInput from 'react-native-intl-phone-input';

export default observer(Signup);
function Signup(props) {
  const toast = useRef(null);
  const toastduration = 700;
  let screen = props.route.params.screen;

  const window = Dimensions.get('window');
  const {width, height} = window;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA + width / height;

  let loader = store.User.regLoader;
  var nameReg = /^[a-zA-Z ]{2,40}$/;
  const mobileReg = /^[3]\d{9}$/ || /^[0][3]\d{9}$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [isDropDownCountry, setisDropDownCountry] = useState(false);
  const [isDropDownState, setisDropDownState] = useState(false);
  const [isDropDownCity, setisDropDownCity] = useState(false);

  const [country, setcountry] = useState(false);
  const [state, setstate] = useState('');
  const [city, setcity] = useState('');
  const [zc, setzc] = useState('');
  const [sa, setsa] = useState('');

  const [countryList, setcountryList] = useState([]);
  const [stateList, setstateList] = useState([]);

  const [phone, setphone] = useState('');
  const [isVerifyPhone, setisVerifyPhone] = useState('a');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pswd, setpswd] = useState('');
  const [spswd, setspswd] = useState(false);
  const [cpswd, setcpswd] = useState('');
  const [scpswd, setscpswd] = useState(false);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    let c = await getCountries();
    setcountryList(c);
  };

  const getAllStates = async () => {
    let c = await getStates(country.code);
    setstateList(c);
  };

  useEffect(() => {
    if (country) {
      getAllStates();
    }
  }, [country]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const goHome = () => {
    props.navigation.navigate('Home');
  };

  const closeAllDropDown = () => {
    let c = false;
    Keyboard.dismiss();
    setisDropDownCountry(c);
    setisDropDownState(c);
    setisDropDownCity(c);
  };

  const goLogin = () => {
    goBack();
  };

  const Signup = () => {
    Keyboard.dismiss();
    closeAllDropDown();

    if (name == '') {
      toast?.current?.show('Please enter your name', toastduration);
      return;
    }

    if (name != '' && nameReg.test(name) === false) {
      toast?.current?.show('Please enter your correct name', toastduration);
      return;
    }

    if (email == '') {
      toast?.current?.show('Please enter your email', toastduration);
      return;
    }

    if (email !== '' && emailReg.test(email) === false) {
      toast?.current?.show('Your email pattern is invalid', toastduration);
      return;
    }

    if (phone == '') {
      toast?.current?.show('Please enter your phone number', toastduration);
      return;
    }

    if (phone !== '' && !isVerifyPhone) {
      toast?.current?.show('Your phone number is inavlid', toastduration);
      return;
    }

    if (!country) {
      toast?.current?.show('Please select your country', toastduration);
      return;
    }

    if (state == '') {
      toast?.current?.show('Please select your state', toastduration);
      return;
    }

    if (city == '') {
      toast?.current?.show('Please enter your city', toastduration);
      return;
    }

    if (zc == '') {
      toast?.current?.show('Please enter your zip code', toastduration);
      return;
    }
    if (sa == '') {
      toast?.current?.show('Please enter your street address', toastduration);
      return;
    }

    if (pswd == '') {
      toast?.current?.show('Please enter your password', toastduration);
      return;
    }

    if (pswd.length < 7) {
      toast?.current?.show(
        'Password length must be greater than 6',
        toastduration,
      );
      return;
    }

    if (cpswd == '') {
      toast?.current?.show('Please enter your confirm password', toastduration);
      return;
    }

    if (pswd != cpswd) {
      toast?.current?.show('Confirm password not match', toastduration);
      return;
    }

    NetInfo.fetch().then(statee => {
      if (statee.isConnected) {
        const data = {
          name: name,
          email: email,
          password: pswd,
          phone: phone,
          address: {
            name: sa,
            zip: zc,
            city: city,
            state: state,
            country: country.name,
          },
          // registrationToken: store.User.notificationToken,
        };

        store.User.registerUser(data, goHome);
      } else {
        toast?.current?.show('Please connect internet', toastduration);
      }
    });
  };

  const setPhoneNumber = p => {
    console.log('p : ', p.isVerified);
    setisVerifyPhone(p.isVerified);
    if (p.unmaskedPhoneNumber == '') {
      setphone('');
    } else {
      setphone(p.dialCode + p.unmaskedPhoneNumber);
    }
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
            onPress={Signup}
            style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Sign Up</Text>
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
              Already have an Account?
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={goLogin}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  color: theme.color.subTitle,
                  fontFamily: theme.fonts.fontNormal,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const textInputRightIcon = (chk, c) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          if (c == 'sp') setspswd(!spswd);
          else setscpswd(!scpswd);
        }}
        style={{
          width: '10%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={chk ? 'eye-with-line' : 'eye'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const textInputRightIcon2 = () => {
    return (
      <TouchableOpacity
        disabled
        style={{
          width: '11%',
          alignItems: 'flex-end',
        }}>
        <utils.vectorIcon.Entypo
          style={styles.inputRightIcon}
          name={'chevron-small-down'}
          color={theme.color.subTitle}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  const renderDropDown = c => {
    let data = [];

    if (c == 'country') {
      data = countryList;
    } else if (c == 'state') {
      data = stateList;
    } else if (c == 'city') {
    }

    const onclickSelect = d => {
      console.log('on select : ', d);

      if (c == 'country') {
        setcountry(d);
        setstate("")
      } else if (c == 'state') {
        setstate(d);
      } else if (c == 'city') {
      }

      // NetInfo.fetch().then(state => {
      //   if (state.isConnected) {

      //   } else {
      //     toast?.current?.show('Please connect internet', toastduration);
      //   }
      // });
    };

    // console.log('drop down data : ', data);

    return (
      <theme.DropDown
        data={data}
        onSelectItem={d => {
          onclickSelect(d);
        }}
        setVisible={d => {
          closeAllDropDown();
        }}
        search={data.length > 0 ? true : false}
        c={c}
        absolute={false}
      />
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
        <TouchableOpacity activeOpacity={0.4} onPress={goBack}>
          <utils.vectorIcon.Ionicons
            name="chevron-back"
            color={theme.color.subTitle}
            size={26}
          />
        </TouchableOpacity>
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
              fontSize: 22,
              color: theme.color.title,
              fontFamily: theme.fonts.fontMedium,
              marginBottom: 30,
            }}>
            Let's create your account!
          </Text>

          <View style={styles.inputFieldConatiner}>
            <Text style={styles.inputTitle}>Name</Text>
            <View style={styles.InputContainer}>
              <TextInput
                maxLength={40}
                style={styles.textInputStyle}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={name}
                onChangeText={val => {
                  setname(val);
                }}
              />
            </View>
          </View>

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
            <Text style={styles.inputTitle}>Contact No.</Text>
            <View style={styles.InputContainer}>
              <IntlPhoneInput
                onChangeText={p => {
                  setPhoneNumber(p);
                }}
                defaultCountry="PK"
                lang="EN"
                renderAction={() => (
                  <>
                    {!isVerifyPhone && phone != '' && (
                      <utils.vectorIcon.Entypo
                        name="cross"
                        color={theme.color.subTitle}
                        size={18}
                      />
                    )}

                    {isVerifyPhone == true && (
                      <utils.vectorIcon.Entypo
                        name="check"
                        color={'green'}
                        size={18}
                      />
                    )}
                  </>
                )}
              />
            </View>
          </View>

          <View
            style={[
              styles.inputFieldConatiner,
              {
                flexDirection: 'row',

                justifyContent: 'space-between',
              },
            ]}>
            <View style={{width: '48%'}}>
              <Text style={styles.inputTitle}>Country</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  closeAllDropDown();
                  setisDropDownCountry(!isDropDownCountry);
                }}
                style={[
                  styles.InputContainer,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{width: '85%'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.textDropDown,
                      {
                        color: country
                          ? theme.color.subTitle
                          : theme.color.title,
                      },
                    ]}>
                    {country ? country.name : 'Select Country'}
                  </Text>
                </View>

                {textInputRightIcon2()}
              </TouchableOpacity>
              {isDropDownCountry && renderDropDown('country')}
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <Text style={styles.inputTitle}>State</Text>
              <TouchableOpacity
                disabled={!country ? true : false}
                activeOpacity={0.6}
                onPress={() => {
                  closeAllDropDown();
                  setisDropDownState(!isDropDownState);
                }}
                style={[
                  styles.InputContainer,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: country
                      ? theme.color.background
                      : theme.color.disableBack,
                  },
                ]}>
                <View style={{width: '85%'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.textDropDown,
                      {
                        color:
                          state == ''
                            ? theme.color.subTitle
                            : theme.color.title,
                      },
                    ]}>
                    {state == '' ? 'Select State' : state}
                  </Text>
                </View>

                {textInputRightIcon2()}
              </TouchableOpacity>
              {isDropDownState && renderDropDown('state')}
            </View>
          </View>

          <View
            style={[
              styles.inputFieldConatiner,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{width: '48%'}}>
              <Text style={styles.inputTitle}>City</Text>
              <View style={styles.InputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor={theme.color.subTitle}
                  placeholder=""
                  defaultValue={city}
                  onChangeText={val => {
                    setcity(val);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <Text style={styles.inputTitle}>Zip Code</Text>
              <View style={styles.InputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  placeholderTextColor={theme.color.subTitle}
                  placeholder=""
                  value={zc}
                  maxLength={10}
                  defaultValue={zc}
                  onChangeText={val => {
                    setzc(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputFieldConatiner}>
            <Text style={styles.inputTitle}>Street Address</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={sa}
                onChangeText={val => {
                  setsa(val);
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

              {pswd.length > 0 && textInputRightIcon(spswd, 'sp')}
            </View>
          </View>

          <View style={styles.inputFieldConatiner}>
            <Text style={styles.inputTitle}>Confirm Password</Text>
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
                secureTextEntry={!scpswd}
                style={[styles.textInputStyle, {width: '85%'}]}
                placeholderTextColor={theme.color.subTitle}
                placeholder=""
                defaultValue={cpswd}
                onChangeText={val => {
                  setcpswd(val);
                }}
              />

              {cpswd.length > 0 && textInputRightIcon(scpswd, 'scp')}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderBottomButton()}

      <Toast ref={toast} position="center" />
    </SafeAreaView>
  );
}
