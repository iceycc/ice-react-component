import * as React from 'react'
interface IHeader {
  title:string,
}
export default class Header extends React.Component<IHeader> {
  render():any{
    let {title} = this.props
    return <div className='bottom'>
      <span>{title}</span>
    </div>
  }
}