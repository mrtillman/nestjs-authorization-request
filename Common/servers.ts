let API = 'https://api.counter-culture.io';
let APP = 'https://www.counter-culture.io';
let SECURE = 'https://secure.counter-culture.io';

if (process.env.NODE_ENV !== 'production') {
  API = 'http://counter-culture:4000';
  APP = 'http://counter-culture:8080';
  SECURE = 'http://counter-culture:5000';
}

export class SERVERS {
  public static get API(){ return API }
  public static get APP(){ return APP }
  public static get SECURE(){ return SECURE }
};
