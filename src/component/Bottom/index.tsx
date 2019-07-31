import * as React from 'react'
// import './index.scss'
// export default class Bottom extends React.Component<any> {
//   render():any{
//     let {title} = this.props
//     return <div>
//      <span className='bottom'> {title}</span>
//     </div>
//   }
// }

export default function Bottom(props:any){
  let {title} = props
  return <div>
      <span className='bottom'> {title}</span>
    </div>
}