import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard
} from 'react-native';
import {styles} from './styles';
import {inject, observer} from 'mobx-react';
import store from '../../store/index';
import utils from '../../utils/index';
import theme from '../../theme';
import DynamicTabView from 'react-native-dynamic-tab-view';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import moment from 'moment';
import Pdf from 'react-native-pdf';
import Modal from "react-native-modal";
// import { TextInput } from 'react-native-paper';

export default observer(PDF);
function PDF(props) {
  const rpdf = useRef(null);
  let internet = store.General.isInternet;
  let dt = props.route.params.dt;
  let d = props.route.params.d;
  let screen = props.route.params.screen;
  console.log('dt : ', dt);
  console.log('book : ', d);
 
  const source = {uri: d.pdf_file, cache: false};

  const [load, setload] = useState(false);
  const [isError, setisError] = useState(false);
 

  const [tp, settp] = useState(0);
  const [cp, setcp] = useState(1);
  const [dp, setdp] = useState("");
  const [isV, setisV] = useState(false);

  let name = d.book_title || '';

  // rpdf?.current?.setPage(10)

  useEffect(() => {
    if (internet) {
    
    }
  }, [internet]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderShowPageNum = () => {
    return (
      <View
        style={{
          width: '80%',
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: responsiveHeight(5),
        }}>
        <TouchableOpacity
        onPress={()=>{
        setisV(true)
        }}
          style={{
            width:75,
            height:35,
            backgroundColor: 'black',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            opacity:0.6
          }}>
          <Text style={{fontSize:14,color:"white",fontFamily:theme.fonts.fontBold}}>{cp} / {tp}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const gotoDirectPage=()=>{
    closeDirectPageModa()
    rpdf?.current?.setPage(parseInt(dp));

  };

  const closeDirectPageModa=()=>{
    setisV(false);setdp("");Keyboard.dismiss()
  }

  const DirectPageModal=()=>{
    return(
<Modal
backdropOpacity={0.5}
animationIn={"slideInUp"}
animationOut={"slideOutDown"}
onBackButtonPress={()=>{closeDirectPageModa()}} isVisible={isV}>
        <View style={{ width:300,backgroundColor:"white",borderRadius:5,alignSelf:"center",elevation:3,padding:20 }}>
          <Text style={{fontSize:20,fontFamily:theme.fonts.fontNormal,color:theme.color.title}}>Go to page</Text>
      
      <View style={{marginTop:15,width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"space-between" }}>
        <View style={{width:"70%"}}>
      <TextInput
    maxLength={JSON.stringify(tp).length}
      placeholderTextColor={theme.color.subTitle}
      style={{backgroundColor:"white",fontSize:14,color:theme.color.title,borderBottomColor:theme.color.button1,borderBottomWidth:1.5}}
      keyboardType="number-pad"
      placeholder='Enter Page Number'
      value={dp}
      onChangeText={text => {
        if(dp==""){
          if(text<=0){
            return;
          }
        }
        text<=tp  ? setdp(text.replace(/[^0-9]/g, '')):""

      }}
    />
        </View>
     
    <View style={{width:"25%",alignItems:"flex-end"}} >
<Text  style={{fontSize:14,color:theme.color.title,fontFamily:theme.fonts.fontNormal}}>(1 - {tp})</Text>
    </View>

      </View>

      <View style={{marginTop:40,width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"space-between" }}>
        <View style={{width:"73%",alignItems:"flex-end"}}>
       <TouchableOpacity onPress={()=>closeDirectPageModa()}>
       <Text  style={{fontSize:14,color:theme.color.button1,fontFamily:theme.fonts.fontMedium}}>CANCEL </Text>
       </TouchableOpacity>
        
        </View>
     
    <View style={{width:"20%",alignItems:"flex-end",opacity:dp==""?0.6:3}} >
    <TouchableOpacity disabled={dp==""?true:false} style={{ opacity:dp==""?0.6:3}}  onPress={gotoDirectPage}>
    <Text  style={{fontSize:14,color:theme.color.button1,fontFamily:theme.fonts.fontMedium}}>OK</Text>
       </TouchableOpacity>
    </View>

      </View>

      <View>

      </View>

        </View>
      </Modal>
    )
  }

  return (
    <>
     
    <SafeAreaView style={styles.container}>
      {!internet && <utils.InternetMessage />}
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity activeOpacity={0.6} onPress={goBack}>
            <utils.vectorIcon.Ionicons
              name="chevron-back"
              color={theme.color.title}
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '92%'}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.htitle}>
            {name}
          </Text>
        </View>
      </View>


  <Pdf
        ref={rpdf}
        trustAllCerts={false}
        source={source}
 
        onLoadComplete={(numberOfPages, filePath) => {
          setload(true);
         
          settp(numberOfPages)
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
          setcp(page)
        }}
        onError={error => {
          setisError(true)
          console.log("error " ,error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />

      

      {/* {!load && (
        <ActivityIndicator
          size={40}
          color={theme.color.button1}
          style={{position: 'absolute', top: '40%', alignSelf: 'center'}}
        />
      )} */}
      {DirectPageModal()} 
      {load &&  renderShowPageNum()}
    </SafeAreaView>
 
       </>
  );
}
