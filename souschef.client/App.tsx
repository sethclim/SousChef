import React, {useEffect, useState} from 'react';
import RootNavigator from './src/navigation';
import {useColorScheme} from 'react-native';
import {theme, darkTheme} from './src/styles/theme';
import {ThemeContext} from './src/contexts/AppContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  let dark = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('MOUTED');
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setDarkMode(dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <RootNavigator />
    </ThemeContext.Provider>
  );
};

export default App;
