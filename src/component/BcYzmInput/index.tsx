import React from 'react'
import './style.scss'
import { InputItem, Button } from 'antd-mobile'
import { Native } from "appBridge/index"
import BcNumberInput from './BcNumberInput'

//最后记得改css引入路径
/**
 * @param countDownFlag 控制是否开始倒数
 * @param click 点击重新获取事件
 * @param timer 倒计时时间
 * @param change 获取value的回调
 */
interface Props {
    countDownFlag: boolean,
    click: Function,
    timer: Number,
    change: Function,
    [propName: string]: any;
}
class BcYzmInput extends React.Component<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            time: props.timer,
            flagTime: false
        }
    }
    componentWillReceiveProps(props) {
        if (props.countDownFlag) {
            this.send()
            props.resetFlag(false)
        }
    }
    setInter = () => {
        this.endTime = setInterval(this.actionCountDown.bind(this), 1000)
    }
    send = () => {
        this.setState({ flagTime: true, time: this.props.timer });
        this.setInter();
    }
    //倒计时开始
    actionCountDown() {
                 endTime = null
        let { time } = this.state
        let { timer } = this.props

        if (time === 0) {
            this.clear()
            this.setState({ flagTime: false, time: timer })
        } else {
            this.setState({
                time: time -= 1,
                flagTime: true
            })
        }
    }
    clear = () => {
        clearInterval(this.endTime)
    }
    componentWillUnmount() {
        this.clear()
    }

    endTime = null

    render() {
        const isIOS = (Native.getSystemType() === 'ios' ? true : false)
        let { click, change } = this.props
        let { time, flagTime } = this.state
        return (
            isIOS ?
                <div className='BcYzm'>
                    <span>
                        <InputItem maxLength={6} onChange={(e) => change(e, flagTime)} type="number" placeholder="输入验证码">验证码</InputItem>
                    </span>
                    <p>
                        <i className='line'></i>
                        <Button className='clearStyle' disabled={flagTime} onClick={() => {
                            click(this.actionCountDown.bind(this))
                        }}><span>{(flagTime ? `${time}秒后重发` : <span style={{ color: '#508CEE' }}>重新获取</span>)}</span></Button>
                    </p>
                </div> :
                <div className="yzm-box">
                    <BcNumberInput
                        className="yzm-input"
                        labelNumber={4}
                        maxLength={6}
                        onChange={(value) => change(value, flagTime)}
                        placeholder="输入验证码"
                        extra={`|<div id=${flagTime ? 'timer' : 'retrieve'}>${flagTime ? time + '秒后重发' : '重新获取'}</div>`}
                        onExtraClick={flagTime ? () => { } : () => click(this.actionCountDown.bind(this))}
                    >验证码</BcNumberInput>
                </div>
        )
    }
}
export default BcYzmInput

