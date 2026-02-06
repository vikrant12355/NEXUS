import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Clock, Users, Plus, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TabBar from '@/components/TabBar';
import { cabPools } from '@/mocks/exchange';

const tabs = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'my-rides', label: 'My Rides' },
];

export default function CabPoolScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'upcoming' ? (
          <>
            {cabPools.map((pool) => (
              <Card key={pool.id} style={styles.rideCard}>
                <View style={styles.routeContainer}>
                  <View style={styles.routeVisual}>
                    <View style={styles.routeDotStart} />
                    <View style={styles.routeLineVertical} />
                    <View style={styles.routeDotEnd} />
                  </View>
                  <View style={styles.routeInfo}>
                    <View style={styles.routePoint}>
                      <Text style={styles.routeLabel}>FROM</Text>
                      <Text style={styles.routeText}>{pool.from}</Text>
                    </View>
                    <View style={styles.routePoint}>
                      <Text style={styles.routeLabel}>TO</Text>
                      <Text style={styles.routeText}>{pool.to}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rideDetails}>
                  <View style={styles.detailItem}>
                    <Clock size={16} color={Colors.textSecondary} />
                    <Text style={styles.detailText}>{pool.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.timeText}>{pool.time}</Text>
                  </View>
                </View>

                <View style={styles.rideMeta}>
                  <View style={styles.organizerRow}>
                    <Image source={{ uri: pool.organizerAvatar }} style={styles.avatar} />
                    <Text style={styles.organizerName}>{pool.organizer}</Text>
                  </View>
                  <View style={styles.seatsContainer}>
                    <Users size={14} color={Colors.success} />
                    <Text style={styles.seatsText}>
                      {pool.seatsAvailable} of {pool.totalSeats} available
                    </Text>
                  </View>
                </View>

                {pool.participants.length > 0 && (
                  <View style={styles.participantsRow}>
                    <Text style={styles.participantsLabel}>Joined:</Text>
                    <Text style={styles.participantsText}>
                      {pool.participants.join(', ')}
                    </Text>
                  </View>
                )}

                <View style={styles.rideFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Per seat</Text>
                    <Text style={styles.priceValue}>₹{pool.price}</Text>
                  </View>
                  <Pressable
                    style={[
                      styles.joinButton,
                      pool.seatsAvailable === 0 && styles.joinButtonDisabled,
                    ]}
                    disabled={pool.seatsAvailable === 0}
                  >
                    <Text style={styles.joinButtonText}>
                      {pool.seatsAvailable === 0 ? 'Full' : 'Join Ride'}
                    </Text>
                    {pool.seatsAvailable > 0 && (
                      <ArrowRight size={16} color={Colors.text} />
                    )}
                  </Pressable>
                </View>
              </Card>
            ))}
          </>
        ) : (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No rides yet</Text>
            <Text style={styles.emptyText}>
              Create or join a ride to see them here
            </Text>
          </Card>
        )}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>🚗 How Cab Pool Works</Text>
          <View style={styles.infoSteps}>
            <Text style={styles.infoStep}>1. Find a ride going your way</Text>
            <Text style={styles.infoStep}>2. Join and split the fare</Text>
            <Text style={styles.infoStep}>3. Coordinate with fellow riders</Text>
          </View>
        </Card>
      </ScrollView>

      <Pressable style={styles.fab}>
        <Plus size={24} color={Colors.text} />
      </Pressable>
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
  rideCard: {
    gap: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    gap: 14,
  },
  routeVisual: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  routeDotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
  },
  routeLineVertical: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  routeDotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  routeInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  routePoint: {
    gap: 2,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  routeText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  rideDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  rideMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  organizerName: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  seatsText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.success,
  },
  participantsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  participantsLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  participantsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceContainer: {
    gap: 2,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Colors.text,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  joinButtonDisabled: {
    backgroundColor: Colors.surface,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoCard: {
    backgroundColor: `${Colors.info}10`,
    borderColor: `${Colors.info}30`,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  infoSteps: {
    gap: 8,
  },
  infoStep: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
