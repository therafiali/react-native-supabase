import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import ProfileScreen from '../screens/ProfileScreen';
import ReferralCodeScreen from '../screens/ReferralCodeScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

import SelectPlatformScreen from '../screens/SelectPlatformScreen';
import EnterUsernameScreen from '../screens/EnterUsernameScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PaymentDetailsScreen from '../screens/PaymentDetailsScreen';
import ReviewRequestScreen from '../screens/ReviewRequestScreen';
import EnterAmountScreen from '../screens/EnterAmountScreen';
import LoginScreen from '../screens/LoginScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import RemainingLimitScreen from '../screens/RemainingLimitScreen';
import CheckStatusScreen from '../screens/CheckStatusScreen';
import VIPCodeScreen from '../screens/VIPCodeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WebViewScreen from '../screens/WebViewScreen';
import EnterPromocodeScreen from '../screens/EnterPromocodeScreen';
import PlatformScreenRecharge from '../screens/PlatformScreenRecharge';
import UsernameRecharge from '../screens/UsernameRecharge';
import ReviewRechargeScreen from '../screens/ReviewRechargeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ReferralCode" component={ReferralCodeScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="SelectPlatform" component={SelectPlatformScreen} />
      <Stack.Screen name="EnterUsername" component={EnterUsernameScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
      <Stack.Screen name="ReviewRequest" component={ReviewRequestScreen} />
      <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="OtpScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="RemainingLimit" component={RemainingLimitScreen} />
      <Stack.Screen name="CheckStatus" component={CheckStatusScreen} />
      <Stack.Screen name="VIPCode" component={VIPCodeScreen} />
      <Stack.Screen name="Promocode" component={EnterPromocodeScreen} />
      <Stack.Screen name="PlatformScreenRecharge" component={PlatformScreenRecharge} />
      <Stack.Screen name="UsernameRecharge" component={UsernameRecharge} />
      <Stack.Screen name="ReviewRechargeScreen" component={ReviewRechargeScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: 'Forgot Password',
          headerShown: true,
        }}
      />


    </Stack.Navigator>
  );
};

export default AppNavigator; 