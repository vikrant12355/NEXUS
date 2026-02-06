import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { MapPin, Calendar, Mail, Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TabBar from '@/components/TabBar';
import { lostFoundItems } from '@/mocks/exchange';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'lost', label: 'Lost' },
  { key: 'found', label: 'Found' },
];

export default function LostFoundScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = lostFoundItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

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
        {filteredItems.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Badge
                label={item.type}
                variant={item.type === 'lost' ? 'error' : 'success'}
                size="medium"
              />
              <Badge label={item.category} variant="muted" />
            </View>

            <View style={styles.itemMain}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>

            <View style={styles.itemDetails}>
              <View style={styles.detailRow}>
                <MapPin size={14} color={Colors.textSecondary} />
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Calendar size={14} color={Colors.textSecondary} />
                <Text style={styles.detailText}>{item.date}</Text>
              </View>
            </View>

            <Pressable style={styles.contactButton}>
              <Mail size={16} color={Colors.text} />
              <Text style={styles.contactButtonText}>Contact</Text>
            </Pressable>
          </Card>
        ))}

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>📌 Quick Tips</Text>
          <Text style={styles.tipText}>
            • Include clear photos and detailed descriptions{'\n'}
            • Mention the exact location where item was lost/found{'\n'}
            • Check this section regularly for updates
          </Text>
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
  itemCard: {
    gap: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    gap: 8,
  },
  itemMain: {
    flexDirection: 'row',
    gap: 14,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  itemDetails: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  tipCard: {
    backgroundColor: `${Colors.info}10`,
    borderColor: `${Colors.info}30`,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 22,
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
