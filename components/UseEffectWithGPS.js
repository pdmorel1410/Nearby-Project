import  { View, Text, TextInput, ActivityIndicator }  from "react-native"
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export default UseEffectWithGPS = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [input, setInput] = useState('Changer!')
    const [isPageLoading, setPageLoading] = useState(true)

    useEffect(() => { 
        setPageLoading(true)
        getCurrentLocation().then((coords) => {
            const {latitude, longitude} =  coords
            setLatitude(latitude)
            setLongitude(longitude)
            setPageLoading(false)
        })
    }, [input])

    const getCurrentLocation = async () => {
        //Requête pour déterminer si l'application possède les droits d'accéder à la localisation de l'appareil
        let {status} = await Location.requestForegroundPermissionsAsync()
        console.log('Permission accordé ? : ' + status)
        const {coords} = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000})
        console.log(coords)
        return  coords
    }

    return (
        <View style={{ flex: 1, 
                       alignItems: 'center', 
                       justifyContent: 'center' }}
        >
            { isPageLoading ?
                <ActivityIndicator 
                    size="large" 
                /> :
                <>
                    <TextInput 
                        value={input}
                        onChangeText={setInput}
                    />
                    <Text>{latitude} {longitude}</Text>
                </>
            }
        </View>
    );
}