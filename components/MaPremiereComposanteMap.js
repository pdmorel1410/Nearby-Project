import MapView, { Marker } from "react-native-maps"
import  { View, Text }  from "react-native"
import { useIsFocused } from '@react-navigation/native'
/* import Slider from "react-native-sliders"; */
import { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox'
import * as Location from 'expo-location'

export default maMap = () => {
    const [isCegepSelected, setCegepSelected] = useState(false)
    const [isAutreSelected, setAutreSelected] = useState(false)
    const [isTroisiemeSelected, setTroisiemeSelected] = useState(false)
    const [markers, setMarkersOnMap] = useState([])
    const [region, setRegion] = useState()
    const [showUserLocation, setshowUserLocation] = useState()
    const isFocused = useIsFocused()

    useEffect(() => {
        getPermission()
    }, [isFocused])

    const getPermission = async () => {
        let {status} =  await Location.requestForegroundPermissionsAsync()
        console.log('Permission accordé ? : ' + status)
        setshowUserLocation(status === 'granted' ? true && isFocused : false)
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
                showsUserLocation={showUserLocation}
                onUserLocationChange={(event) => {
                    console.log(event.nativeEvent)
                    setRegion({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                        latitudeDelta: 90,
                        longitudeDelta: 90
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
            <View 
                style = {{
                    width : 270,
                    marginLeft: 10,
                    marginTop:10,
                    flexDirection: 'row', 
                    justifyContent: 'space-between'}}
            >
                <Checkbox
                    value={isCegepSelected}
                    onValueChange = {(value)=>{
                            setCegepSelected(value)
                            if(!value){
                                removeIdFromMarkers(1)
                            } else {
                                addToMarkers(getCegepMarker())
                            }
                        }
                    }          
                />
                <Text style = {{
                      marginLeft: -30}}>Cégep</Text>

                <Checkbox
                    value={isAutreSelected}
                    onValueChange = {(value)=>{
                            setAutreSelected(value)
                            if(!value){
                                removeIdFromMarkers(2)
                            } else {
                                addToMarkers(getAutreMarker())
                            }
                        }
                    }          
                />
                <Text style = {{
                      marginLeft: -30}}>Autre</Text>

                <Checkbox
                    value={isTroisiemeSelected}
                    onValueChange = {(value)=>{
                            setTroisiemeSelected(value)
                            if(!value){
                                removeIdFromMarkers(3)
                            } else {
                                addToMarkers(getTroisiemeMarker())
                            }
                        }
                    }          
                />
                <Text style={{marginLeft: -30}}>Troisième</Text>
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

    function getCegepMarker() {
        return {
            id : 1,
            title: 'Le CEGEP de Gaspé',
            coordinates : {
                latitude: 48.83363,
                longitude: -64.48376,
            }
        }
    }
    
    function getAutreMarker() {
        return {
            id : 2,
            title: 'Un marker au hasard',
            coordinates : {
                latitude: 49.83363,
                longitude: -65.48376,
            }
        }
    }

    function getTroisiemeMarker() {
        return {
            id : 3,
            title: 'Un troisième marqueur',
            coordinates : {
                latitude: 50.83363,
                longitude: -66.48376,
            }
        }
    }
}









 {/* 
    const [markers, setMarkersOnMap] = useState([])
const [region, setRegion] = useState()
   const [zoom, setZoom] = useState(20)
    <MapView
                style={{
                    width: "100%",
                    height: "90%",
                }}
                initialRegion={{
                    latitude: 48.83363,
                    longitude: -64.48376,
                    latitudeDelta: zoom,
                    longitudeDelta: zoom
                }}
                region = {region}
            >
                {
                    markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))
                }
            </ MapView>
            <Slider
                value={20}
                minimumValue={0}
                maximumValue={20}
                step={0.1} 
                onValueChange={(value)=>{
                    setZoom(value[0])
                    setRegion(
                        {latitude: 48.83363,
                         longitude: -64.48376,
                         latitudeDelta: zoom,
                         longitudeDelta: zoom})
                }}
            /> */}

/* if(value) {
    setMarkersOnMap(
        [{
            title: 'LE CEGEP DE GASSSPÉ',
            coordinates : {
                latitude: 48.83363,
                longitude: -64.48376,
            }
        }]
    )
} else {
    setMarkersOnMap([])
} */