import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function HomeLayout() {
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
          title: "Nexus",
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: Colors.text, fontWeight: '800' },
        }}
      />
      <Stack.Screen name="mess-menu" options={{ title: "Mess Menu" }} />
      <Stack.Screen name="emails" options={{ title: "Mail Inbox" }} />
      <Stack.Screen name="alerts" options={{ title: "Campus Alerts" }} />
    </Stack>
  );
}
