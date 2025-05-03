import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import * as SecureStore from 'expo-secure-store';
import api from '../lib/api';
import { API_ENDPOINTS } from '../config/api.config';

interface LoginResponse {
  token: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await api.post<LoginResponse>(API_ENDPOINTS.auth.login, {
        email,
        password,
      });

      // Store the token securely
      await SecureStore.setItemAsync('userToken', data.token);
      
      // Navigate to the main app
      router.replace('/(tabs)/home' as any);
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>R</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.formContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
            editable={!isLoading}
          />
          
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkContainer}
            onPress={() => router.push('/signup')}
            disabled={isLoading}
          >
            <Text style={styles.linkText}>Don't have an account? </Text>
            <Text style={styles.linkTextBold}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.background,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.cardBackground,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  linkTextBold: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  inputError: {
    borderColor: colors.error,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
