import {StyleSheet} from 'react-native';
import theme from '../../theme/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  section1: {
    marginTop: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveHeight(20),
    resizeMode: 'cover',
  },
  htitle: {
    fontSize: 16,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.title,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginLeft: 15,
  },
  title: {
    fontSize: 12,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    lineHeight: 22,
  },

  title2: {
    fontSize: 12,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,
    lineHeight: 22,
    textTransform: 'capitalize',
  },

  title3: {
    fontSize: 14,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.title,
    alignSelf: 'center',
    marginTop: 5,
  },
  title4: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    alignSelf: 'center',
    marginTop: 20,
  },
  title5: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    alignSelf: 'center',
    marginTop: 5,
  },

  header: {
    width: responsiveWidth(100),
    elevation: 10,
    backgroundColor: theme.color.background,
    paddingVertical: 10,

    elevation: 10,
    marginBottom: 5,
  },
  header1: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  back: {},
  titleSection: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  descriptionSection: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
  },

  headerSection1: {
    width: '45%',
    // backgroundColor: 'red',
  },
  headerSection2: {
    width: '45%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  title1: {
    fontSize: 13,
    fontFamily: theme.fonts.fontNormal,
    color: theme.color.subTitle,
    marginRight: 5,
    textTransform: 'capitalize',
  },

  icon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    marginLeft: 10,
  },
  imageConatiner: {
    width: responsiveWidth(100),
    height: responsiveHeight(34),
    backgroundColor: theme.color.background,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptySECTION: {
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    resizeMode: 'contain',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginTop: 0,
  },

  foodCardImg: {
    width: '40%',
    height: '100%',
    elevation: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    // marginBottom: 20,
    // justifyContent: 'center',
  },
  foodCardTitle1: {
    fontSize: 18,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.title,

    textTransform: 'capitalize',
  },
  foodCardTitle2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
  },
  foodCardTitle3: {
    fontSize: 18,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.button1,
    lineHeight: 20,
  },
  fcBottom: {
    marginTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 20,
    width: '100%',
  },
  foodCardBottom: {
    marginTop: 10,
  },
  addcart: {
    width: '100%',
    height: responsiveHeight(6),
    backgroundColor: theme.color.cartbutton,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  foodCardButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.cartbuttonText,
    lineHeight: 20,
    marginLeft: 5,
  },
  likecart: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionsTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
    lineHeight: 19,
  },
  sectionsTitlee: {
    fontSize: 11,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitleLight,
    textTransform: 'capitalize',
    lineHeight: 15,
  },
  sectionsTitle2: {
    fontSize: 11,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
    lineHeight: 17,
  },
  sectionsTitle2: {
    fontSize: 13,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
    lineHeight: 16,
  },

  mainSecc: {
    backgroundColor: theme.color.background,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  mainSeccDelivery: {
    backgroundColor: theme.color.background,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  dimg: {
    width: 50,
    height: 50,
  },
  mapimg: {
    width: 310,
    height: 86,
    marginTop: 5,
    borderRadius: 2,
    elevation: 2,
  },
  mainSeccText1: {
    fontFamily: theme.fonts.fontBold,
    fontSize: 12,
    lineHeight: 20,
    color: theme.color.subTitleLight,
  },
  mainSeccText2: {
    fontFamily: theme.fonts.fontBold,
    fontSize: 14,
    lineHeight: 30,
    color: theme.color.title,
  },

  mainSec: {
    // backgroundColor: 'yellow',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  section3subTitle: {
    fontSize: 12,
    color: theme.color.subTitle,
    fontFamily: theme.fonts.fontMedium,

    textTransform: 'capitalize',
  },
  Input: {
    borderBottomWidth: 0.5,
    borderColor: theme.color.subTitleLight,
    width: '100%',
    height: responsiveHeight(6),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 5,
    // backgroundColor: 'red',
  },
  CountryLogo: {
    height: 35,
    width: 28,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    top: -1,
    elevation: 5,
  },
  MobileInput: {
    width: '70%',
    color: theme.color.title,

    backgroundColor: theme.color.background,
    fontSize: 12,
    fontFamily: theme.fonts.fontNormal,
    height: 40,
  },
  addTitle1: {
    fontSize: 12,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitleLight,
    textTransform: 'capitalize',
  },
  addTitle2: {
    fontSize: 12,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitleLight,
    marginLeft: 10,
    marginRight: 5,
  },

  itemCard: {
    // paddingHorizontal: 10,
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  icImg: {
    width: 70,
    height: 70,
  },

  foodCardImgConatiner: {
    width: 80,
    height: 80,
    backgroundColor: theme.color.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  foodCardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: theme.color.background,
    elevation: 3,
  },
  ImageLoader: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },
  ami: {
    fontFamily: theme.fonts.fontBold,
    fontSize: 13,
    color: theme.color.button1,
    marginLeft: 5,
  },

  foodCard: {
    width: '100%',
    elevation: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,
    // borderTopWidth: 0.3,
    // borderTopColor: 'silver',
  },
  foodCardLinear: {
    height: 46,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.color.button1,
    borderRadius: 10,
    elevation: 1,
  },

  section11: {
    borderColor: theme.color.background,
    width: 60,
    height: 30,
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2: {
    width: '40%',
    // backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  section3: {
    width: '32%',
    // backgroundColor: 'red',
    alignItems: 'flex-end',
  },
  section1: {
    borderColor: theme.color.background,
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  t1: {
    fontSize: 15,
    color: theme.color.buttonText,
    fontFamily: theme.fonts.fontBold,
    lineHeight: 18,
  },
  t2: {
    fontSize: 16,
    color: theme.color.buttonText,
    fontFamily: theme.fonts.fontMedium,
    lineHeight: 20,
  },
  t3: {
    fontSize: 12,
    color: theme.color.footerCartText,
    fontFamily: theme.fonts.fontNormal,
    lineHeight: 16,
  },
  t4: {
    fontSize: 14,
    color: theme.color.buttonText,
    fontFamily: theme.fonts.fontBold,
    lineHeight: 20,
  },
  LinearGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomButton2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: theme.color.background,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.button1,
  },
  LinearGradient2: {
    height: '100%',
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText2: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
    marginVertical: 10,
  },
  titleText3: {
    fontSize: 14,
    fontFamily: theme.fonts.fontMedium,
    color: theme.color.subTitle,
    alignSelf: 'center',
  },
  BottomButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.button1,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 3,
  },
  buttonTextBottom: {
    color: theme.color.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.fontBold,
    lineHeight: 20,
    // textTransform: 'capitalize',
  },

  sectionsTitleS: {
    fontSize: 11,
    fontFamily: theme.fonts.fontBold,
    color: theme.color.subTitle,
    textTransform: 'capitalize',
    lineHeight: 13,
  },
});
