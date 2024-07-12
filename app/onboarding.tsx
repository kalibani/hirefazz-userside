import { useState } from "react";
import {
  Image,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";

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

  const [number, onChangeNumber] = useState("");

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
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.background,
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.light.background,
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}
      >
        <Image
          source={require("@/assets/images/hirefazz-logo.png")}
          style={styles.reactLogo}
        />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Selamat Datang di HireFazz</ThemedText>
          <HelloWave />
        </ThemedView>
        {/* <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Selamat Datang!</ThemedText>
          <HelloWave />
        </ThemedView> */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Masukkan Kode Anda!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={{ fontSize: 16, color: "#6b7280" }}>
            Kode hanya sekali pakai
          </ThemedText>
        </ThemedView>
        <SafeAreaView style={{ marginBottom: 10 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 10,
              padding: 10,
              width: 300,
              textAlign: "center",
            }}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="number-pad"
            maxLength={4}
          />
        </SafeAreaView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={{ fontSize: 16, color: "#6b7280" }}>
            Masukkan Kode yang dikirim dari email
          </ThemedText>
        </ThemedView>
        <View
          style={{
            width: 150,
            borderRadius: 20,
            opacity: 1,
          }}
        >
          <Button
            title="Submit"
            onPress={handleContinue}
            color={Colors.light.hireFazzPrimary}
          />
        </View>
        {/* <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Izin Kamera</ThemedText>
          <ThemedText>🎥 Untuk mengambil gambar dan merekam video</ThemedText>
        </ThemedView> */}
        {/* <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Izin Mikropon</ThemedText>
          <ThemedText>🎙️ Untuk merekam video besera suara</ThemedText>
        </ThemedView>
        <Button title="Continue" onPress={handleContinue} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 10,
  },
  reactLogo: {
    height: 30,
    width: 29,
  },
});
