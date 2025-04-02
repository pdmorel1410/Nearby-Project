import { useEffect } from 'react'
import  { View, Text }  from "react-native"
import { useIsFocused } from '@react-navigation/native'
import { Loader } from "@googlemaps/js-api-loader"

//AIzaSyDAqSwvLgKSjD7VSpjzsGat-eLRZgmUXZ0
const loader = new Loader({
    apiKey: "AIzaSyDAqSwvLgKSjD7VSpjzsGat-eLRZgmUXZ0",
    version: "weekly",
    libraries: ["places"]
  });

export default EcranPlaces = () => {
    
    const isFocused = useIsFocused()
    
    useEffect(() => {
        findPlaces()
    }, [isFocused]) 

    async function findPlaces() {
        try {
            const { Place } =  await loader.importLibrary('places')
        }
        catch(e) {
            console.log(e)
        }
       /*  loader.load().then((google) => {
            console.log(google)
         const { Place } = await google.maps.importLibrary("places")
        const { Map } = await google.maps.importLibrary("maps")
        const request = {
            textQuery: "Tacos in Mountain View",
            fields: ["displayName", "location", "businessStatus"],
            includedType: "restaurant",
            locationBias: { lat: 37.4161493, lng: -122.0812166 },
            isOpenNow: true,
            language: "en-US",
            maxResultCount: 8,
            minRating: 3.2,
            region: "us",
            useStrictTypeFiltering: false,
          };
         
          const { places } = await Place.searchByText(request);
          console.log(places) 
        }); */
    }

    return (
        <View style={{ flex: 1, 
                       alignItems: 'center', 
                       justifyContent: 'center' }}
        >
            <Text>Exemple d'appel http de  l'API Places (Nouvelle) !</Text>
        </View>
    );
}