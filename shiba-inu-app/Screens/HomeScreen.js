import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ImageBackground, ScrollView, TouchableOpacity, useAnimatedValue } from 'react-native';
import {View, StyleSheet, Button, Image, Text} from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { ZoomOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => {
    const Tab = createBottomTabNavigator();

    const [dogs, setDogs] = useState([]);

    // membuat komponen bisa diakses make animated
    const AnimatedImage = Animated.createAnimatedComponent(Image);

    //setter khusus buat gesture
    const ukuran = useSharedValue(0);
   
    //mirip styling biasa tp ini khusu buat animasi
    const rStyle = useAnimatedStyle(()=> ({
        //make math.max agar tampilan animasi solid
        transform: [{ 
            scale: Math.max(ukuran.value, 0) 
        }],
    }));

    //fetch shiba
    const fetchApiDog = async()=>{
        try {
            let response = await fetch('http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=false');
            if (response.ok){
                let data =  await response.json();
                setDogs(data);  
                // console.log(navigation);               
            }else{
                throw new Error("Something Wrong With Server")
            }       
         
        } catch (error) {
            console.log(error);
        
        }
    }

    //post ke server
    const fetchFavDogApi =(ling)=>{    
    fetch('http://192.168.18.33:8080/dog/create', {
        method: 'POST',
        body: JSON.stringify({image: ling}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
    })
    .then(response =>{
        if(response.ok){  
        // console.log(response);
         response.json();
          
        }else{
            throw new Error("Something wrong with input or Server")
        }
    })
    .then(json =>{
        // console.log(json);
    })
    .catch(err =>{
        console.log(err);
    })
}

    useEffect(() => {
      fetchApiDog();
    }, []);



    //taptap
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <Animated.View style={{ flexWrap:'wrap', flexDirection:'row', justifyContent:'center' }} >


                {dogs.map((currdog,i)=>(
                    // Tap Gesture Handler (tap-tap)
                    <TapGestureHandler
                    key={i}
                    numberOfTaps={2}
                    onActivated={()=>{
                        // console.log(dogs[i]);
                        //menampilkan animasi love & with spring buat animasi transisi biar lebih gacor
                        ukuran.value = withSpring(1, { stiffness:300 },(isFinished =>{ //callback pada fungsi withSpring
                            if(isFinished){
                                ukuran.value = withSpring(0)
                            }
                        }));
                        // console.log(link);
                        fetchFavDogApi(dogs[i]);
                    }}>
                        <Animated.View>          
                            <Image     
                                source={{ uri: currdog }} 
                                style={{ backgroundColor: 'black', width: 150, height:150, justifyContent:'space-around', margin:20, borderRadius:5 }} >
                            </Image>            
                        </Animated.View>
                    </TapGestureHandler>
  
                ))}
             
                </Animated.View>
                    <Button onPress={fetchApiDog} title='Generate' ></Button>   
            </ScrollView>
            <AnimatedImage
                 source={{uri: 'https://cdn.pixabay.com/photo/2016/02/04/11/57/heart-1179054__480.png'}}
                 style={[
                    {
                        width: 320, 
                        height:290, 
                        alignSelf:'center', 
                        position:'absolute', 
                        left:'10%', right:0, 
                        bottom:'30%'
                    },
                  rStyle,
                ]}/>  
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    box:{
        width:150,
        height:150,
        backgroundColor:'red'
    }
})

export default HomeScreen;
