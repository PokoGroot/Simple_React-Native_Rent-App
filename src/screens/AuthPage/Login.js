/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Button, Toast } from 'native-base'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { login } from '../../redux/actions/user'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            LoginForm: {},
        }
    }

    handleChange = (name, value) => {
        let newFormData = {...this.state.LoginForm}
        newFormData[name] = value
        this.setState({
            LoginForm: newFormData
        })
    }

    handleSubmit = () => {
        const data = this.state.LoginForm
        this.props.dispatch(login(data))
            .then(async res => {
                if(res.value.data.status === 401){
                    Toast.show({
                        text: 'Email or Password is wrong!',
                        buttonText: 'Ok'
                    })
                }else{
                    // const token = res.action.payload.data.token
                    // const tokenI = async token => {
                    //     try {
                    //         await AsyncStorage.setItem('token', token)
                    //     } catch (error) {
                    //         console.log(error.message);
                    //     }
                    // }
                    // this.getBook()
                    this.loggingIn()
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // getBook = () => {
    //     const search = this.props.search !== null ? '&search='+this.props.search : ''
    //     const addressSort = this.props.match ? this.props.address+this.props.match.params.id : `${process.env.REACT_APP_HOST}/book/?sortby=book_id`+search
        
    //     this.props.dispatch (getBook(addressSort), this.props.search)
    //     this.setState({
    //         books: this.props.books.booksList.data
    //     })
    // }

    loggingIn = () => {
        this.props.navigation.navigate('Tabs')
    }

    render() {
        return(
            <View behavior="padding" style={styles.Wrapper}>
                <View style={styles.bodyWrapper}>
                    <View >
                        <Text style={styles.SignInTitle}>Here To Get {'\n'}Welcomed!</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='email'
                            underlineColorAndroid='grey'
                            placeholderTextColor='grey'
                            keyboardType='email-address'
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'email', text )}
                        />
                        <TextInput
                            placeholder='password'
                            underlineColorAndroid='grey'
                            placeholderTextColor='grey'
                            secureTextEntry={true}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'password', text )}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button style={styles.SignInButton} dark title='Login' onPress={() => this.handleSubmit()} >
                            <Text style={{color:'white'}}>Login</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.footerWrapper}>
                    <View >
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')} >
                            <Text style={styles.text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Tabs')} >
                            <Text style={styles.text}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    Wrapper : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#1F3A93'
    },
    bodyWrapper: {
        flex: 6,
        justifyContent: 'center',
    },
    footerWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    SignInTitle: {
        fontSize: 40,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#4B4C72',
        paddingBottom: 50
    },
    inputField: {
        width: 280,
        color: 'gray',
        borderColor: 'gray',
        marginTop: 5
    },
    SignInButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#4B4C72",
    },
    text :{
        color: '#4B4C72',
        fontSize: 15,
        textDecorationLine: 'underline'
    },
})

const mapStateToProps = state => {
    return{
        user: state.users
    }
}

export default connect (mapStateToProps) (LoginScreen)