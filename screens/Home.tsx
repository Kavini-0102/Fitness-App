import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { StackNavigationProp } from '@react-navigation/stack'; // Import navigation types
import { RootStackParamList } from '../type'; // Import navigation types

type Item = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
};

type HomeProps = {
  route: {
    params: {
      username: string;
    };
  };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ route }) => {
  const { username } = route.params;
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Initialize navigation with proper typing
  const navigation = useNavigation<HomeNavigationProp>();

  const API_URL = "https://exercisedb.p.rapidapi.com/exercises";
  const API_OPTIONS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9a10edbc45msh908cbcb576c8d59p19abb9jsn1812bdce45b0", 
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    }
  };

  useEffect(() => {
    fetch(API_URL, API_OPTIONS)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(
          data.slice(0, 10).map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.bodyPart ? item.bodyPart : "Unknown Category",
            description: item.target ? `Target muscle: ${item.target}` : "No description available.",
            image: item.gifUrl ? item.gifUrl : "https://via.placeholder.com/150", // Default image if not available
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch exercises. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleItemClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleLogOut = () => {
    // Correctly use the navigation with the correct screen name
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Exercises...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.userNameStyle}>Welcome, {username}!</Text>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logOutStyle}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleItemClick} style={styles.card}>
            {/* Using ImageBackground for fallback */}
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={{ borderRadius: 10 }}
              defaultSource={{ uri: "https://via.placeholder.com/150" }} // Fallback if image fails to load
            >
            </ImageBackground>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>
              {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : "Unknown Category"}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <Text style={styles.header}>Fitness Exercises</Text>
        }
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>Clicks: {clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    padding: 10,
  },
  userNameStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
  },
  logOutStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#00796B",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
