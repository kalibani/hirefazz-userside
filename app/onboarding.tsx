import { Image, StyleSheet, Button, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnBoardingScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  const handleContinue = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      // navigate to tabs
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  };

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required.");
      return false;
    }

    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permission is required.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required.");
      return false;
    }

    // only set to true once user provides permissions
    // this prevents taking user to home screen without permissions
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <SymbolView
          name="camera.circle"
          size={250}
          type="hierarchical"
          animationSpec={{
            effect: {
              type: "bounce",
            },
          }}
          tintColor={Colors.light.background}
          fallback={
            <Image
              source={require("@/assets/images/hirefazz-logo.png")}
              style={styles.reactLogo}
            />
          }
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Selamat Datang!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          HireFazz membutuhkan izin untuk mengakses kamera guna perekaman video.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Izin Kamera</ThemedText>
        <ThemedText>🎥 Untuk mengambil gambar dan merekam video</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Izin Mikropon</ThemedText>
        <ThemedText>🎙️ Untuk merekam video besera suara</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Izin Perpustakaan Media</ThemedText>
        <ThemedText>📸 Untuk menyimpan dan mengakses hasil rekaman </ThemedText>
      </ThemedView>
      <Button title="Continue" onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
