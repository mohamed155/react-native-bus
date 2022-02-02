import React, {useEffect, useState} from "react";
import {StyleSheet, ScrollView, View, Text} from "react-native";
import {Box, Button, FormControl, Input, VStack} from "native-base";
import {connect} from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import AnimatedLottieView from "lottie-react-native";
import {getRandomUser} from "../../store/actions/authActions";
import PreLoader from "../../components/PreLoader";

function LoginScreen(props) {

    //#region define states

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    //#endregion

    //#region lifecycles

    useEffect(() => {
        props.fetchRandomUser();
    }, []);

    useEffect(() => {
        if (props.email) setEmail(props.email);
        if (props.password) setPassword(props.password);
    }, [props.email, props.password]);

    //#endregion

    //#region main actions

    const validateEmail = () => {
        setInvalidEmail(!(email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) || !email);
    };

    const validatePassword = () => {
        setInvalidPassword(
            password.length  < 8 ||
            !(/[a-z]/.test(password)) ||
            !(/[A-Z]/.test(password)) ||
            !(/\d/.test(password)));
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (invalidEmail) validateEmail();
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (invalidPassword) validatePassword();
    }

    const submitLogin = () => {
        validateEmail();
        validatePassword();

        if (!invalidEmail && !invalidPassword) {
            // call login api
        }
    };

    //#endregion

    return (
        <ScrollView contentContainerStyle={styles.screenContent}>
            {props.pending && <PreLoader />}
            <AnimatedLottieView source={require('../../assets/animations/bus.json')}
                                autoPlay loop style={styles.animatedView}/>

            <Box alignItems="center">
                <VStack space={4} alignItems="center" width="80%">
                    <FormControl isRequired isInvalid={invalidEmail}>
                        <Input value={email} onChangeText={handleEmailChange} placeholder="Email"
                               leftElement={<FontAwesomeIcon name="envelope" size={20} style={styles.inputIcon} />}/>
                        <FormControl.ErrorMessage leftIcon={<FontAwesomeIcon name="exclamation-circle" size={15}
                                                  style={styles.validationIcon}/>}>
                            {email ? 'Email is not valid' : 'Email is required'}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl borderRadius={10} isRequired isInvalid={invalidPassword}>
                        <Input value={password} onChangeText={handlePasswordChange} placeholder="password" secureTextEntry
                               leftElement={<FontAwesomeIcon name="lock" size={20} style={styles.inputIcon} />}/>
                        <FormControl.ErrorMessage leftIcon={<FontAwesomeIcon name="exclamation-circle" size={15}
                                                  style={styles.validationIcon} />}>

                            { password
                                ? 'Password must be at least 8 letters and contains capital and small letters and numbers'
                                : 'Password is required'
                            }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button width="100%" marginTop={30} size="lg" borderRadius={10} onPress={submitLogin}>Login</Button>
                </VStack>
            </Box>

            <View style={styles.signupLine}>
                <Text style={styles.labelText}>Don't have an account?</Text>
                <Button variant="link" padding={1}>Sign up</Button>
                <Text style={styles.labelText}>now</Text>
            </View>

            <Button variant="link">Forgot your password?</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContent: {
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff'
    },
    animatedView: {
        width: '80%',
        alignSelf: 'center'
    },
    inputIcon: {
        marginLeft: 10
    },
    signupLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    labelText: {
        color: '#000'
    },
    validationIcon: {
        color: '#dc2a2a'
    }
});

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    pending: state.auth.pending
});

const mapDispatchToProps = dispatch => ({
    fetchRandomUser: () => getRandomUser(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);