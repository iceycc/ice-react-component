import * as React from 'react'
import './style.scss'
import checkuserAgent from 'utils/checkiserAgemt'
import { goBank } from 'utils/index'
import { Native } from "appBridge/index"
import IconSvg from './IconSvg'
declare namespace window {
    namespace document{
        let title:any
    }
}
interface IHeaderProps {
    headerarr?: string[],
    store?: any,
    className?: string,
    border?: boolean,
    isShow?: boolean,
    detailedTab?: any,
    refs?: any,
    // 传none是隐藏app的标题。传back是左边带返回按钮的，默认的不传就是这个。close是右边关闭按钮的。empty是左右没按钮的，交易结果页处理中页面都是这种的，
    type?: 'none' | 'back' | 'close' | 'empty',
    leftColor?: string,
}
const initState =   {
    show: true,
    detailedTabSelect: 0, // tab默认选中为0
}
type Istate =Readonly<typeof initState>
export default class Headers extends React.Component<IHeaderProps, Istate>{
    readonly state:Istate = initState

  
    componentWillMount(): void {
        let isE = checkuserAgent()
        if (isE.isApp || isE.isWeixin || isE.isWeibo || isE.isDingTalk || Native.isApp()) {
            this.setState({
                show: false
            })
        } else {
            this.setState({
                show: true
            })
        }
    }
    // headerBox
    /**
     * 0:隐藏导航栏，1显示左边按钮，2显示右边按钮，3全不显示
     */
    private HeaderStyle = new Map([
        ['none', () => {
            // 0:隐藏导航栏，
            return null
        }],
        ['back', () => {
            let { leftColor = '#333333' } = this.props
            let style:React.CSSProperties = { border: this.props.border && "none" }
            return <div className={'headers-bar' + " " + this.props.className}
                style={style}>
                <p className='headers-bar-back' style={{ display: 'block' }}
                    onClick={() => goBank()}><IconSvg color={leftColor} /></p>
                <p className='headers-bar-tit'>{this.props.children}</p>
            </div>
        }],
        ['close', () => {
            let style:React.CSSProperties = { border: this.props.border && "none" }
            return <div className={'headers-bar' + " " + this.props.className}
                style={style}>
                <p className='headers-bar-tit'>{this.props.children}</p>
                <p className='headers-bar-close' onClick={() => goBank()}>
                    {/* <img src={require('../../assets/images/closeO.png')} alt=""/> */}
                </p>
            </div>
        }],
        ['empty', () => {
            let style:React.CSSProperties = { border: this.props.border && "none" }
            return <div className={'headers-bar' + " " + this.props.className}
                style={style}><p
                    className='headers-bar-tit'>{this.props.children}</p></div>
        }]
    ])

    componentDidMount() {
        navigator.userAgent;
        let document = window.document
        document.title = this.props.children
        Native.updateTitle(this.props.children)
    }
    renderStatus(el = 'back'): any {
        if (this.HeaderStyle.has(el)) {
            return this.HeaderStyle.get(el)()
        } else {
            return this.HeaderStyle.get('back')()
        }
    }
    render() {
        let document = window.document
        document.title = this.props.children
        let { refs = null } = this.props
        let { type } = this.props
        if (Native.isApp()) {
            let version = ''
            // require('public/appConfig.json').app.version;
            Native.apiNavBarStyleClose(type)
            console.log('app.version', version)
            Native.updateTitle((this.props.children) + version || ' ')
        }
        return <div className='bcd-headers' ref={(el) => refs && refs(el)}>
            {
                // 控制显示原生的头部还是H5的
                this.state.show ?
                    this.renderStatus(type) : null
            }
        </div>
    }
}
