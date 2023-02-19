import React from "react";
import { Text } from 'react-native';

const Sleepy = React.forwardRef((_props, ref) => {
  const [status, setStatus] = React.useState('mounted')
  React.useImperativeHandle(ref, () => ({
    async work(ms) {
      console.log('sleeping...')
      setStatus('sleeping...')
      await (new Promise(resolve => setTimeout(resolve, ms)))
      console.log('working...')
      setStatus('working...')
      await (new Promise(resolve => setTimeout(resolve, ms)))
      console.log('done')
      setStatus('done')
    },
  }));

  return <Text>Sleepy is {status}</Text>
});

export default Sleepy;
