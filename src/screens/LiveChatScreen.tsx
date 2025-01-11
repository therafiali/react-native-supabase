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
  Image,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const INITIAL_MESSAGES = [
  {
    id: '1',
    text: 'How may I assist you?',
    isUser: false,
    timestamp: 'Today',
  },
];

const LiveChatScreen = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isUser: true,
        timestamp: 'Today',
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. Our agent will respond shortly.',
          isUser: false,
          timestamp: 'Today',
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Chat</Text>
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
            <Text style={styles.dateHeader}>Today</Text>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  message.isUser ? styles.userMessageRow : null,
                ]}>
                {!message.isUser && (
                  <Image
                    source={{ uri: 'https://ui-avatars.com/api/?name=Agent&background=0D8ABC&color=fff' }}
                    style={styles.messageAvatar}
                  />
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessageBubble : styles.agentMessageBubble,
                  ]}>
                  <Text style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : null,
                  ]}>{message.text}</Text>
                </View>
                {message.isUser && (
                  <Image
                    source={{ uri: 'https://ui-avatars.com/api/?name=User&background=7A1FA2&color=fff' }}
                    style={styles.messageAvatar}
                  />
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
              disabled={!newMessage.trim()}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/sent.png' }}
                style={[styles.sendIcon, !newMessage.trim() && styles.sendIconDisabled]}
              />
            </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  dateHeader: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 16,
    fontSize: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  userMessageBubble: {
    backgroundColor: '#0000FF',
  },
  agentMessageBubble: {
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 14,
    color: '#000000',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    marginBottom: 90,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  sendIconDisabled: {
    opacity: 0.5,
  },
});

export default LiveChatScreen; 