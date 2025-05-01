import { Stack, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';

// Custom header component
const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>← Back</Text>
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>
        Header Title
      </Text>
    </View>
  );
};

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate checking auth state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return null; // Or a loading screen component
  }

  return (
    <Stack
      screenOptions={{
        header: () => <CustomHeader />,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Landing Page', headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{ title: 'Sign Up', headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="(firearms)/firearms"
        options={{ title: 'My Firearms', headerShown: false }}
      />
      <Stack.Screen
        name="(firearms)/maintenance"
        options={{ title: 'Maintenance', headerShown: false }}
      />
    </Stack>
  );
}
