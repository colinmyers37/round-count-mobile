import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import FeatureCard from './components/FeatureCard';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  useEffect(() => {
    const animations = fadeAnims.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      });
    });

    Animated.stagger(200, animations).start();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>R</Text>
        </View>
        <Text style={styles.title}>Welcome to Round</Text>
        <Text style={styles.subtitle}>Track and Maintain Your Firearms</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push('/login')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureCard
          index={0}
          icon="analytics-outline"
          title="Round Count"
          description="Track rounds for each firearm"
          fadeAnim={fadeAnims[0]}
        />
        <FeatureCard
          index={1}
          icon="calendar-outline"
          title="Maintenance"
          description="Get cleaning reminders"
          fadeAnim={fadeAnims[1]}
        />
        <FeatureCard
          index={2}
          icon="shield-checkmark-outline"
          title="Safety"
          description="Track maintenance history"
          fadeAnim={fadeAnims[2]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 48,
    alignItems: 'center',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
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
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  secondaryButtonText: {
    color: '#3B82F6',
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    maxWidth: 600,
    alignSelf: 'center',
  },
});
