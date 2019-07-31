import * as React from 'react'
import './index.scss'
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { Button} from 'antd-mobile';
export default function Bottom(props:any){
  let {title} = props
  return <div>
      <span className='bottom'> {title}</span>
      <Button>default</Button>
    </div>
}