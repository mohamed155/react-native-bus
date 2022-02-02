import React, {useEffect} from 'react';
import {StatusBar} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/login";
import {extendTheme} from "native-base";
import {configureStore} from "./src/store";
import colors from './src/config/colors';
import './src/interceptors';
import {Provider} from "react-redux";

const store = configureStore();

const Stack = createNativeStackNavigator();

function RegistrationStack() {
    const screenOptions = {
        headerShown: false
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} options={screenOptions}/>
        </Stack.Navigator>
    )
}

function app() {

    useEffect(() => {
        SplashScreen.hide();
    })

    return (
        <Provider store={store}>
            <NativeBaseProvider theme={extendTheme({colors})}>
                <StatusBar backgroundColor={colors.primary["500"]} barStyle="light-content" />
                <NavigationContainer>
                    <RegistrationStack/>
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}

export default app;