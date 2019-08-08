import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BcHeader from './component/BcHeader';
import Bottom from './component/Bottom';

ReactDOM.render(<div>
  <BcHeader>哈哈哈 </BcHeader>
  <Bottom title='测试底部2'/>
</div>, document.getElementById('app'));
