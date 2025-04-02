import axios from 'axios'
import { useEffect } from 'react'
import  { View, Text }  from "react-native"
import { useIsFocused } from '@react-navigation/native'

export default EcranApiHttp = () => {
    const isFocused = useIsFocused()

    const url = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL
                + '?keyword=cruise'
                + '&location=-33.8670522%2C151.1957362'
                + '&radius=1500'
                + '&type=restaurant'
                + '&key='+ process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY

    useEffect(() => {
        axios({
            method: 'get',
            url: url,
          }).then((response) => {
            console.log(response.data.results[0].geometry.location.lat);
            console.log(response.data.results[0].geometry.location.lng);
          });
    }, [isFocused]) 

    return (
        <View style={{ flex: 1, 
                       alignItems: 'center', 
                       justifyContent: 'center' }}
        >
            <Text>Exemple d'appel http de  l'API Places !</Text>
        </View>
    );
}