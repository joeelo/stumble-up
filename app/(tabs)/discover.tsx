import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useEffect, useState } from "react"
import { IconSymbol } from "@/components/ui/IconSymbol"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { Accelerometer } from "expo-sensors"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import WebView from "react-native-webview"

export default function Discover() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  // TODO: Make sure shakeactive is accepted by user
  const [isShakeActive, setIsShakeActive] = useState(true) // State to manage shake activation
  const [index, setIndex] = useState(0)

  const randomWebsites = [
    "https://reactnative.dev/",
    "https://www.reddit.com",
    "https://www.wikipedia.org",
    "https://www.github.com",
    "https://www.stackoverflow.com",
    "https://www.medium.com",
    "https://www.imgur.com",
    "https://www.twitch.tv",
    "https://www.spotify.com",
    "https://www.discord.com",
    "https://www.archive.org"
  ]

  console.log(randomWebsites[index])

  // https://docs.expo.dev/versions/latest/sdk/accelerometer/
  useEffect(() => {
    let subscription = undefined

    if (isShakeActive) {
      Accelerometer.setUpdateInterval(100) // Adjust based on your needs

      subscription = Accelerometer.addListener((accelerometerData) => {
        const { x } = accelerometerData
        if (Math.abs(x) > 1.8) {
          // Adjust threshold based on testing for x-axis motion
          console.log("shake detected")
          setIndex((prev) => prev + 1)
        }
      })
    }

    return () => {
      subscription && subscription.remove()
    }
  }, [isShakeActive]) // Depend on isShakeActive to re-run effect

  return (
    // https://blog.logrocket.com/react-native-webview-complete-guide/
    <WebView source={{ uri: randomWebsites[index] }} style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  text: {
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc"
  }
})
