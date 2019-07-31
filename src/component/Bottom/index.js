import React from 'react'
export default function Bottom(props){
  let {title = '底部'} = props
      return <div>
        {title}
      </div>
}