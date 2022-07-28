import React from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import {observer} from 'mobx-react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';

export default observer(Update);
function Update(props) {

    //method

  const openPlayStore = () => {
    const link =
      'https://play.google.com/store/apps/details?id=com.karblock&hl=en_US&gl=US';
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log('open app error : ', err),
    );
    BackHandler.exitApp();
  };

  const openAppStore = () => {
    const link = 'itms-apps://apps.apple.com/us/app/karblock/id1602901466';
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log('open app error : ', err),
    );
    BackHandler.exitApp();
  };

  const onClickButton= () => {
    if (Platform.OS == 'android') openPlayStore();
    else openAppStore();
  }

  // render
  
  const renderStatusBar=()=>{
    return(
        <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor={theme.color.button1}
      />

    )
  }

  const renderMainContent=()=>{
    return(
        <View style={styles.Body}>
        <Image
          source={require('../../assets/images/logo/img.png')}
          style={styles.logo}
        />

        <View style={{width: '100%'}}>
          <Text style={styles.title}>Update Needed</Text>
        </View>

        <View style={{width: 300, marginTop: 10}}>
          <Text style={styles.Description}>
            In order to continue using the application, please update the app
            to the latest version
          </Text>
        </View>

       
      </View>
    )
  }

  const renderButton=()=>{
    return(
        <TouchableOpacity
        style={styles.ContinueButton}
        onPress={onClickButton}>
        <Text style={styles.ContinueButtonText}>Update Now</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.Container}>
        {renderStatusBar()}
        
      <LinearGradient
        colors={[theme.color.button1, theme.color.button2]}
        style={styles.LinearGradient}>
            <ScrollView showsVerticalScrollIndicator={false}>
            {renderMainContent()}
            </ScrollView>

            {renderButton()}
         
      </LinearGradient>
    </SafeAreaView>
  );
}
