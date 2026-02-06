import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShoppingBag,
  Search,
  Car,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import SectionHeader from '@/components/SectionHeader';
import { marketplaceItems, lostFoundItems, cabPools } from '@/mocks/exchange';

export default function ExchangeScreen() {
  const router = useRouter();

  const categories = [
    { icon: ShoppingBag, label: 'Marketplace', color: Colors.exchange, route: '/marketplace' },
    { icon: Search, label: 'Lost & Found', color: Colors.warning, route: '/lost-found' },
    { icon: Car, label: 'Cab Pool', color: Colors.info, route: '/cab-pool' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.subtitle}>
        Buy, sell, find, and share rides with your campus community
      </Text>

      <View style={styles.categoriesGrid}>
        {categories.map((cat, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryPressed,
            ]}
            onPress={() => router.push(cat.route as any)}
          >
            <LinearGradient
              colors={[`${cat.color}30`, `${cat.color}10`]}
              style={styles.categoryGradient}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${cat.color}40` }]}>
                <cat.icon size={24} color={cat.color} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <ChevronRight size={18} color={Colors.textMuted} />
            </LinearGradient>
          </Pressable>
        ))}
      </View>

      <SectionHeader
        title="Trending Items"
        subtitle="Hot deals this week"
        actionLabel="View All"
        onAction={() => router.push('/marketplace')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {marketplaceItems.slice(0, 3).map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemContent}>
              <Badge
                label={item.condition}
                variant={item.condition === 'new' || item.condition === 'like-new' ? 'success' : 'muted'}
              />
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
              <View style={styles.itemSeller}>
                <Image source={{ uri: item.sellerAvatar }} style={styles.sellerAvatar} />
                <Text style={styles.sellerName}>{item.seller}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      <SectionHeader
        title="Lost & Found"
        subtitle="Help reunite items with owners"
        actionLabel="View All"
        onAction={() => router.push('/lost-found')}
      />
      <View style={styles.lostFoundContainer}>
        {lostFoundItems.slice(0, 2).map((item) => (
          <Card key={item.id} style={styles.lostFoundCard}>
            <View style={styles.lostFoundHeader}>
              <Badge
                label={item.type}
                variant={item.type === 'lost' ? 'error' : 'success'}
              />
              <Text style={styles.lostFoundDate}>{item.date}</Text>
            </View>
            <Text style={styles.lostFoundTitle}>{item.title}</Text>
            <View style={styles.lostFoundLocation}>
              <MapPin size={12} color={Colors.textSecondary} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader
        title="Upcoming Rides"
        subtitle="Share your commute"
        actionLabel="View All"
        onAction={() => router.push('/cab-pool')}
      />
      {cabPools.slice(0, 2).map((pool) => (
        <Card key={pool.id} style={styles.rideCard}>
          <View style={styles.rideRoute}>
            <View style={styles.routePoint}>
              <View style={styles.routeDot} />
              <Text style={styles.routeText}>{pool.from}</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.routeDotEnd]} />
              <Text style={styles.routeText}>{pool.to}</Text>
            </View>
          </View>
          <View style={styles.rideDetails}>
            <View style={styles.rideInfo}>
              <Clock size={14} color={Colors.textSecondary} />
              <Text style={styles.rideInfoText}>{pool.date} • {pool.time}</Text>
            </View>
            <View style={styles.rideSeats}>
              <Text style={styles.seatsAvailable}>
                {pool.seatsAvailable}/{pool.totalSeats} seats
              </Text>
              <Text style={styles.ridePrice}>₹{pool.price}</Text>
            </View>
          </View>
          <View style={styles.rideOrganizer}>
            <Image source={{ uri: pool.organizerAvatar }} style={styles.organizerAvatar} />
            <Text style={styles.organizerName}>by {pool.organizer}</Text>
          </View>
        </Card>
      ))}

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
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  categoriesGrid: {
    gap: 12,
    marginBottom: 28,
  },
  categoryCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginLeft: 14,
  },
  horizontalScroll: {
    gap: 12,
    paddingRight: 16,
    marginBottom: 24,
  },
  itemCard: {
    width: 180,
    padding: 0,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.surface,
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 8,
  },
  itemSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sellerName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  lostFoundContainer: {
    gap: 12,
    marginBottom: 24,
  },
  lostFoundCard: {
    padding: 14,
  },
  lostFoundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lostFoundDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  lostFoundTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  lostFoundLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rideCard: {
    marginBottom: 12,
  },
  rideRoute: {
    marginBottom: 14,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
  },
  routeDotEnd: {
    backgroundColor: Colors.primary,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: 4,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rideInfoText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  rideSeats: {
    alignItems: 'flex-end',
  },
  seatsAvailable: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600' as const,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  rideOrganizer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  organizerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  organizerName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: 20,
  },
});
