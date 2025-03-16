import axios from 'axios';
import { useEffect } from 'react';
import  { View, Text }  from "react-native";
import { useIsFocused } from '@react-navigation/native'

export default EcranAPIAxios = () => {
    const isFocused = useIsFocused()

    const url = 'https://api.open-meteo.com/v1/forecast'
                    + '?latitude=52.52&longitude=13.41' 
                    + '&current=temperature_2m,wind_speed_10m' 
                    /* + '&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m' */

    useEffect(() => {
        axios({
            method: 'get',
            url: url,
          }).then((response) => {
            console.log(response.data);
          });
    }, [isFocused]) 

    return (
        <View style={{ flex: 1, 
                       alignItems: 'center', 
                       justifyContent: 'center' }}
        >
            <Text>Exemple d'appel à un API avec Axios !</Text>
        </View>
    );
}



