import React, {Component, useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  LogBox,
} from 'react-native';

import _ from 'lodash';
import loadingReducer from '../redux/reducers/LoadingReducer';
import {userCache} from '../helpers/cacheHelper';
import {normalize} from '../helpers/FontHelper';
import {firebase} from '../../config/config';
import firestore from '@react-native-firebase/firestore';
import colors from '../assets/colors';
import Swiper from 'react-native-swiper';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';


export default function InquiryScreen({navigation}) {

    const [enableScroll, setEnableScroll] = useState(true)
    const [autoPlay, setAutoPlay] = useState(false)

    const [field, setField] = useState(
        {
            question: 'What is the field of your disease (physical/mental/hierditary)?',
            answer: ''
        }
    );
    const [signs, setSigns] = useState(
        {
            question: 'What is the signs of your disease?',
            answer: ''
        }
    );
    const [timeline, setTimeline] = useState(
        {
            question: 'Describe the timeline of your disease?',
            answer: ''
        }
    );
    const [history, setHistory] = useState(
        {
            question: 'Describe any history related to the disease?',
            answer: ''
        }
    );

    const fieldHandler = (text) => {
        setField(
            {
                question: field.question,
                answer: text
            }
        )
    }

    const signsHandler = (text) => {
        setSigns(
            {
                question: signs.question,
                answer: text
            }
        )
    }

    const timelineHandler = (text) => {
        setTimeline(
            {
                question: timeline.question,
                answer: text
            }
        )
    }

    const historyHandler = (text) => {
        setHistory(
            {
                question: history.question,
                answer: text
            }
        )
    }

    const isFieldValid = () => {
        return field.length > 6
    }

    const isSignsValid = () => {
        return signs.length > 6
    }

    const isTimelineValid = () => {
        return timeline.length > 6
    }

    const isHistoryValid = () => {
        return history.length > 6
    }

    return (
        <Swiper
            loop={false}
            autoplay={autoPlay}
            showsPagination={false}
            scrollEnabled={enableScroll}
            onIndexChanged={(index) => {
                if(index == 1) {
                    setTimeout(() => {
                        setEnableScroll(false)
                    }, 10);
                    setTimeout(() => {
                        navigation.navigate('Dash Board');
                    }, 2000);
                }
            }}
        >
            <View style={styles.slideContainer}>
                <ScrollView style={styles.scrollView}>
                    <Query 
                        question={field.question}
                        setText={fieldHandler}
                    />
                    <Query 
                        question={signs.question} 
                        setText={signsHandler}
                    />
                    <Query 
                        question={timeline.question} 
                        setText={timelineHandler}
                    />
                    <Query 
                        question={history.question}
                        setText={historyHandler}
                    />
                </ScrollView>
                <TouchableOpacity style={styles.agreeView}
                >
                    <View style={styles.agreeSign}>
                        <Text style={styles.agreeText}>SWIPE {'=>'} AGREE</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.slideContainer}>
                <View style={styles.loadingView}>
                    <Image 
                        source={require('../assets/13disability-jumbo-2.gif')}
                        style={{marginHorizontal: normalize(10), width: width, height: width*9/10}}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.loadingText}>Uploading...</Text>
                </View>
            </View>
        </Swiper>
    )
}

const Query = (props) => {
    return (
        <View style={queryStyles.slideContainer}>
            <Text style={queryStyles.questionText}>{props.question}</Text>
            <TextInput 
                style={queryStyles.textInput}
                multiline={true}
                numberOfLines={4}
                placeholder='Please type here..'
                onChangeText={(text) => props.setText(text, props.question)}
            />
        </View>
    )
}

const {width, height} = Dimensions.get('screen');

const queryStyles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginBottom: normalize(20),
        // borderColor: '#bbb',
        // borderWidth: 1,
        // borderStyle: 'dashed',
        // borderRadius: 10,
    },
    questionText: {
        fontSize: normalize(25),
        marginBottom: normalize(10),
        padding: normalize(5),
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: normalize(25),
        borderBottomColor: 'gray',
        borderColor: '#bbb',
        borderWidth: 1,
        padding: normalize(20),
        borderRadius: 10
    }
})

const styles = StyleSheet.create({
    slideContainer: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 0.8,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: normalize(20),
        marginHorizontal: normalize(10)
    },
    agreeView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    agreeSign: {
        backgroundColor: 'white',
        padding: normalize(20),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    agreeText: {
        fontSize: normalize(40),
        color: colors.primaryColor,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: normalize(30)
    },
    title: {
      fontSize: normalize(45),
      fontWeight: 'bold',
      color: colors.primaryColor,
    },
    text: {
        fontSize: normalize(30),
        marginBottom: normalize(5),
    },
    button: {
      borderWidth: 0.5,
      borderRadius: 70,
      alignSelf: 'center',
      width: width * 0.3,
      height: height * 0.07,
    },
  });