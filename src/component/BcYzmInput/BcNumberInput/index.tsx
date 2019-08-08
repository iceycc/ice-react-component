/**
 * @author  Mr.ma
 * @use     针对所有验证码的页面，模仿的input和自定义的键盘
 * @date    2019-07-30
 * @params  placeholder         类似input的placeholder
 *          editInput           是否编辑input
 *          disabled            是否禁用input
 *          value               input的值
 *          className           外围可配置的className
 *          maxLength           最大的可输入长度
 *          fakeInputClassName  高仿的input的className
 *          children            子类
 *          labelNumber         传入的子类可占据的位置
 *          extra               右侧可配置的文字 / 注释
 *          onExtraClick        右侧注释的点击回调函数
 *          onChange            input的change事件
 *          onBlur              input的blur事件  
 */
import React from 'react'
import BcCustomKeyboard from '../BcCustomKeyboard'
import './style.scss'

interface NumberInputProps {
    placeholder?: string,
    editInput?: boolean,
    disabled?: boolean,
    value?: any,
    className?: string,
    maxLength?: number,
    fakeInputClassName?: string,
    children?: any,
    labelNumber?: number,
    extra?: any,
    onChange?: (value: string) => void,
    onBlur?: (value: string) => void,
    onExtraClick?: () => void,
}

class BcYzmInput extends React.Component<NumberInputProps, any>{
    constructor(props) {
        super(props)
        this.state = {
            focus: false, // 默认不聚焦
            value: props.value || '',
        }
    }
    fakeInput = null
    // 伪造的input的点击事件
    onFakeInputClick = () => {
        this.focus()
    }
    focus = () => {
        this.removeBlurListener()
        const { focus } = this.state
        if (!focus) {
            this.onInputFocus()
        }
        setTimeout(() => {
            this.addBlurListener()
        }, 50)
    }
    onChange = (value: any) => {
        this.setState({ value })
        this.props.onChange(value)
    }
    onInputFocus = () => {
        this.setState({
            focus: true
        })
    }
    onInputBlur = (value: string) => {
        const { focus } = this.state
        if (focus) {
            this.setState({
                focus: false
            })
            this.props.onBlur && this.props.onBlur(value)
        }
    }
    doBlur = (ev: MouseEvent) => {
        const { value } = this.state;
        if (ev.target !== this.fakeInput) {
            this.onInputBlur(value);
        }
    }
    addBlurListener = () => {
        document.addEventListener('click', this.doBlur, false);
      }
    removeBlurListener = () => {
        document.removeEventListener('click', this.doBlur, false);
    }
    handleKeyboard = (keyboardVal: string) => {
        console.log(keyboardVal)
        const { maxLength } = this.props
        const { value } = this.state
        const { onChange } = this
        let valueAfterChange
        if (keyboardVal === 'delete') {
            valueAfterChange = value.substring(0, value.length - 1)
            onChange(valueAfterChange)
        } else if (keyboardVal === 'complete') {
            valueAfterChange = value
            onChange(valueAfterChange)
            this.setState({
                focus: false
            })
        } else {
            if (maxLength !== undefined && maxLength >= 0 && (value + keyboardVal).length > maxLength) {
                valueAfterChange = (value + keyboardVal).substr(0, maxLength)
                onChange(valueAfterChange)
            } else {
                valueAfterChange = value + keyboardVal
                onChange(valueAfterChange)
            }
        }
    }
    render() {
        let { value, focus } = this.state
        const {
            placeholder = '输入验证码',
            editInput = true,
            disabled = false,
            className = '',
            fakeInputClassName = '',
            labelNumber = 1,
            children,
            extra,
            onExtraClick
        } = this.props
        const preventKeyboard = disabled || !editInput
        return (
            <>
                <div className={`${className} fake-input-box`}>
                    {children ? (<div style={{ width: 16 * labelNumber + 'px' }} className="label">{children}</div>) : ''}
                    <div className='fake-input-content' onClick={preventKeyboard ? () => { } : this.onFakeInputClick}>
                        {value == '' && (<div className="fake-input-placeholder">{placeholder}</div>)}
                        <div
                            className={`${fakeInputClassName} fake-input ${focus ? 'focus' : ''}`}
                            role="textbox"
                            aria-label={value || placeholder}
                            ref={el => this.fakeInput = el}
                        >
                            {value}
                        </div>
                    </div>
                    {extra && <div className="extra" dangerouslySetInnerHTML={{ __html: extra }} onClick={onExtraClick}></div>}
                </div>
                <BcCustomKeyboard className={focus ? '' : 'none'} onKeyboardClick={this.handleKeyboard} />
            </>
        )
    }
}
export default BcYzmInput
