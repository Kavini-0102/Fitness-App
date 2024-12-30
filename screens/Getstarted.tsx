// GetStarted.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const GetStarted: React.FC = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/photos/fitness-equipment-and-space-for-text-picture-id1192511480?k=20&m=1192511480&s=612x612&w=0&h=NBZu9YtJYINA-qxBkniYeCQDh4CBAJ1eHV64VYoH1Bk=' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Fitness App!</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Login')} 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // To cover the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // To make text and button stand out more
    borderRadius: 10,
    margin: 10,
    
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 0,
    color: '#fff', // Ensure the text is visible on dark backgrounds
  },
});

export default GetStarted;
