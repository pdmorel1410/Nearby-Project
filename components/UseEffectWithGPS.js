import  { View, Text }  from "react-native"
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export default UseEffectWithGPS = () => {
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    useEffect(() => {        
        getCurrentLocation()
    }, [])

    const getCurrentLocation = async () => {
        //Requête pour déterminer si l'application possède les droits d'accéder à la localisation de l'appareil
        let {status} = await Location.requestForegroundPermissionsAsync()
        console.log('Permission accordé ? : ' + status)
        const {coords} = await Location.getCurrentPositionAsync()
        console.log(coords)
        const {latitude, longitude} =  coords
        setLatitude(latitude)
        setLongitude(longitude)
        //console.log('Coordonnées actuelles :' + latitude + ', ' + longitude)
    }

    return (
        <View style={{ flex: 1, 
                       alignItems: 'center', 
                       justifyContent: 'center' }}
        >
            <Text>{latitude}</Text>
            <Text>{longitude}</Text>
        </View>
    );
}