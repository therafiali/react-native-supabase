import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    Animated,
    Dimensions,
    Easing,
    TextInput,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import Svg, { Circle } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.45;
const CIRCLE_LENGTH = CIRCLE_SIZE * Math.PI;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const STROKE_WIDTH = 10;
const TICK_LENGTH = 8;

type RootStackParamList = {
    PaymentDetails: {
        selectedMethods: string[];
    };
    NotificationScreen: undefined;
    MainTabs: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'PaymentDetails'>;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const paymentMethods = [
    {
        id: 'cashapp',
        name: 'Cash App',
        subtext: '$Cashtag',
        icon: 'https://freelogopng.com/images/all_img/1660059572cash-app-logo-png.png',
        placeholder: 'Enter $Cashtag',
        bgColor: '#00D54B'
    },
    {
        id: 'chime',
        name: 'Chime',
        subtext: '$ChimeSign',
        icon: 'https://img.icons8.com/?size=512&id=mNhj6ePnTBkQ&format=png',
        placeholder: 'Enter ChimeSign',
        bgColor: '#1dc576'
    },
    {
        id: 'venmo',
        name: 'Venmo',
        subtext: '@VenmoUsername',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Venmo_logo.png',
        placeholder: 'Enter Username',
        bgColor: '#008dff'
    },
];

const PaymentMethodDeposit = () => {
    const navigation = useNavigation<NavigationProp>();
    const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [troubleModalVisible, setTroubleModalVisible] = useState(false);
    const [troubleMessage, setTroubleMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const [extensionModalVisible, setExtensionModalVisible] = useState(false);
    const [hasExtended, setHasExtended] = useState(false);
    const isFocused = useIsFocused();

    // Update progress with timer
    useEffect(() => {
        const progress = timeLeft / 600;
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start();
    }, [timeLeft]);

    // Pulse animation
    useEffect(() => {
        const shouldPulse = timeLeft <= 120; // Pulse in last 2 minutes
        if (shouldPulse) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 800,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                        easing: Easing.in(Easing.ease),
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [timeLeft <= 120]);

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                // Only show extension modal when on this screen
                if (prevTime === 60 && !hasExtended && isFocused) {
                    setExtensionModalVisible(true);
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [hasExtended, isFocused]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const togglePaymentMethod = (id: string) => {
        setSelectedMethods([id]);
    };

    const handleCancelRequest = () => {
        setModalVisible(true);
    };

    const handleProceed = () => {
        console.log("Request cancelled");
        setModalVisible(false);
        navigation.navigate("MainTabs");
    };

    const getTimerColor = () => {
        if (timeLeft <= 120) return '#DC2626'; // Red for last 2 minutes
        if (timeLeft <= 300) return '#F97316'; // Orange for 5-2 minutes
        return '#FBBF24'; // Yellow for rest of the time
    };

    const handleImageSelection = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets[0] && response.assets[0].uri) {
                setSelectedImage(response.assets[0].uri);
                setPreviewModalVisible(true);
            }
        });
    };

    const handleDone = () => {
        setPreviewModalVisible(false);
        navigation.navigate('NotificationScreen');
    };

    const handleExtendSession = () => {
        setTimeLeft(prev => prev + 300); // Add 5 minutes (300 seconds)
        setExtensionModalVisible(false);
        setHasExtended(true); // Mark that the session has been extended
    };

    return (
        <ScreenWrapper profileBar={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Deposit</Text>
                    <TouchableOpacity
                        style={styles.closeButtonContainer}
                        onPress={handleCancelRequest}
                    >
                        <LinearGradient
                            colors={['#FF6B6B', '#FF4444', '#FF0000']}
                            style={styles.closeButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.timerContainer}>
                    <Animated.View style={[
                        styles.circleContainer,
                        {
                            transform: [{ scale: pulseAnim }]
                        }
                    ]}>
                        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={styles.svg}>
                            {/* Background circle */}
                            <Circle
                                cx={CIRCLE_RADIUS}
                                cy={CIRCLE_RADIUS}
                                r={CIRCLE_RADIUS - STROKE_WIDTH - 5}
                                stroke="#F0F0F0"
                                strokeWidth={STROKE_WIDTH}
                                fill="none"
                            />

                            {/* Progress circle */}
                            <AnimatedCircle
                                cx={CIRCLE_RADIUS}
                                cy={CIRCLE_RADIUS}
                                r={CIRCLE_RADIUS - STROKE_WIDTH - 5}
                                stroke={getTimerColor()}
                                strokeWidth={STROKE_WIDTH}
                                fill="none"
                                strokeDasharray={`${CIRCLE_LENGTH}`}
                                strokeDashoffset={progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [CIRCLE_LENGTH, 0],
                                })}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${CIRCLE_RADIUS} ${CIRCLE_RADIUS})`}
                            />
                        </Svg>
                        <View style={styles.timerTextContainer}>
                            <Text style={[
                                styles.timerText,
                                { color: getTimerColor() }
                            ]}>
                                {formatTime(timeLeft)}
                            </Text>
                            <Text style={[
                                styles.timerLabel,
                                { color: getTimerColor() }
                            ]}>
                                MIN
                            </Text>
                        </View>
                    </Animated.View>
                </View>
                <Text style={styles.selectMethodText}>
                    Select Payment Method
                </Text>
                <ScrollView style={styles.methodsContainer}>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.paymentMethod,
                                selectedMethods.includes(method.id) && styles.selectedMethod
                            ]}
                            onPress={() => togglePaymentMethod(method.id)}
                        >
                            <View style={styles.methodContent}>
                                <View style={[styles.iconContainer, { backgroundColor: method.bgColor }]}>
                                    <Image
                                        source={{ uri: method.icon }}
                                        style={styles.methodIcon}
                                    />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodName}>{method.name}</Text>
                                    <Text style={styles.methodSubtext}>{method.subtext}</Text>
                                </View>
                                {selectedMethods.includes(method.id) && (
                                    <View style={styles.checkmark}>
                                        <Text style={styles.checkmarkText}>✓</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <Text style={styles.warningNote}>
                        Note: If you submit a fake screenshot, you will be blocked permanently.
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            selectedMethods.length === 0 && styles.actionButtonDisabled
                        ]}
                        onPress={handleImageSelection}
                        disabled={selectedMethods.length === 0}
                    >
                        <Text style={styles.actionButtonText}>Submit Screenshot</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={() => setTroubleModalVisible(true)}
                    >
                        <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Having trouble?</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Cancel Request</Text>
                            <Text style={styles.modalMessage}>
                                If you cancel your request, we will cancel your request.
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.proceedButton}
                                    onPress={handleProceed}
                                >
                                    <Text style={styles.buttonText}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={troubleModalVisible}
                    onRequestClose={() => setTroubleModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Need Help?</Text>
                            <Text style={styles.modalMessage}>
                                Please describe the issue you're experiencing
                            </Text>
                            <TextInput
                                style={styles.troubleInput}
                                placeholder="Type your message here..."
                                value={troubleMessage}
                                onChangeText={setTroubleMessage}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        setTroubleModalVisible(false);
                                        setTroubleMessage('');
                                    }}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={() => {
                                        // Handle submission of trouble message
                                        console.log('Trouble message:', troubleMessage);
                                        setTroubleModalVisible(false);
                                        setTroubleMessage('');
                                        Alert.alert(
                                            'Message Sent',
                                            'Our support team will contact you shortly.'
                                        );
                                    }}
                                >
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={previewModalVisible}
                    onRequestClose={() => setPreviewModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.previewModalContent}>
                            <Text style={styles.modalTitle}>Preview Screenshot</Text>
                            {selectedImage && (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={styles.previewImage}
                                    resizeMode="contain"
                                />
                            )}
                            <View style={styles.previewButtons}>
                                <TouchableOpacity
                                    style={styles.retakeButton}
                                    onPress={() => {
                                        setPreviewModalVisible(false);
                                        handleImageSelection();
                                    }}
                                >
                                    <Text style={styles.buttonText}>Retake</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.doneButton}
                                    onPress={handleDone}
                                >
                                    <Text style={styles.buttonText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={extensionModalVisible}
                    onRequestClose={() => setExtensionModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalTitle, { color: '#DC2626' }]}>Session Ending Soon!</Text>
                            <Text style={styles.modalMessage}>
                                Your session will expire in 1 minute. Would you like to extend it for another 5 minutes?{'\n\n'}
                                <Text style={{ fontStyle: 'italic', color: '#DC2626' }}>Note: You can only extend once per session.</Text>
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.editButton, { backgroundColor: '#6B7280' }]}
                                    onPress={() => setExtensionModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>No, Thanks</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.proceedButton, { backgroundColor: '#00D54B' }]}
                                    onPress={handleExtendSession}
                                >
                                    <Text style={styles.buttonText}>Yes, Extend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: 0.5,
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        overflow: 'visible', // Allow the pulse animation to overflow
    },
    circleContainer: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 36,
        fontWeight: '700',
    },
    timerLabel: {
        fontSize: 12,
        letterSpacing: 2,
        fontWeight: '500',
        marginTop: 4,
    },
    methodsContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    paymentMethod: {
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
        height: height * 0.08, // Responsive height based on screen height
    },
    selectedMethod: {
        borderColor: '#00D54B',
        borderWidth: 1.5,
        backgroundColor: '#F0FDF4',
    },
    methodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    iconContainer: {
        width: width * 0.15, // Responsive width based on screen width
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    methodInfo: {
        flex: 1,
        paddingLeft: 16,
    },
    methodName: {
        fontSize: width * 0.04,
        fontWeight: '500',
        color: '#000000',
        marginBottom: 2,
    },
    methodSubtext: {
        fontSize: width * 0.03,
        color: '#6B7280',
        fontWeight: '400',
    },
    checkmark: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#00D54B',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 8,
        right: 15,
    },
    checkmarkText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    bottomContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    warningNote: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '500',
    },
    actionButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    actionButtonDisabled: {
        backgroundColor: '#E5E7EB',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#FEF9C3',
        borderWidth: 1,
        borderColor: '#FDE047',
    },
    secondaryButtonText: {
        color: '#854D0E',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1F2937',
    },
    modalMessage: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 24,
        color: '#6B7280',
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    editButton: {
        flex: 1,
        backgroundColor: '#FF4444',
        padding: 15,
        borderRadius: 14,
        marginRight: 10,
    },
    proceedButton: {
        flex: 1,
        backgroundColor: '#22C55E',
        padding: 15,
        borderRadius: 14,
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
    },
    svg: {
        transform: [{ rotate: '0deg' }],
    },
    troubleInput: {
        width: '100%',
        height: 120,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 16,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        fontSize: 15,
        color: '#1A1A1A',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 68, 68, 0.9)',
        padding: 15,
        borderRadius: 14,
        marginRight: 10,
    },
    submitButton: {
        flex: 1,
        backgroundColor: 'rgba(34, 197, 94, 0.9)',
        padding: 15,
        borderRadius: 14,
        marginLeft: 10,
    },
    previewModalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 25,
        alignItems: 'center',
        maxHeight: '85%',
    },
    previewImage: {
        width: '100%',
        height: 400,
        borderRadius: 16,
        marginVertical: 20,
    },
    previewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    retakeButton: {
        flex: 1,
        backgroundColor: '#FF4444',
        padding: 15,
        borderRadius: 14,
        marginRight: 10,
    },
    doneButton: {
        flex: 1,
        backgroundColor: '#22C55E',
        padding: 15,
        borderRadius: 14,
        marginLeft: 10,
    },
    selectMethodText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 5,
        marginTop: 0,
        textAlign: 'center'
    },
    closeButtonContainer: {
        width: 32,
        height: 32,
        shadowColor: '#FF0000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 8,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default PaymentMethodDeposit; 