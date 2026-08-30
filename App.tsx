import React from 'react';

import RootNavigator from './src/app/navigation/RootNavigator';
import StoreProvider from './src/app/providers/StoreProvider';


const App = () => {
  return (
    <StoreProvider>
      <RootNavigator />
    </StoreProvider>
  );
};

export default App;