import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import Bottom from './component/Bottom';

ReactDOM.render(<div>
  <Header title='测试标题'/>  
  <Bottom title='测试底部'/>
</div>, document.getElementById('app'));