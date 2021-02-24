import React,{ useState } from 'react';
import GoogleMap from './components/GoogleMap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
function Map(){
    const [address,setAddress]=useState('');
    const [cordinates,setCordinates]=useState({lat:null,lng:null});
  
    const handleSelect=async (value)=>{
      const results=await geocodeByAddress(value);
      const latlong=await getLatLng(results);
      setCordinates(latlong);
      setAddress(value);
    }
  
    return (
     <div>
     <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
     {
       ({ getInputProps, suggestions, getSuggestionItemProps, loading})=>(
       <div>
       <p>Latitude: {cordinates.lat}</p>
       <p>Longitude: {cordinates.lng}</p>
       <input {...getInputProps({placeholder:"Enter the address"})}></input>
       <div>
  
  
       {loading ? <div>loading your location...</div> :null }
       
  
       {suggestions.map((suggestion)=>{
        //  <div>{suggestion.description}</div>
        const style={
          backgrounColor: suggestion.active ? "red" :"white" 
         }
       
         return (
           <div {...getSuggestionItemProps(suggestion,{style})}>
           {suggestion.description}
           </div>
         )
       })}
       </div>
       </div>
     )
    }
     </PlacesAutocomplete>
  
     <GoogleMap />
     </div>
    );

}
export default Map;
