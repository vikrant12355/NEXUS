import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  UtensilsCrossed,
  Mail,
  Bell,
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import SectionHeader from '@/components/SectionHeader';
import QuickAction from '@/components/QuickAction';
import { messMenu, emails, campusAlerts, upcomingEvents } from '@/mocks/dashboard';
import { todaySchedule } from '@/mocks/academics';
import { userProfile } from '@/mocks/profile';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';
  
  const currentMeal = messMenu.find(meal => {
    if (currentHour >= 7 && currentHour < 10) return meal.type === 'breakfast';
    if (currentHour >= 12 && currentHour < 15) return meal.type === 'lunch';
    if (currentHour >= 17 && currentHour < 18) return meal.type === 'snacks';
    if (currentHour >= 19 && currentHour < 22) return meal.type === 'dinner';
    return false;
  }) || messMenu[0];

  const nextClass = todaySchedule[0];
  const unreadEmails = emails.filter(e => !e.isRead).length;
  const urgentAlerts = campusAlerts.filter(a => a.type === 'urgent' || a.type === 'warning').length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{userProfile.name.split(' ')[0]}</Text>
        </View>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.avatar}
        />
      </View>

      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aiCard}
      >
        <View style={styles.aiCardContent}>
          <View style={styles.aiIconContainer}>
            <Sparkles size={24} color={Colors.text} />
          </View>
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>AI Mail Summary</Text>
            <Text style={styles.aiSubtitle}>
              {unreadEmails} unread emails with action items
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.aiButton}
          onPress={() => router.push('/emails')}
        >
          <Text style={styles.aiButtonText}>View Summaries</Text>
          <ChevronRight size={16} color={Colors.background} />
        </Pressable>
      </LinearGradient>

      <View style={styles.quickActions}>
        <QuickAction
          icon={UtensilsCrossed}
          label="Mess Menu"
          color={Colors.secondary}
          onPress={() => router.push('/mess-menu')}
        />
        <QuickAction
          icon={Mail}
          label="Inbox"
          color={Colors.info}
          onPress={() => router.push('/emails')}
          badge={unreadEmails}
        />
        <QuickAction
          icon={Bell}
          label="Alerts"
          color={Colors.error}
          onPress={() => router.push('/alerts')}
          badge={urgentAlerts}
        />
        <QuickAction
          icon={Calendar}
          label="Schedule"
          color={Colors.academic}
          onPress={() => router.push('/(tabs)/(academics)')}
        />
      </View>

      <SectionHeader
        title="Current Meal"
        subtitle={currentMeal.time}
        actionLabel="Full Menu"
        onAction={() => router.push('/mess-menu')}
      />
      <Card style={styles.mealCard}>
        <View style={styles.mealHeader}>
          <View style={styles.mealIconContainer}>
            <UtensilsCrossed size={20} color={Colors.secondary} />
          </View>
          <Text style={styles.mealName}>{currentMeal.name}</Text>
          {currentMeal.isVeg && <Badge label="Veg" variant="success" />}
        </View>
        <View style={styles.mealItems}>
          {currentMeal.items.slice(0, 4).map((item, index) => (
            <View key={index} style={styles.mealItem}>
              <View style={styles.mealItemDot} />
              <Text style={styles.mealItemText}>{item}</Text>
            </View>
          ))}
          {currentMeal.items.length > 4 && (
            <Text style={styles.moreItems}>
              +{currentMeal.items.length - 4} more items
            </Text>
          )}
        </View>
      </Card>

      <SectionHeader
        title="Next Class"
        subtitle="Today"
        actionLabel="Full Schedule"
        onAction={() => router.push('/(tabs)/(academics)')}
      />
      {nextClass && (
        <Card style={styles.classCard} onPress={() => router.push('/(tabs)/(academics)')}>
          <View style={[styles.classIndicator, { backgroundColor: nextClass.color }]} />
          <View style={styles.classContent}>
            <View style={styles.classHeader}>
              <Text style={styles.classSubject}>{nextClass.subject}</Text>
              <Badge label={nextClass.code} variant="muted" />
            </View>
            <View style={styles.classDetails}>
              <View style={styles.classDetailItem}>
                <Clock size={14} color={Colors.textSecondary} />
                <Text style={styles.classDetailText}>
                  {nextClass.startTime} - {nextClass.endTime}
                </Text>
              </View>
              <Text style={styles.classRoom}>{nextClass.room}</Text>
            </View>
            <Text style={styles.classInstructor}>{nextClass.instructor}</Text>
          </View>
        </Card>
      )}

      <SectionHeader
        title="Campus Alerts"
        actionLabel="View All"
        onAction={() => router.push('/alerts')}
      />
      <View style={styles.alertsContainer}>
        {campusAlerts.slice(0, 2).map((alert) => (
          <Card
            key={alert.id}
            style={[
              styles.alertCard,
              alert.type === 'urgent' && styles.urgentAlert,
            ]}
          >
            <View style={styles.alertContent}>
              <View
                style={[
                  styles.alertIconContainer,
                  {
                    backgroundColor:
                      alert.type === 'urgent'
                        ? `${Colors.error}20`
                        : alert.type === 'warning'
                        ? `${Colors.warning}20`
                        : `${Colors.info}20`,
                  },
                ]}
              >
                <AlertCircle
                  size={18}
                  color={
                    alert.type === 'urgent'
                      ? Colors.error
                      : alert.type === 'warning'
                      ? Colors.warning
                      : Colors.info
                  }
                />
              </View>
              <View style={styles.alertTextContainer}>
                <Text style={styles.alertTitle} numberOfLines={1}>
                  {alert.title}
                </Text>
                <Text style={styles.alertDescription} numberOfLines={2}>
                  {alert.description}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader title="Upcoming Events" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsScroll}
      >
        {upcomingEvents.map((event) => (
          <Card key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventContent}>
              <Badge label={event.category} variant="primary" />
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.title}
              </Text>
              <View style={styles.eventDetails}>
                <Calendar size={12} color={Colors.textSecondary} />
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <View style={styles.eventAttendees}>
                <TrendingUp size={12} color={Colors.success} />
                <Text style={styles.eventAttendeesText}>
                  {event.attendees} interested
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  userName: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  aiCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  aiSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 6,
  },
  aiButtonText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.background,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  mealCard: {
    marginBottom: 24,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  mealIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${Colors.secondary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
    flex: 1,
  },
  mealItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mealItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
  },
  mealItemText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  moreItems: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    alignSelf: 'center',
    marginLeft: 8,
  },
  classCard: {
    flexDirection: 'row',
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  classIndicator: {
    width: 5,
  },
  classContent: {
    flex: 1,
    padding: 16,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  classSubject: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  classDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classDetailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  classRoom: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  classInstructor: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  alertsContainer: {
    gap: 10,
    marginBottom: 24,
  },
  alertCard: {
    padding: 14,
  },
  urgentAlert: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  alertIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  eventsScroll: {
    gap: 12,
    paddingRight: 16,
  },
  eventCard: {
    width: 200,
    padding: 0,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 100,
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventAttendeesText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500' as const,
  },
  bottomSpacer: {
    height: 20,
  },
});
