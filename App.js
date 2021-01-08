import React from 'react';
import { StyleSheet, View } from 'react-native';

import HintHome from './src/HintHome';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <HintHome 
        theme= "501동 사람들"
        style={styles.hintHome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  hintHome: {
    flex: 1,
    backgroundColor: 'red',
  }
});

export default App;
