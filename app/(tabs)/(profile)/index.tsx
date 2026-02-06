import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Bell,
  FileText,
  CreditCard,
  Folder,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  Award,
  CalendarCheck,
  BookOpen,
  GraduationCap,
  LucideIcon,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import { userProfile, quickStats, menuItems } from '@/mocks/profile';

const iconMap: Record<string, LucideIcon> = {
  user: User,
  bell: Bell,
  'file-text': FileText,
  'credit-card': CreditCard,
  folder: Folder,
  'help-circle': HelpCircle,
  settings: Settings,
  award: Award,
  'calendar-check': CalendarCheck,
  book: BookOpen,
  'graduation-cap': GraduationCap,
};

const statIconMap: Record<string, LucideIcon> = {
  award: Award,
  'calendar-check': CalendarCheck,
  book: BookOpen,
  'graduation-cap': GraduationCap,
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <View style={styles.avatarBadge}>
            <GraduationCap size={14} color={Colors.text} />
          </View>
        </View>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userEmail}>{userProfile.email}</Text>
        <View style={styles.userMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{userProfile.rollNumber}</Text>
            <Text style={styles.metaLabel}>Roll Number</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{userProfile.year}</Text>
            <Text style={styles.metaLabel}>Year</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsGrid}>
        {quickStats.map((stat, index) => {
          const IconComponent = statIconMap[stat.icon] || Award;
          return (
            <Card key={index} style={styles.statCard}>
              <IconComponent size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          );
        })}
      </View>

      <Card style={styles.departmentCard}>
        <View style={styles.departmentIcon}>
          <BookOpen size={20} color={Colors.academic} />
        </View>
        <View style={styles.departmentInfo}>
          <Text style={styles.departmentLabel}>Department</Text>
          <Text style={styles.departmentValue}>{userProfile.department}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Account</Text>
      <Card style={styles.menuCard}>
        {menuItems.map((item, index) => {
          const IconComponent = iconMap[item.icon] || User;
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                index < menuItems.length - 1 && styles.menuItemBorder,
                pressed && styles.menuItemPressed,
              ]}
              onPress={() => {
                if (item.screen === 'settings') {
                  router.push('/settings');
                }
              }}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: `${Colors.primary}15` },
                ]}
              >
                <IconComponent size={18} color={Colors.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <ChevronRight size={18} color={Colors.textMuted} />
            </Pressable>
          );
        })}
      </Card>

      <Pressable style={styles.logoutButton}>
        <LogOut size={18} color={Colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.versionText}>Project Nexus v1.0.0</Text>

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
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.success,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  metaLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Colors.text,
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  departmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  departmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.academic}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  departmentInfo: {
    flex: 1,
  },
  departmentLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  departmentValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemPressed: {
    backgroundColor: Colors.surface,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500' as const,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: `${Colors.error}15`,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${Colors.error}30`,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.error,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
});
