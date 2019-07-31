import * as React from 'react'
export default class Header extends React.Component<any> {
  render():any{
    let {title} = this.props
    return <div className='bottom'>
      <span>{title}</span>
    </div>
  }
}