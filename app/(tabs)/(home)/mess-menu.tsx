import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UtensilsCrossed, Clock, Leaf } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TabBar from '@/components/TabBar';
import { messMenu } from '@/mocks/dashboard';

const days = [
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
];

export default function MessMenuScreen() {
  const [activeDay, setActiveDay] = useState('today');

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'snacks':
        return '🍪';
      case 'dinner':
        return '🌙';
      default:
        return '🍽️';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TabBar tabs={days} activeTab={activeDay} onTabChange={setActiveDay} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {messMenu.map((meal) => (
          <Card key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTitleRow}>
                <Text style={styles.mealEmoji}>{getMealIcon(meal.type)}</Text>
                <View style={styles.mealTitleContainer}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <View style={styles.mealTimeRow}>
                    <Clock size={12} color={Colors.textSecondary} />
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                </View>
              </View>
              {meal.isVeg && (
                <View style={styles.vegBadge}>
                  <Leaf size={12} color={Colors.success} />
                  <Text style={styles.vegText}>Veg</Text>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.itemsContainer}>
              {meal.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemDot} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </Card>
        ))}

        <Card style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <UtensilsCrossed size={20} color={Colors.info} />
          </View>
          <Text style={styles.infoText}>
            Menu is subject to change based on availability. Special dietary requirements can be requested at the mess office.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
    gap: 16,
  },
  mealCard: {
    padding: 0,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mealEmoji: {
    fontSize: 32,
  },
  mealTitleContainer: {
    gap: 4,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  mealTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mealTime: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  vegBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  vegText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600' as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  itemsContainer: {
    padding: 16,
    paddingTop: 12,
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  itemText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: `${Colors.info}10`,
    borderColor: `${Colors.info}30`,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
