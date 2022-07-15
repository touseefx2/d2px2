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

class downloads {
  constructor() {
    makeObservable(this);
  }

  @observable loader = false;

  @persist('object') @observable data = [];

  @action setloader = obj => {
    this.loader = obj;
  };

  @action setdata = obj => {
    this.data = obj;
  };

  @action.bound
  getDataById() {
    this.setloader(true);
    console.log(db.apis.GET_ORDERS_BY_USER_ID + store.User.user._id);
    db.hitApi(
      db.apis.GET_ORDERS_BY_USER_ID + store.User.user._id,
      'get',
      null,
      store.User.authToken,
    )
      ?.then((resp: any) => {
        console.log(`response  ${db.apis.GET_ORDERS_BY_USER_ID} : `, resp.data);
        this.setloader(false);
        // this.setdata(resp.data);
      })
      .catch(err => {
        this.setloader(false);
        let msg = err.response.data.message || err.response.status;
        console.log(`Error in ${db.apis.GET_ORDERS_BY_USER_ID} : `, msg);
        if (msg == 503 || msg == 500) {
          store.General.setisServerError(true);
          return;
        }

        if (msg == 'No records found') {
          this.setdata([]);
          return;
        }

        Alert.alert('', msg);
      });
  }
}

export const Downloads = new downloads();
