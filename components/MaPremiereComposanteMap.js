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

    //Il faut appeller un URL distincte selon le type coché
    const urlRestautrant = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL
                + '&type=restaurant'
                + `&location=${region?.latitude}`+'%2C'+`${region?.longitude}`
                + `&radius=${radius}`
                + '&key='+ process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY

    const urlCafe = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL
                + '&type=cafe'
                + `&location=${region?.latitude}`+'%2C'+`${region?.longitude}`
                + `&radius=${radius}`
                + '&key='+ process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY

    const urlCoiffeur= process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL
                + '&type=hair_dresser'
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
            <View style = {{
                    width : 400,
                    padding: 10,
                    flexDirection: 'row', 
                    justifyContent: 'space-between'}}>
                <Slider
                    style= {{width: '70%'}}
                        value={radius}
                        minimumValue={1}
                        maximumValue={1500}
                        step={1} 
                        onValueChange={(value)=>{
                            setRadius(value[0])
                        }}
                />
                <Text style={{ marginLeft: -40,
                               marginTop: 6,
                               padding: 5
                }} >Rayon :  {radius}m</Text>
            </View>
            <View 
                style = {{
                    width : 400,
                    padding: 10,
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
                <Text style={{ marginLeft: -50}} >Restaurant</Text>

                <Checkbox
                    value={isCafeSelected}
                    onValueChange = {(value) => {
                            setCafeSelected(value)
                        }
                    }          
                />
                <Text style={{ marginLeft: -50}}>Café</Text>

                <Checkbox
                    value={isCoiffeurSelected}
                    onValueChange = {(value) => {
                            setCoiffeurSelected(value) 
                        }
                    }          
                />
                <Text style={{ marginLeft: -50}}>Coiffeur</Text>
            </View>
            <View style={{padding: 10}}>
                <Button 
                        title="Test URL API"
                        onPress={() => {
                                isRestaurantSelected ? console.log(urlRestautrant): ''
                                isCafeSelected ? console.log(urlCafe) : ''
                                isCoiffeurSelected ? console.log(urlCoiffeur) : ''
                            }
                        }
                            // TODO :

                            //récupérer le/les urls
                            // Ensuite, à partir de l'instance d'axios, configurer la/les requêtes HTTP
                            //Attendre la/les Promise et bâtir tous les Markers à partir de chacun des 
                            //résultats de la/les recherche(s) Nearby.
                            
                            // Coder la dynamique qui détermine si le bouton est actif ou non
                            /* disabled={TODO} */

                            // Alternative : Ne pas faire de bouton et appeller l'API lorsqu'un type est coché
                            // par l'utilisateur
                    
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