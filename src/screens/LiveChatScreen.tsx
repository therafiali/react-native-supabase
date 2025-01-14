import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActionSheetIOS,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWrapper from '../components/ScreenWrapper';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  image?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'How may I assist you?',
    isUser: false,
    timestamp: 'Today',
  },
];

const LiveChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isUser: true,
        timestamp: 'Today',
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Our agent will respond shortly.',
          isUser: false,
          timestamp: 'Today',
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleAttachment = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handleTakePhoto();
          } else if (buttonIndex === 2) {
            handleChoosePhoto();
          }
        }
      );
    } else {
      Alert.alert(
        'Add Attachment',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: handleTakePhoto },
          { text: 'Choose from Library', onPress: handleChoosePhoto },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleTakePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0].uri) {
        const message: Message = {
          id: Date.now().toString(),
          text: '',
          isUser: true,
          timestamp: 'Today',
          image: response.assets[0].uri,
        };
        setMessages(prev => [...prev, message]);
      }
    });
  };

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0].uri) {
        const message: Message = {
          id: Date.now().toString(),
          text: '',
          isUser: true,
          timestamp: 'Today',
          image: response.assets[0].uri,
        };
        setMessages(prev => [...prev, message]);
      }
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Support Chat</Text>
            <Icon name="check-circle" size={16} color="#22C55E" />
          </View>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>JD</Text>
          </View>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.isUser ? styles.userMessageRow : null,
                ]}>
                <View
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessageBubble : styles.agentMessageBubble,
                  ]}>
                  {message.image ? (
                    <Image 
                      source={{ uri: message.image }} 
                      style={styles.messageImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={[
                      styles.messageText,
                      message.isUser ? styles.userMessageText : null,
                    ]}>{message.text}</Text>
                  )}
                </View>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Chat with Support"
                value={newMessage}
                onChangeText={setNewMessage}
                returnKeyType="send"
              />
              {newMessage.trim() ? (
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSend}
                >
                  <Icon name="send" size={20} color="#22C55E" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAttachment}
                >
                  <Icon name="plus" size={24} color="#22C55E" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitials: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageRow: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  userMessageBubble: {
    backgroundColor: '#22C55E',
  },
  agentMessageBubble: {
    backgroundColor: '#F8F8F8',
  },
  messageText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    bottom: 60,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sendButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
});

export default LiveChatScreen; 