import React, {useEffect, useState} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Platform} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from '@react-native-community/geolocation';
import store from './store';
import Routes from './Routes';
import {storeLocation} from './utils/storage'
import LoginProvider from './context/LoginProvider';

const queryClient = new QueryClient()

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('carregou o app')
    if(Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Localização desativada</h2>O aplicativo precisa da localizção do dispositivo ativa",
        ok: "Ativar",
        cancel: "Cancelar",
        enableHighAccuracy: true,
        showDialog: true,
        openLocationServices: true,
        preventOutSideTouch: false,
        preventBackClick: false,
        providerListener: false
      }).then(function(success) {
          console.log(success);
          Geolocation.getCurrentPosition(
            async (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }

              await storeLocation(coords)
            })
      }).catch((error) => {
          console.log(error.message);
      });
    }
    setTimeout(() => {
      setLoading(true);
    }, 400);
  }, [loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <Provider store={store}>{loading ? <Routes /> : <></>}</Provider>
      </LoginProvider>
    </QueryClientProvider>
  );
};

export default App;
