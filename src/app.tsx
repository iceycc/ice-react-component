import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './component/Header';
import Bottom from './component/Bottom';

ReactDOM.render(<div>
  <Header>哈哈哈 </Header>
  <Bottom title='测试底部2'/>
</div>, document.getElementById('app'));