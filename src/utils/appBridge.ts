declare var window: any;
import { Base64 } from "js-base64";
var u = navigator.userAgent;
export const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
export const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 调用安卓和ios 必须双引号
// const HeaderType =
export interface appBridgeInterface {
  isAndroid:boolean
  isIOS:boolean
  getSystemType():'android' |'ios' | 'h5'
  isApp():boolean
  goProDetail(any):Promise<any>
}
export const appBridge:appBridgeInterface = {
    isAndroid,
    isIOS,
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
    },
    // 去产品详情页
    goProDetail({ data }) {
        if (isAndroid) {
            if (window.native) {
                // routeKey：bankProduct
                // productId：产品id
                // rateId：智能存款 rateId
                // routeKey:'bankProduct',productId:prdId,rateId: params.RATE_ID || ''
                window.native.openProductDetail(data.routeKey, data.productId, data.rateId || '', data.depositTypeId)
                // window.native.openProductDetail(data.routeKey, data.productId, '', data.depositTypeId)
                // this.closeWebView() // 修改h5跳转app出现回退情况
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            try {
                if (window.webkit) {
                    window.webkit.messageHandlers.apiRoute.postMessage({
                        routeKey: 'bankProduct',
                        data: {
                            ...data
                        }
                    });
                    return Promise.resolve('ios')
                } else {
                    return Promise.reject("error isIOS window.webkit")
                }
            } catch (e) {
                return Promise.reject(e)
            }
        } else {
            return Promise.reject('')
        }
    },
}
