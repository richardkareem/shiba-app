import React, { useState, useEffect, useCallback } from 'react';
import {View, StyleSheet, Image, Alert, TouchableOpacity, Text} from 'react-native';
import { Directions, ScrollView, Swipeable } from 'react-native-gesture-handler';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import Animated, { RollOutLeft, RollOutRight, RotateOutDownRight, ZoomOutEasyUp } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteScreen = () => {
 
    
const [dogs, setDogs] = useState([])

//fetch Data Server
    const fetchApiServer = async()=>{
       try {
           
           let response = await fetch('http://192.168.18.33:8080/dog/get');
           if (response.ok){
               let data =  await response.json();
            //    console.log(data);
               setDogs(data); 
     
           }else{
               throw new Error("Something Wrong With Server")
           }       
        
       } catch (error) {
           console.log(error);
       
       }
   }

   console.log(dogs);
   useEffect(() => {
    fetchApiServer();
   }, []);

   useFocusEffect(
    useCallback(()=>{
        fetchApiServer();
},[])
)
  

//delete yg di server
const deleteApi = (id)=>{
    fetch(`http://192.168.18.33:8080/dog/delete/${id}`, {
    method: 'DELETE',
});


}

//delete yg di ui nya
const deleteFav = (id)=>{
 setDogs(currState =>{
    return currState.filter(dogs =>{
        if (dogs.id !== id){
            return dogs;
        }
    })
 })
}




const LeftSwipeAction = () => {
    return (
      <View style={styles.containerLeftSwipe}>
        <AntDesign name="delete" size={24} color="black" />
      </View>
    )
  }
    return (
        <ScrollView>
            <Animated.View style={styles.container} 
            exiting={RollOutLeft}>
                {dogs.map((currDog,i)=>(
                <Swipeable
                key={i}
                renderRightActions ={LeftSwipeAction}
                onSwipeableOpen={(directions)=>{
                    if(directions === 'right'){
                        Alert.alert(`Favorite has Been Deleted`);
                        deleteApi(currDog.id)
                        deleteFav(currDog.id);
                    }
                }}>
                    <Animated.View
                     exiting={RotateOutDownRight}
                    >
                        <Image style={styles.image}
                        source={{uri: currDog.image}}
                        />
                    </Animated.View>
                     </Swipeable> 
                    ))}
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
     container:{flexDirection:'row', flexWrap:'wrap', justifyContent:'center' },
     image:{width:150, height: 150, backgroundColor:'black',  alignItems:'center', margin:20, borderRadius: 20},

})

export default FavoriteScreen;
