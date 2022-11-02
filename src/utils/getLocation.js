import Geolocation from "@react-native-community/geolocation";
import reactNativeAndroidLocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { storeLocation } from "./storage";


const getLocation = () => {
    reactNativeAndroidLocationServicesDialogBox.checkLocationServicesIsEnabled({
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
                console.log(position)
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

export default getLocation()