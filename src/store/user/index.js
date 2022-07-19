import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';
import store from '../index';
import NetInfo from '@react-native-community/netinfo';
import db from '../../database/index';
import {Alert} from 'react-native';
// import carStore from '../index';
// import NotificationManager from '../index';
// import db from '../../database/index';
// import utils from '../../utils';
// import store from '../index';
// import auth from '@react-native-firebase/auth';

class user {
  constructor() {
    makeObservable(this);
  }

  @observable cart = {totalbill: 0, totalitems: 0, data: []};
  @observable isAddModal = false;
  @observable isVarModal = false;
  @observable isSubModal = false;
  @observable isChkLoginModal = false;

  @observable loader = false;
  @observable fvrtloader = false;
  @observable adrsloader = false;
  @observable loginLoader = false;
  @observable regLoader = false;

  @persist('object') @observable location = false; //set  delivery adress location
  @observable cl = false; //curemt location
  @observable rl = false; //curemt resturant location
  @persist('object') @observable user = false;
  @persist('object') @observable polygons = [];

  @persist('object') @observable fvrtList = [];
  @persist('object') @observable adrsList = [];

  @persist('object') @observable adverBooks = [];
  @persist('object') @observable bookCat = [];

  @observable AdverbookLoader = false;
  @observable catLoader = false;

  @observable online = false;
  @observable notificationToken = '';
  @persist @observable authToken = '';

  @observable isGetAllDatainSplash = false;
  @observable total = 0; //total uploaded image length
  @observable done = 0; //done uloaded image counter
  @observable isAllImageUploadDone = false;

  @action setcart = obj => {
    this.cart = obj;
  };

  @action setisAddModal = obj => {
    this.isAddModal = obj;
  };

  @action setisSubModal = obj => {
    this.isSubModal = obj;
  };
  @action setisChkLoginModal = obj => {
    this.isChkLoginModal = obj;
  };

  @action setisVarModal = obj => {
    this.isVarModal = obj;
  };

  @action setloginLoader = obj => {
    this.loginLoader = obj;
  };

  @action setregLoader = obj => {
    this.regLoader = obj;
  };

  @action setLocation = obj => {
    this.location = obj;
  };

  @action setfvrtList = obj => {
    this.fvrtList = obj;
  };

  @action setadrsList = obj => {
    this.adrsList = obj;
  };

  @action setadrsloader = obj => {
    this.adrsloader = obj;
  };

  @action setfvrtloader = obj => {
    this.fvrtloader = obj;
  };

  @action setadverBooks = obj => {
    this.adverBooks = obj;
  };

  @action setbookCat = obj => {
    this.bookCat = obj;
  };

  @action setAdverbookLoader = obj => {
    this.AdverbookLoader = obj;
  };

  @action setcatLoader = obj => {
    this.catLoader = obj;
  };

  @action.bound
  addPolygons(val) {
    this.polygons = val;
  }

  @action setLoader = obj => {
    this.loader = obj;
  };

  @action setonline = obj => {
    this.online = obj;
  };

  @action setcl = obj => {
    this.cl = obj;
  };

  @action setrl = obj => {
    this.rl = obj;
  };

  @action.bound
  setisAllImageUploadDone(c) {
    this.isAllImageUploadDone = c;
  }

  @action.bound
  settotal(t) {
    this.total = t;
  }

  @action.bound
  setdone(t) {
    this.done = t;
  }

  @action.bound
  setisGetAllDatainSplash(val) {
    this.isGetAllDatainSplash = val;
  }

  @action.bound
  setUser(val) {
    this.user = val;
  }

  @action.bound
  addnotificationToken(n) {
    this.notificationToken = n;
  }

  addUser(token, user) {
    console.log('add user : ', token, user);
    this.addauthToken(token);
    this.setUser(user);
    return;
  }

  @action.bound
  addauthToken(n) {
    this.authToken = n;
  }

  @action.bound
  getAllData = c => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        console.log('get all  data  : ', c);

        if (c == 'user') {
          // this.attemptToGetUser();
          // store.Orders.getOrderById();
          // this.attemptToGetFavtList();
          // this.attemptToGetAdressList()
        }

