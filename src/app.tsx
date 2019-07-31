import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './component/Header';
import Bottom from './component/Bottom';

ReactDOM.render(<div>
  <Header title='测试标题1'/>
  <Bottom title='测试底部2'/>
</div>, document.getElementById('app'));