import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FeatureCardProps {
  index: number;
  icon: string;
  title: string;
  description: string;
  fadeAnim: Animated.Value;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ index, icon, title, description, fadeAnim }) => {
  return (
    <Animated.View 
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }]
        }
      ]}
    >
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon as any} size={20} color="#3B82F6" />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>
        {description}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    width: '45%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default FeatureCard; 