        // this.attemptToSubTopic();
        this.getAdverBooks();
        this.getBooksCat();
      }
    });
  };

  @action.bound
  getAdverBooks() {
    this.setAdverbookLoader(true);
    db.hitApi(db.apis.GET_ADVERBOOKS, 'get', null, null)
      ?.then((resp: any) => {
        this.setAdverbookLoader(false);
        console.log(`response  ${db.apis.GET_ADVERBOOKS} : `, resp.data.data);
        this.setadverBooks(resp.data.data);
        this.setisGetAllDatainSplash(true);
      })
      .catch(err => {
        this.setAdverbookLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ADVERBOOKS} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  getBooksCat() {
    this.setcatLoader(true);
    db.hitApi(db.apis.GET_ALL_CATEGORY, 'get', null, null)
      ?.then((resp: any) => {
        this.setcatLoader(false);
        console.log(`response  ${db.apis.GET_ALL_CATEGORY} : `, resp.data.data);
        let dt = resp.data.data;
        let ar = [];
        if (dt.length > 0) {
          dt.map((e, i, a) => {
            ar.push({name: e.category_name, isSel: false});
          });
        }
        this.setbookCat(ar);
      })
      .catch(err => {
        this.setcatLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ALL_CATEGORY} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  attemptToGetUser() {
    db.hitApi(
      db.apis.GET_USER_BY_ID + this.user._id,
      'get',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_USER_BY_ID} : `, resp.data);
        let u = resp.data.data[0];
        this.setUser(u);
        // if (u.isActive) {
        //   this.setUser(u);
        // } else {
        //   alert('block');
        // }
      })
      .catch(err => {
        console.log(
          `Error in ${db.apis.GET_USER_BY_ID} : `,
          err.response.data.message,
        );
      });
  }

  @action.bound
  attemptToGetFavtList() {
    this.setfvrtloader(true);
    db.hitApi(
      db.apis.GET_FAVRT_FOOD_LIST_BY_USER_ID + this.user._id,
      'get',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setfvrtloader(false);
        console.log(
          `response  ${db.apis.GET_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          resp.data,
        );
        // this.setfvrtList(resp.data.data[0]);
      })
      .catch(err => {
        this.setfvrtloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(
          `Error in ${db.apis.GET_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          msg,
        );
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        if (msg == 'No records found') {
          // this.setfvrtList([]);
          return;
        }
        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToGetAdressList() {
    this.setadrsloader(true);
    db.hitApi(
      db.apis.GET_ADDRESS_BY_USER_ID + this.user._id,
      'get',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setadrsloader(false);
        console.log(
          `response  ${db.apis.GET_ADDRESS_BY_USER_ID} : `,
          resp.data,
        );
        // this.setadrsList(resp.data.data[0]);
      })
      .catch(err => {
        this.setadrsloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ADDRESS_BY_USER_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        if (msg == 'No records found') {
          // this.setfvrtList([]);
          return;
        }
        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToAddFavtList(id) {
    this.setfvrtloader(true);
    let fid = id;
    db.hitApi(
      db.apis.SET_FAVRT_FOOD_LIST_BY_USER_ID + this.user._id,
      'post',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setfvrtloader(false);

        console.log(
          `response  ${db.apis.SET_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          resp.data,
        );
        // this.setfvrtList(resp.data.data[0]);
      })
      .catch(err => {
        this.setfvrtloader(false);

        let msg = err.response.data.message || err.response.status;
        console.log(
          `Error in ${db.apis.SET_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          msg,
        );
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToRemoveFavtList(id) {
    this.setfvrtloader(true);
    let fid = id;
    db.hitApi(
      db.apis.REMOVE_FAVRT_FOOD_LIST_BY_USER_ID + this.user._id,
      'post',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setfvrtloader(false);
        console.log(
          `response  ${db.apis.REMOVE_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          resp.data,
        );
        // this.setfvrtList(resp.data.data[0]);
      })
      .catch(err => {
        this.setfvrtloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(
          `Error in ${db.apis.REMOVE_FAVRT_FOOD_LIST_BY_USER_ID} : `,
          msg,
        );
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToAddAddressList(id) {
    this.setadrsloader(true);
    let fid = id;
    db.hitApi(
      db.apis.ADD_ADDRESS_BY_USER_ID + this.user._id,
      'post',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setadrsloader(false);
        console.log(
          `response  ${db.apis.ADD_ADDRESS_BY_USER_ID} : `,
          resp.data,
        );
        // this.setadrsList(resp.data.data[0]);
      })
      .catch(err => {
        this.setadrsloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.ADD_ADDRESS_BY_USER_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg);
      });
  }

  @action.bound
  attemptToRemoveAddressList(id) {
    this.setadrsloader(true);
    let fid = id;
    db.hitApi(
      db.apis.REMOVE_ADDRESS_BY_USER_ID + this.user._id,
      'post',
      null,
      this.authToken,
    )
      ?.then((resp: any) => {
        this.setadrsloader(false);
        console.log(
          `response  ${db.apis.REMOVE_ADDRESS_BY_USER_ID} : `,
          resp.data,
        );
        // this.adrsList(resp.data.data[0]);
      })
      .catch(err => {
        this.setadrsloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.REMOVE_ADDRESS_BY_USER_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg);
      });
  }
  @action.bound
  attemptToLogin(body, calFunc) {
    this.setloginLoader(true);

    db.hitApi(db.apis.LOGIN_USER, 'post', body, null)
      ?.then((resp: any) => {
        this.setloginLoader(false);
        console.log(`response  ${db.apis.LOGIN_USER} : `, resp.data);
        let data = resp.data.data;
        let token = resp.data.token;
        this.addUser(token, data);

        calFunc();
      })
      .catch(err => {
        this.setloginLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.LOGIN_USER} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  attemptToSubTopic() {
    let body = {
      token: this.notificationToken,
      topic: 'contactus',
    };

    db.hitApi(db.apis.SUBSCRIBE_TOPIC, 'post', body, null)
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.SUBSCRIBE_TOPIC} : `, resp.data);
      })
      .catch(err => {
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.SUBSCRIBE_TOPIC} : `, msg);
      });
  }

  // @action.bound
  // attempToPlaceOrder(Order, suc) {
  //   this.setLoader(true);
  //   db.hitApi(db.apis.PLACE_ORDER, 'post', Order, null)
  //     ?.then(resp => {
  //       this.setLoader(false)
  //       console.log(`response  ${db.apis.PLACE_ORDER} : `, resp.data);
  //       suc(resp.data);
  //     })
  //     .catch(err => {
  //       console.log(
  //         `Error in ${db.apis.PLACE_ORDER} : `,
  //         err.response.data.message,
  //       );
  //       this.setLoader(false);
  //     });
  // }

  @action.bound
  registerUser(body, funCal) {
    console.log('rgstr user body : ', body);
    this.setregLoader(true);
    db.hitApi(db.apis.REGISTER_USER, 'post', body, null)
      ?.then(resp => {
        this.setregLoader(false);
        console.log(`response  ${db.apis.REGISTER_USER} : `, resp.data);
        let data = resp.data.data;
        let token = resp.data.token;
        this.addUser(token, data);
        funCal();
      })
      .catch(err => {
        this.setregLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.REGISTER_USER} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  updateUser(body, funCal) {
    console.log('update user body : ', body);
    console.log('auth token : ', this.authToken);
    console.log('api cal : ', db.apis.UPDATE_USER + this.user.user._id);
    this.setregLoader(true);
    db.hitApi(
      db.apis.UPDATE_USER + this.user.user._id,
      'put',
      body,
      this.authToken,
    )
      ?.then(resp => {
        this.setregLoader(false);
        console.log(`response  ${db.apis.UPDATE_USER} : `, resp.data);
        // let data = resp.data.data;
        // let token = resp.data.token;
        // this.addUser(token, data);
        // funCal();
      })
      .catch(err => {
        this.setregLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.UPDATE_USER} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  @action.bound
  attemptToRegister(dataa, goHome, goCheckout, s) {
    const {image} = dataa;
    this.setregLoader(true);
    let imgArr = [];
    if (image != '') {
      image.chk = 'profile';
      imgArr.push(image);
    }

    if (imgArr.length > 0) {
      try {
        imgArr.map((e, i, a) => {
          const data = new FormData();
          const newFile = {
            uri: e.uri,
            type: e.type,
            name: e.fileName,
          };
          data.append('files', newFile);
          fetch(db.apis.BASE_URL + db.apis.IMAGE_UPLOAD, {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => response.json())
            .then(responseData => {
              let c = '';
              if (e.chk == 'profile') {
                c = responseData.data[0].imgrUrl;
              }
              if (i == a.length - 1) {
                const dt = {...dataa};
                delete dt.image;
                dt.image = c;
                this.registerUser(dt, goHome, goCheckout, s);
                return;
              }
            })
            .catch(err => {
              this.setregLoader(false);
              let msg = err.response.data.message || err.response.status;
              console.log('Error in Upload Images arr', msg);
              if (msg == 503 || msg == 500) {
                store.General.setisServerError(true);
                return;
              }
              Alert.alert('', msg);
            });
        });
      } catch (err) {
        this.setregLoader(false);
        let msg = err.response.data.message || err.response.status;
        console.log('Error in Upload Images arr', msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg);
      }
    } else {
      this.registerUser(dataa, goHome, goCheckout, s);
    }
  }

  @action.bound
  ChangePassword(cp, np, suc) {
    this.setLoader(true);
    let body = {
      _id: this.user.user._id,
      curr_pass: cp,
      new_pass: np,
    };

    db.hitApi(
      db.apis.CHANGE_PASSWORD + this.user.user._id + '/password/change',
      'put',
      body,
      this.authToken,
    )
      ?.then(resp => {
        this.setLoader(false);
        console.log(`response  ${db.apis.CHANGE_PASSWORD} : `, resp.data);
        suc();
      })
      .catch(err => {
        this.setLoader(false);

        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.CHANGE_PASSWORD} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }
        Alert.alert('', msg.toString());
      });
  }

  // @action.bound
  Logout(goHome) {
    this.authToken = '';
    this.user = false;
    // this.setfvrtList([]);
    // this.setadrsList([]);
    store.Downloads.setdata([]);
    store.Downloads.setpList([])
    this.setisGetAllDatainSplash(false);
    // this.setcart({totalbill: 0, totalitems: 0, data: []});
    goHome();
  }
}

export const User = new user();
