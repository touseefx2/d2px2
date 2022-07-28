import theme from '../../theme';
import {StyleSheet, Dimensions} from 'react-native';


const styles = StyleSheet.create({
  Container: {
    flex: 1,
 
  },
  Status: {

  },
  logo: {
    height: '20%',
    width: '50%',
    resizeMode: 'contain',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.buttonText,
  },
  Description: {
    fontSize: 16,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.buttonText,
  },
  Body: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  ContinueButton: {
    backgroundColor: theme.color.background,
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  ContinueButtonText: {
    alignSelf: 'center',
    color: theme.color.title,
    lineHeight: 20,
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
  },
  LinearGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default styles;