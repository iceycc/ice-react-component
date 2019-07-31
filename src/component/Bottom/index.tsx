import * as React from 'react'
import './index.scss'
export default function Bottom(props:any){
  let {title} = props
  return <div>
      <span className='bottom'> {title}</span>
    </div>
}