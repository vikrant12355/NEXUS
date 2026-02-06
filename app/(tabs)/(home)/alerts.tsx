import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AlertCircle, Info, AlertTriangle, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import { campusAlerts } from '@/mocks/dashboard';

export default function AlertsScreen() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle size={22} color={Colors.error} />;
      case 'warning':
        return <AlertTriangle size={22} color={Colors.warning} />;
      case 'event':
        return <Calendar size={22} color={Colors.success} />;
      default:
        return <Info size={22} color={Colors.info} />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return Colors.error;
      case 'warning':
        return Colors.warning;
      case 'event':
        return Colors.success;
      default:
        return Colors.info;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'urgent':
        return `${Colors.error}15`;
      case 'warning':
        return `${Colors.warning}15`;
      case 'event':
        return `${Colors.success}15`;
      default:
        return `${Colors.info}15`;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Today</Text>
      {campusAlerts.map((alert) => (
        <Card
          key={alert.id}
          style={[
            styles.alertCard,
            { borderLeftColor: getAlertColor(alert.type) },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: getAlertBg(alert.type) },
            ]}
          >
            {getAlertIcon(alert.type)}
          </View>
          <View style={styles.alertContent}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text
                style={[styles.alertType, { color: getAlertColor(alert.type) }]}
              >
                {alert.type.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.alertDescription}>{alert.description}</Text>
            <Text style={styles.alertDate}>{alert.date}</Text>
          </View>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Earlier</Text>
      <Card style={styles.emptyCard}>
        <Info size={40} color={Colors.textMuted} />
        <Text style={styles.emptyText}>No older alerts</Text>
        <Text style={styles.emptySubtext}>
          Past alerts will appear here for reference
        </Text>
      </Card>
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
  alertCard: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    flex: 1,
  },
  alertType: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  alertDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  alertDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
