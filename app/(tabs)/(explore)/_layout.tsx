import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function ExploreLayout() {
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
          title: "Explore",
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: Colors.text, fontWeight: '800' },
        }}
      />
      <Stack.Screen name="place-detail" options={{ title: "Details" }} />
    </Stack>
  );
}
