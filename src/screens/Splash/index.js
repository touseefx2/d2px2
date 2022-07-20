import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {create} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';



const getToken = async () => {
  let tok = await messaging().getToken();
  console.log('is ios token : ', tok);
  store.User.addnotificationToken(tok);
};
Platform.OS === 'android'
  ? PushNotification.configure({
      onRegister: function (token) {
        console.log('is android token : ', token.token);
        store.User.addnotificationToken(token.token);
      },
    })
  : getToken();

export default observer(Splash);

function Splash(props) {
  useEffect(() => {
    HydarteStore();
    setDefaultAd();
   
  }, []);

  const setDefaultAd=()=>{
    let ar=[];
    const obj={
        repeat_time:15,
        time:30,    
     ad:{
             ad_file:
     
               "https://image-assets-bucket.s3.ap-south-1.amazonaws.com/holiday_vacation_resort_resort_640-1653386240914.mp4",
     
             createdBy: null,
     
             redirect_url: "www.eksplode.com",
     
             ad_price: 0,
    
         }
    }
    ar.push(obj)
    
    store.Downloads.setdefaultAd(ar)
  }

  const hydrateStores = async () => {
    const hydrate = create({storage: AsyncStorage});
    await hydrate('General', store.General);
    await hydrate('User', store.User);
    await hydrate('Downloads', store.Downloads);
    // await hydrate('Book', store.Food);
  
    // await hydrate('Promos', store.Promos);
    // await hydrate("citystore", store.cityStore);
    // await hydrate("notificationmanager", store.NotificationManager);
  };

  const HydarteStore = async () => {
    await hydrateStores();
    checkIsUserLogin();
  };

  const checkIsUserLogin = () => {
    let isLogin = store.User.user !== false ? true : false;
    let timeout = isLogin ? 3000 : 2000;
    if (isLogin) {
      store.User.getAllData('user');
    } else {
      store.User.getAllData('');
    }

    setTimeout(() => {
      store.General.setLoading(false);
    }, timeout);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        style={styles.background}
        blurRadius={3}
        source={require('../../assets/images/backgorund/img.jpeg')}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo/img.png')}
        />
        <Text style={styles.title1}>Welcome To</Text>
        <Text style={styles.title2}>{store.General.AppName}</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}
