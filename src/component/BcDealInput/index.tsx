/**
 * @author  Mr.ma
 * @use     四大交易的输入金额的输入框 & 键盘
 * @date    2019-07-25
 * @params  extra 是否显示全部按钮(可配置文案)
 *          value 初始外界传的参数 / 点击全部金额传入的参数
 *          handleChange 输入input框的change事件
 *          handleExtra 右侧信息的按钮事件
 *          isEdit  内容是否可编辑
 * 还有的api未开放，如需看antd mobile的文档
 */
import React from 'react'
import { createForm } from 'rc-form';
import './style.scss'
import { InputItem, List } from 'antd-mobile'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

interface Props {
    extra?: boolean,
    value: any,
    handleChange?: (val:any)=>{},
    handleExtra?: Function,
    placeholder?: string,
    isEdit?: boolean
}

class DealInput extends React.Component<Props, any> {
    // change 改变值
    change(val) {
        if (val && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(val)) {
            if (val === '.') {
            return '0.';
            }
            return '';
        }
        this.props.handleChange(val)
    }
    // 处理右侧内容的点击事件
    handleExtra() {
        let {extra , handleExtra} = this.props
        extra ? handleExtra() : ''
    }
    onVirtualKeyboardConfirm(val) {
        this.props.onVirtualKeyboardConfirm && this.props.onVirtualKeyboardConfirm(val)
    }
    render () {
        let { placeholder = '请输入金额', extra = '', isEdit = true, value, refs } = this.props
        return (
           <div className="deal-input-box">
                <List>
                    <InputItem
                        ref={(el) => refs && refs(el)}
                        className="input-money"
                        type={'money'}
                        labelNumber={1}
                        moneyKeyboardAlign={'left'}
                        placeholder={placeholder}
                        value={value}
                        editable={isEdit}
                        onChange={(val) => this.change(val)}
                        clear
                        onVirtualKeyboardConfirm={(val) => this.onVirtualKeyboardConfirm(val)}
                        extra={extra}
                        onExtraClick={() => this.handleExtra()}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >¥</InputItem>
                </List>
           </div>
       )
   }
}
export default createForm()(DealInput);