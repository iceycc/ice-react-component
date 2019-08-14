import { Base64 } from "js-base64";


declare var window: any;
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 调用安卓和ios 必须双引号
// const HeaderType =
export const Native = {
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
    //每次跳转安卓的原生页面都得关闭一下 ios跳转后不需要关闭
    // 1. app二类户持仓页
    // 2. app产品详情页 openProductDetail
    // 3. app本行产品列表页：
    // 4. app登录页：
    // 5. 关闭当前webview ：closeSelf
    // 去产品详情页
    goProDetail({ data }:any) {
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
    // 去本行的产品列表
    goBankList({ data }:any, flag) {
        if (isAndroid) {
            if (window.native) {
                window.native.openBankProduct(data.routeKey, data.orgId)
                if (flag) {
                    this.closeWebView()
                }
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            try {
                if (window.webkit) {
                    // todo
                    window.webkit.messageHandlers.apiRoute.postMessage({
                        routeKey: 'bankProductList',
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
    // 开户成功通知原生
    openInfoSuccess(data:any) {
        if (isAndroid) {
            if (window.native) {
                window.native.openInfoSuccess(data.closeState, data.orgId)
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            try {
                if (window.webkit) {
                    window.webkit.messageHandlers.apiOpenAccountSucceed.postMessage("");
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
    // 全行的产品列表(比财app首页)
    goOpenHome({ data }) {
        if (isAndroid) {
            if (window.native) {
                window.native.openHome(data.routeKey, data.index)
                this.closeWebView()
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            this.gotoMainPage() //ios调用2.0首页
        } else {
            return Promise.reject('')
        }
    },
    // 关闭当前webview
    closeWebView() {
        if (isAndroid) {
            if (window.native) {
                window.native.closeSelf()
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            try {
                if (window.webkit) {
                    window.webkit.messageHandlers.apiWebViewClose.postMessage(null)
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
    // 购买成功页banner外链跳转判断
    goBannerUrl(data?) {
        if (isAndroid) {
            if (window.native && window.native.go20H5) {
                window.native.go20H5(data.url, data.closeState)
                //  this.closeWebView()
                return Promise.resolve('isAndroid')
            } else {
                window.location.href = data.url;
                return Promise.resolve("error isAndroid window.native")
            }
        } else if (isIOS) {
            window.location.href = data.url;
            return Promise.resolve('ios')
        } else {
            window.location.href = data.url;
            return Promise.resolve('')
        }
    },
    // 去app持仓页 走关闭当前页。 todo 现在还没实现
    goChiC(data?) {
        if (isAndroid) {
            if (window.native) {
                // todo 暂时走的是直接关闭
                // window.native.openInvest(data.prdTypeId, data.depositTypeId, data.pId)
                // this.closeWebView()
                window.native.goBcai20()
                return Promise.resolve('isAndroid')
            } else {
                return Promise.reject("error isAndroid window.native")
            }
        } else if (isIOS) {
            try {
                if (window.webkit) {
                    // todo
                    window.webkit.messageHandlers.apiRoute.postMessage({
                        routeKey: 'holdingAssets',
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
    // 自定义原生头部样式
    apiNavBarStyleClose(type: 'none' | 'back' | 'close' | 'empty' = 'back') {
        // * @param type 0:隐藏标题栏目，1显示左边按钮返回，2显示右边按钮关闭，3 左右按钮全不显示
        const HeaderStyle = new Map([
            ['none', '0'],
            ['back', '1'],
            ['close', '2'],
            ['empty', '3'],
        ]).get(type)
        if (isAndroid) {
            if (window.native) {
                try {
                    window.native.apiNavBarStyleClose(HeaderStyle);
                } catch (err) {
                    console.log("error window.native.apiNavBarStyleClose( )")
                }
            } else {
                console.log("error window.native.apiNavBarStyleClose( )")
            }
        } else if (isIOS) {
            if (window.webkit) {
                try {
                    window.webkit.messageHandlers.apiNavBarStyle.postMessage(
                        { style: HeaderStyle }
                    )
                } catch (err) {
                    console.log("error window.webkit.messageHandlers.apiNavBarStyle.postMessage( )")
                }
            } else {
                console.log("error window.webkit( )")
            }
        }
    },
    // 去登录
    goAppLogin() { //
        let data = Base64.encode(JSON.stringify({ type: "1" }))
        try {
            if (isAndroid) {
                if (window.native) {
                    window.native.reLogin()
                    return Promise.resolve("isAndroid")
                } else {
                    return Promise.reject("isAndroid")
                }
            } else if (isIOS) {
                try {
                    if (window.IOSWebJSInterface) {
                        window.IOSWebJSInterface.jsNeedLogin(data)
                        return Promise.resolve("isIOS")
                    } else if (window.webkit) {
                        window.webkit.messageHandlers.jsNeedLogin.postMessage(data)
                        return Promise.resolve("isIOS")
                    } else {
                        return Promise.reject("error window.webkit.messageHandlersjsNeedLogin.postMessage( )")
                    }
                } catch (err) {
                    return Promise.reject(err);
                }
                //  this.goLogin();  //调用2.0登录
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    },

    // 其他方法：：
    goLogin() {//跳原生登录页面
        let data = Base64.encode(JSON.stringify({ type: "1" }))
        try {
            if (isAndroid) {
                window.android.jsNeedLogin(data)
            } else if (isIOS) {
                if (window.IOSWebJSInterface) {
                    window.IOSWebJSInterface.jsNeedLogin(data)
                } else if (window.webkit) {
                    try {
                        window.webkit.messageHandlers.jsNeedLogin.postMessage(data)

                    } catch (err) {
                        console.log("error window.webkit.messageHandlersjsNeedLogin.postMessage( )")
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    clearToken() {
        // ios清除token
        // let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        // let dataIOS =  Base64.encode(JSON.stringify(data))
        if (isAndroid) {
            // window.android.h5OpenApiBuy( dataAndroid );
        } else if (isIOS) {

            if (window.IOSWebJSInterface) {
                console.log(1)
                window.IOSWebJSInterface.clean_token1('')
            } else if (window.webkit) {
                console.log(2)
                try {
                    window.webkit.messageHandlers.clean_token1.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.clean_token1( )")
                }
            }
        }
    },
    h5Share(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid) {
            window.android.h5Share(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5Share(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5Share.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5Share( )")
                }
            }
        }
    },
    h5ShareImage(data) {
        let dataAndroid = JSON.stringify(data);
        let dataIOS = JSON.stringify(data)
        if (isAndroid) {
            window.android.h5ShareImage(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareImage(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareImage.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareImage( )")
                }
            }
        }
    },
    updateTitle(title) {
        document.title = title
        let dataAndroid = Base64.encode(encodeURIComponent(title));
        if (isAndroid) {
            // if(window.native&&window.native.updateTitle){    //安卓不用h5去设置title他们自己获取
            //      window.native.updateTitle( dataAndroid );
            // }else{
            //     // window.native.updateTitle( dataAndroid );
            // }
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.updateTitle(title)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.updateTitle.postMessage(title);
                } catch (err) {
                    console.log("error window.webkit.updateTitle( )")
                }
            }
        }
    },
    h5OpenApiBuy(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid) {
            window.android.h5OpenApiBuy(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5OpenApiBuy(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5OpenApiBuy.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5OpenApiBuy( )")
                }
            }
        }
    },
    saveImgAlbumForBack(data) {
        if (isAndroid) {
            window.android.saveImgAlbumForBack(data);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.saveImgAlbumForBack(data)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.saveImgAlbumForBack.postMessage(data);
                } catch (err) {
                    console.log("error window.webkit.saveImgAlbumForBack( )")
                }
            }
        }
    },
    sendLoginResult() {
        if (isAndroid) {
            window.android.sendLoginResult();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.sendLoginResult()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.sendLoginResult.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.sendLoginResult( )")
                }
            }
        }
    },
    gotoMainPage() {
        if (isAndroid) {
            window.android.gotoMainPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoMainPage()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoMainPage.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.gotoMainPage( )")
                }
            }
        }
    },
    h5ShareWXProgram(data:any) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid) {
            window.android.h5ShareWXProgram(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareWXProgram(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareWXProgram.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareWXProgram( )")
                }
            }
        }
    },
}