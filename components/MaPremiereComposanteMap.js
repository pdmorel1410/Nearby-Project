import MapView, { Marker } from "react-native-maps"
import  { View, Text, Button }  from "react-native"
import { useIsFocused } from '@react-navigation/native'
import Slider from 'react-native-sliders'
import { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox'
import * as Location from 'expo-location'

export default maMap = () => {
    const [isRestaurantSelected, setRestaurantSelected] = useState(false)
    const [isCafeSelected, setCafeSelected] = useState(false)
    const [isCoiffeurSelected, setCoiffeurSelected] = useState(false)
    const [markers, setMarkersOnMap] = useState([])
    const [region, setRegion] = useState()
    const [showsUserLocation, setShowsUserLocation] = useState(false)
    const [radius, setRadius] = useState(750)

    const isFocused = useIsFocused()

    const url = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL
                + `&type=${isRestaurantSelected ? 'restaurant,' : '' }` 
                      + `${isCafeSelected ? 'cafe,' : '' }` 
                      + `${isCoiffeurSelected ? 'hair_dresser,' : '' }`
                + `&location=${region?.latitude}`+'%2C'+`${region?.longitude}`
                + `&radius=${radius}`
                + '&key='+ process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
                
    useEffect(() => {
        getPermission()
    }, [isFocused])

    const getPermission = async () => {
        let {status} =  await Location.requestForegroundPermissionsAsync()
        console.log('Permission accordé ? : ' + status)
        setShowsUserLocation(status === 'granted' ? isFocused : false)
    }

    return (
        <View>
            <MapView
                style={{
                    width: "100%",
                    height: "80%"}}
                initialRegion={{
                    latitude: 48.83363,
                    longitude: -64.48376,
                    latitudeDelta: 50,
                    longitudeDelta: 50}}
                showsUserLocation={showsUserLocation}
                onUserLocationChange={(event) => {
                    console.log(event.nativeEvent)
                    setRegion({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                        latitudeDelta: 50,
                        longitudeDelta: 50
                    })
                }}
                region = {region}
                zoomEnabled={true}
                loadingEnabled={true}
            >
                {
                  markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinates}
                        title={marker.title}
                    />))
                }
            </ MapView>
            <Slider
                value={radius}
                minimumValue={1}
                maximumValue={1500}
                step={1} 
                onValueChange={(value)=>{
                    setRadius(value[0])
                }}
            />
            <View 
                style = {{
                    width : 270,
                    marginLeft: 10,
                    marginTop:10,
                    flexDirection: 'row', 
                    justifyContent: 'space-between'}}
            >
                <Checkbox
                    value={isRestaurantSelected}
                    onValueChange = {(value) => {
                            setRestaurantSelected(value)
                        }
                    }          
                />
                <Text >Restaurant</Text>

                <Checkbox
                    value={isCafeSelected}
                    onValueChange = {(value) => {
                            setCafeSelected(value)
                        }
                    }          
                />
                <Text >Café</Text>

                <Checkbox
                    value={isCoiffeurSelected}
                    onValueChange = {(value) => {
                            setCoiffeurSelected(value) 
                        }
                    }          
                />
                <Text >Coiffeur</Text>

                <Button
                    title="Test URL API"
                    onPress={() => console.log(url)}
                    disabled={TODO}
                />
            </View>
        </View>
    ); 

    function removeIdFromMarkers(id) {        
        // clone de markers car il est read/only
        var newMarkers = [...markers]
    
        // trouve l'index de l'objet représentant le marqueur que l'on veut enlever
        const markerIndexToRemove = newMarkers.findIndex((marker) => marker.id === id)
    
        // enlève l'objet du array
        newMarkers.splice(markerIndexToRemove, 1)
    
        // met le nouveau array dans le state, ce qui déclenchera un refresh de la MapView
        // et les markers présents dans le state s'afficheront
        setMarkersOnMap(newMarkers)
    }
    
    function addToMarkers(marker) {
        // clone markers car il est read/only
        var newMarkers = [...markers]

        // rajoute le marker au nouveau array
        newMarkers.push(marker)

       // met le nouveau array dans le state, ce qui déclenchera un refresh de la MapView
        // et les markers présents dans le state s'afficheront
        setMarkersOnMap(newMarkers) 
    }
}