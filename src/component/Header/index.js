import React from 'react'
export default function Header(props){
  let {title = '标题'} = props
      return <div>
        {title}
      </div>
}