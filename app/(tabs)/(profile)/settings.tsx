import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import {
  Bell,
  Moon,
  Globe,
  Shield,
  Smartphone,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [classReminders, setClassReminders] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Notifications</Text>
      <Card style={styles.settingsCard}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.primary}15` }]}>
              <Bell size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive alerts on your device
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.surface, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.info}15` }]}>
              <Globe size={18} color={Colors.info} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Email Alerts</Text>
              <Text style={styles.settingDescription}>
                Get email summaries daily
              </Text>
            </View>
          </View>
          <Switch
            value={emailAlerts}
            onValueChange={setEmailAlerts}
            trackColor={{ false: Colors.surface, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.warning}15` }]}>
              <Smartphone size={18} color={Colors.warning} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Class Reminders</Text>
              <Text style={styles.settingDescription}>
                15 min before each class
              </Text>
            </View>
          </View>
          <Switch
            value={classReminders}
            onValueChange={setClassReminders}
            trackColor={{ false: Colors.surface, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>General</Text>
      <Card style={styles.settingsCard}>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.academic}15` }]}>
              <Moon size={18} color={Colors.academic} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Appearance</Text>
              <Text style={styles.settingDescription}>Dark mode</Text>
            </View>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.success}15` }]}>
              <Shield size={18} color={Colors.success} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Privacy & Security</Text>
              <Text style={styles.settingDescription}>
                Manage your data
              </Text>
            </View>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>
      </Card>

      <Text style={styles.sectionTitle}>About</Text>
      <Card style={styles.settingsCard}>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: `${Colors.explore}15` }]}>
              <Info size={18} color={Colors.explore} />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>About Project Nexus</Text>
              <Text style={styles.settingDescription}>Version 1.0.0</Text>
            </View>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>🎓 AI Fusion Hackathon 2026</Text>
        <Text style={styles.infoText}>
          Project Nexus is a unified campus super-app built for the AI Fusion Hackathon. 
          It connects academics, daily life, mobility, marketplaces, and campus information 
          into one intelligent ecosystem.
        </Text>
      </Card>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 8,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  infoCard: {
    backgroundColor: `${Colors.primary}10`,
    borderColor: `${Colors.primary}30`,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});
