import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function AcademicsLayout() {
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
          title: "Academics",
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: Colors.text, fontWeight: '800' },
        }}
      />
      <Stack.Screen name="assignments" options={{ title: "Assignments" }} />
      <Stack.Screen name="grades" options={{ title: "Grades" }} />
    </Stack>
  );
}
