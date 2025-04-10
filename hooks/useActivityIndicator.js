import  {ActivityIndicator }  from "react-native"
import { useState } from 'react'

const MyActivityComponent = (props) => {
    const [isLoading, setLoading] = useState(false)

    //props.setLoading = setLoading
    
    return (
        isLoading ? <ActivityIndicator size="large" /> 
                  : props.children
            
    );
}

export default MyActivityComponent