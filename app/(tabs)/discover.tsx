import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { EventSubscription, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { IconSymbol } from "@/components/ui/IconSymbol"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors"

export default function Discover() {
  const [data, setData] = useState<Partial<DeviceMotionMeasurement>>({
    acceleration: { x: 0, y: 0, z: 0, timestamp: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0, timestamp: 0 }
  })
  const [subscription, setSubscription] = useState<EventSubscription | null>(
    null
  )

  useEffect(() => {
    const isAvailable = async () => {
      let available = await DeviceMotion.isAvailableAsync()
      if (!available) {
        alert("Device motion is not available on this device")
      } else {
        subscribe()
      }
    }

    isAvailable()

    return () => unsubscribe()
  }, [])

  console.log(data)

  const subscribe = () => {
    DeviceMotion.setUpdateInterval(100) // Update every 100 milliseconds
    const newSubscription = DeviceMotion.addListener((motionData) => {
      setData(motionData)
    })
    // @ts-ignore
    setSubscription(newSubscription)
  }

  const unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Discover</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center"
  }
})
