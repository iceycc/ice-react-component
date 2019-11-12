import {appBridge,isAndroid,isIOS,appBridgeInterface} from './appBridge'
interface BcUtilsInterface {
  Native:appBridgeInterface,
  appBridge:appBridgeInterface,
  isAndroid:boolean,
  isIOS:boolean,
  goBank():void
}
export class BcUtils implements BcUtilsInterface {
    Native = appBridge
    appBridge = appBridge
    isAndroid = isAndroid
    isIOS = isIOS
    goBank(){
    }
}
export default new BcUtils()
