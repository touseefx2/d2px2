import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import FastImage from 'react-native-fast-image';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-easy-toast';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Path} from 'react-native-svg';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';

export default observer(Book);
function Book(props) {
  const windowWidth = theme.window.Width;
  const imageAspectWidth = 375;
  const imageAspectHeight = 332;
  const curveAdjustment = 10;
  const maskHeight = responsiveHeight(28);
  const scaleFactor = imageAspectWidth / imageAspectHeight;
  const scaledHeight = scaleFactor * maskHeight;
  const controlPointX = windowWidth / 2.0;
  const controlPointY = scaledHeight + curveAdjustment;
  const curveCenterPointY = (controlPointY - maskHeight) / 2;

  const toast = useRef(null);
  const toastduration = 700;

  const d = props.route.params.data;
  let pid = d._id;
  let nav = props.nav;

  let detail = d.book_story || '---';
  let authorName = d.author.name || '';
  let aboutAuthor = d.author_biography || '';
  let screen = props.screen || '';

  let name = d.book_title || '';
  let writerName = authorName || 'Gabrielle Zevin';
  let category = d.book_category.category_name || '';
  let rating = 3 || 0;
  let image = d.book_cover
    ? {uri: d.book_cover}
    : require('../../assets/images/burger/img.jpeg');

  const [fullImgModal, setfullImgModal] = useState(false);
  const [fullImgUri, setfullImgUri] = useState('');
  const [fullImgLoad, setfullImgLoad] = useState(false);

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCoverImage = () => {
    return (
      // <MaskedView
      //   style={[
      //     styles.mask,
      //     {
      //       height: controlPointY - curveCenterPointY,
      //     },
      //   ]}
      //   maskElement={
      //     <Svg height="100%" width="100%">
      //       <Path
      //         d={`M0 0 L${windowWidth} 0 L${windowWidth} ${maskHeight} Q${controlPointX} ${controlPointY} 0 ${maskHeight} Z`}
      //         fill={'#fff'}
      //       />
      //     </Svg>
      //   }>
      //   {/* <Image source={{uri: logoUri}} style={styles.image} /> */}
      // </MaskedView>

      <View style={styles.imageConatiner}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setfullImgUri(image);
            setfullImgModal(true);
          }}>
          <FastImage
            style={styles.image}
            source={image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFullImage = () => {
    return (
      <Modal
        transparent
        visible={fullImgModal}
        onRequestClose={() => {
          setfullImgModal(false);
          setfullImgUri('');
        }}>
        <StatusBar
          animated={false}
          backgroundColor="black"
          barStyle={'light-content'}
        />

        <View style={styles.fullImageModalContainer}>
          <Image
            onLoadStart={() => setfullImgLoad(false)}
            onLoad={() => {
              setfullImgLoad(true);
            }}
            resizeMode="contain"
            style={styles.fullImageModalImage}
            source={fullImgUri}
          />

          {!fullImgLoad && (
            <ActivityIndicator
              size={35}
              color={'blue'}
              style={styles.fullImageModalLoader}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setfullImgModal(false);
              setfullImgUri('');
            }}
            style={styles.fullImageModalCross}>
            <utils.vectorIcon.Entypo name="cross" color="white" size={35} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const renderTitleSection = () => {
    return (
      <View>
        <View style={styles.titleSection}>
          <Text style={styles.foodCardTitle1}>{name}</Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.foodCardDetails}>{detail}</Text>
        </View>

        <View style={styles.categorySection}>
          <View style={{width: '20%'}}>
            <Text style={styles.catDetails}>Category:</Text>
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.catDetails2}>{category}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sep = () => {
    return (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          height: 1.5,
          backgroundColor: theme.color.subTitle,
          marginTop: 15,
          opacity: 0.1,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderCoverImage()}</View>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.6}
          onPress={goBack}>
          <utils.vectorIcon.Ionicons
            name="ios-chevron-back-sharp"
            color={theme.color.buttonText}
            size={23}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 15,
        }}
        showsVerticalScrollIndicator={false}>
        {renderTitleSection()}
        {sep()}
      </ScrollView>
      {renderFullImage()}

      <Toast ref={toast} position="bottom" />
    </SafeAreaView>
  );
}
