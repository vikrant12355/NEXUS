import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function ExchangeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Exchange",
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: Colors.text, fontWeight: '800' },
        }}
      />
      <Stack.Screen name="marketplace" options={{ title: "Marketplace" }} />
      <Stack.Screen name="lost-found" options={{ title: "Lost & Found" }} />
      <Stack.Screen name="cab-pool" options={{ title: "Cab Pool" }} />
    </Stack>
  );
}