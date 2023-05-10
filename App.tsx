import React, {useRef, useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const apiUrl = 'https://api.tvmaze.com/search/shows?q='
const Movie = () => {
const [value, setValue] = useState('');
const [movies, setMovies] = useState([]);
const scrollRef = useRef<ScrollView>(null)


const onGetData = async () => {
const response = await fetch(apiUrl +value,
 {
    method: 'GET'
});
const result = await response.json();
console.log(result);
setMovies(result);
};
console.log(value);
const onChangeText = (text: string) => {
    setValue(text);
};
const Clear = () => {  
  setMovies([]);  
  setValue("") 
};
const scrollToTop = () => {  
  scrollRef?.current?.scrollTo({ y: 0 });  
};  
const scrollToEnd = () => {  
  scrollRef?.current?.scrollToEnd({});  
};  
    return(
     <View style={styles.container}>
        <Text style={styles.title}>{value}</Text>
        <TextInput style={styles.input} 
        value={value}
        onChangeText={onChangeText}
        placeholder='Search for movies'
        placeholderTextColor='black'
        />
        <View style={styles.look}> 
        {value ? ( 
          <> 
            <TouchableOpacity style={styles.button} onPress={onGetData}> 
              <Text style={styles.title}>SEARCH</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={Clear} > 
              <Text style={styles.title}>CLEAR</Text> 
            </TouchableOpacity> 
            <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity style={styles.button} onPress={scrollToTop}>  
          <Text style={styles.title}>UP</Text>  
        </TouchableOpacity>  
         </View> 
        <View style={{alignItems:'flex-end'}}>
        <TouchableOpacity style={styles.button} onPress={scrollToEnd}>  
          <Text style={styles.title}>DOWN</Text>  
          </TouchableOpacity> 
        </View>
            
          </> 
        
        ) : null} 
       
       
      </View> 
      
      <ScrollView ref={scrollRef}> 
        {movies?.map((item, index) => ( 
          <View style={styles.look} key={index} > 
            <Image style={styles.image} 
              source={{ uri: item?.show?.image?.medium || '' }} 
            /> 
            <Text> {item?.show?.name}</Text> 
          </View> 
        ))} 
        </ScrollView>
        
     </View>
    );
};
export default Movie;
const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor:'#A87D66',
    paddingHorizontal:5
    },

    input: {
        width: '100%',
        height: 70,
        borderColor: 'brown',
        color:'white',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20
    },
    title: {
        fontSize: 20,
        textAlign:'center',
        color:'white',
        fontWeight:'600'
        

    },
    button: { 
      width: 85, 
      height: 35, 
      borderRadius: 15, 
      alignItems: 'center',
      justifyContent: "center",  
      backgroundColor: 'brown', 
      top:10,
    }, 
    image:{
        width:150,
        height:130,
        borderRadius:25,
        
      
    },
    look:{
      height: 150, 
      flexDirection: 'row', 
      gap:21
       

    }


});