import { Base64 } from "js-base64";


declare var window: any;
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 调用安卓和ios 必须双引号
// const HeaderType =
export const Base = {
    getSystemType() {
        if (isAndroid) return 'android'
        if (isIOS) return 'ios'
        return 'h5'
    },
    isApp() {
        if (u.indexOf("besharp") != -1) {
            return true
        } else if (u.indexOf("pincai") != -1) {
            return true
        } else if (JSON.parse(sessionStorage.getItem('isBicaiApp')) === '1') {
            return true
        } else {
            return false
        }
    }
}