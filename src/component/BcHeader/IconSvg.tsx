import React from 'react'


interface IProps {
    wid?: string,
    hte?: string,
    color?: string
}

export default (props: IProps) => {
    let { wid = 17, hte = 17, color = '#333333' } = props
    return <svg className="icon" width={wid+"px"} height={hte+"px"} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill={color} d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
    </svg>
}


