import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from '../../screens/index';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Home" component={screens.Home} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Signup" component={screens.Signup} />
      <Stack.Screen name="Book" component={screens.Book} />
      <Stack.Screen name="Setting" component={screens.Setting} />
      <Stack.Screen name="DownloadStack" component={DownloadStack} />
      <Stack.Screen name="Profile" component={screens.Profile} />
      <Stack.Screen name="ChangePassword" component={screens.ChangePassword} />
      {/* <Stack.Screen name="Location" component={screens.Location} />
        <Stack.Screen name="Help" component={screens.Help} />
      <Stack.Screen name="Search" component={screens.Search} />
      <Stack.Screen name="Map" component={screens.Map} />
      <Stack.Screen name="Checkout" component={screens.Checkout} />
      <Stack.Screen name="OrderLocation" component={screens.OrderLocation} />
      <Stack.Screen name="CheckLogin" component={screens.CheckLogin} />
    
      <Stack.Screen name="OTP" component={screens.OTP} />
    
     
      <Stack.Screen name="PromoStack" component={PromoStack} />
     
     
      <Stack.Screen name="Favourite" component={screens.Favourite} /> 
      <Stack.Screen
        name="OrderIndication"
        component={screens.OrderIndication}
      />
      */}
    </Stack.Navigator>
  );
};

const DownloadStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Downloads"
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name="Downloads" component={screens.Downloads} />
      <Stack.Screen
        name="DownloadsDetails"
        component={screens.DownloadsDetails}
      />
    </Stack.Navigator>
  );
};

// const PromoStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Promo"
//       screenOptions={{animationEnabled: false, headerShown: false}}>
//       <Stack.Screen name="Promo" component={screens.Promo} />
//       <Stack.Screen name="PromoDetails" component={screens.PromoDetails} />
//     </Stack.Navigator>
//   );
// };
