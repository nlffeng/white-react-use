/**
 * App
 */

import React, { FunctionComponent, useState, useEffect } from 'react';
import { useRemountKey } from '../src/useRemountComponent'
// import './index.scss';

interface Props {
}

const App: FunctionComponent<Props> = (props) => {
  const [num, setNum] = useState(0)
  const remountKey = useRemountKey({ listenFactor: num })

  useEffect(() => {
    setTimeout(() => {
      setNum(num + 1)
    }, 1000)
  }, [])

  return (
    <div className="">
      {remountKey}
    </div>
  );
}

App.defaultProps = {};

export default React.memo(App);
