import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function FingerprintAuthenticationPage() {
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);

  const checkFingerprintAvailability = async () => {
    const isAvailable =
      (await LocalAuthentication.hasHardwareAsync()) &&
      (await LocalAuthentication.isEnrolledAsync());
    setIsFingerprintAvailable(isAvailable);
  };

  const authenticateWithFingerprint = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        Alert.alert("Success", "Fingerprint authentication successful!");
      } else {
        Alert.alert("Failure", "Fingerprint authentication failed!");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred during fingerprint authentication."
      );
    }
  };

  useEffect(() => {
    checkFingerprintAvailability();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Authentication</Text>
      {isFingerprintAvailable ? (
        <TouchableOpacity
          style={styles.button}
          onPress={authenticateWithFingerprint}
        >
          <Text style={styles.buttonText}>Authenticate with Fingerprint</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.errorMessage}>
          Fingerprint authentication is not available on this device.
        </Text>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
};
