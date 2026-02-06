import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Grid,
  Utensils,
  Coffee,
  BookOpen,
  Dumbbell,
  Gamepad2,
} from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { places, categories } from '@/mocks/explore';

const iconMap: Record<string, LucideIcon> = {
  grid: Grid,
  utensils: Utensils,
  coffee: Coffee,
  'book-open': BookOpen,
  dumbbell: Dumbbell,
  'gamepad-2': Gamepad2,
};

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' ||
      place.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const renderPriceLevel = (level: number) => {
    return '₹'.repeat(level) + '₹'.repeat(3 - level).split('').map(() => '').join('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Grid;
          const isActive = activeCategory === cat.name;
          return (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCategory(cat.name)}
              style={[styles.categoryItem, isActive && styles.categoryItemActive]}
            >
              <View
                style={[
                  styles.categoryIcon,
                  isActive && styles.categoryIconActive,
                ]}
              >
                <IconComponent
                  size={20}
                  color={isActive ? Colors.text : Colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  isActive && styles.categoryLabelActive,
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapPreview}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800',
            }}
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay}>
            <MapPin size={24} color={Colors.primary} />
            <Text style={styles.mapText}>View on Map</Text>
          </View>
        </View>

        <Text style={styles.resultsCount}>
          {filteredPlaces.length} places nearby
        </Text>

        {filteredPlaces.map((place) => (
          <Card key={place.id} style={styles.placeCard}>
            <Image source={{ uri: place.image }} style={styles.placeImage} />
            <View style={styles.placeContent}>
              <View style={styles.placeHeader}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={Colors.warning} fill={Colors.warning} />
                  <Text style={styles.ratingText}>{place.rating}</Text>
                </View>
              </View>

              <View style={styles.placeInfo}>
                <Badge label={place.category} variant="muted" />
                <Text style={styles.distanceText}>{place.distance}</Text>
                <Text style={styles.priceText}>
                  {'₹'.repeat(place.priceLevel)}
                  <Text style={styles.priceInactive}>
                    {'₹'.repeat(3 - place.priceLevel)}
                  </Text>
                </Text>
              </View>

              <View style={styles.tagsContainer}>
                {place.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.placeFooter}>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: place.isOpen ? Colors.success : Colors.error },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: place.isOpen ? Colors.success : Colors.error },
                    ]}
                  >
                    {place.isOpen ? 'Open Now' : 'Closed'}
                  </Text>
                </View>
                <Text style={styles.addressText} numberOfLines={1}>
                  {place.address}
                </Text>
              </View>
            </View>
          </Card>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: Colors.text,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryItemActive: {},
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIconActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  categoryLabelActive: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  mapPreview: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  resultsCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  placeCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  placeImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.surface,
  },
  placeContent: {
    padding: 14,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeName: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.warning}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: Colors.warning,
  },
  placeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  distanceText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.success,
  },
  priceInactive: {
    color: Colors.textMuted,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  placeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  addressText: {
    fontSize: 12,
    color: Colors.textMuted,
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  bottomSpacer: {
    height: 20,
  },
});
