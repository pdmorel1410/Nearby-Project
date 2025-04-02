import  { View, Text, TextInput, ActivityIndicator }  from "react-native"
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import MyActivityComponent from '../hooks/useActivityIndicator'

export default UseEffectWithGPS = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [input, setInput] = useState('Texte editable')
    const [latitude2, setLatitude2] = useState('')
    const [longitude2, setLongitude2] = useState('')
    const [input2, setInput2] = useState('Texte editable 2')/* 
    const [isPositionLoading, setPositionLoading] = useState(true)
    const [isPosition2Loading, setPosition2Loading] = useState(true) */

    const myActivityComponent = <MyActivityComponent >
                                   {getPositionDisplayComponent()}
                               </MyActivityComponent>

    useEffect(() => {
        /* setPositionLoading(true) */
        //myActivityComponent.props.setLoading = true
        getCurrentLocation().then((coords) => {
            const {latitude, longitude} =  coords
            setLatitude(latitude)
            setLongitude(longitude)
            //myActivityComponent.props.setLoading = false
            /* setPositionLoading(false) */
        })
    }, [input])

    /* useEffect(() => {
        setPosition2Loading(true)
        getCurrentLocation().then((coords) => {
            const {latitude, longitude} =  coords
            setLatitude2(latitude)
            setLongitude2(longitude)
            setPosition2Loading(false)
        })
    }, [input2]) */

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
            {myActivityComponent}

           {/*  { isPositionLoading ?
                <ActivityIndicator size="large" /> 
              :
                <>
                    <TextInput 
                        value={input}
                        onChangeText={setInput}
                        style={{
                            backgroundColor: "white",
                            borderColor: "gray",
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 36,
                            padding: 8,
                            width: 120
                          }}
                    />
                    <Text style={{
                            padding: 20
                          }}>{latitude}, {longitude}</Text>
                </>
            }

            { isPosition2Loading ?
                <ActivityIndicator size="large" /> 
              :
                <>
                    <TextInput 
                        value={input2}
                        onChangeText={setInput2}
                        style={{
                            backgroundColor: "white",
                            borderColor: "gray",
                            borderWidth: 1,
                            borderRadius: 10,
                            height: 36,
                            padding: 8,
                            width: 120
                          }}
                    />
                    <Text style={{
                            padding: 20
                          }}>{latitude2}, {longitude2}</Text>
                </>
            } */}
        </View>
    );

    function getPositionDisplayComponent() {
        return (
            <View>
                <TextInput 
                    value={input}
                    onChangeText={setInput}
                    style={{
                        backgroundColor: "white",
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        height: 36,
                        padding: 8,
                        width: 120
                    }}
                />
                <Text style={{
                        padding: 20
                    }}>{latitude}, {longitude}</Text>
            </ View>
        );
    }
}

