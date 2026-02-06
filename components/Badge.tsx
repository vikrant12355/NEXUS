import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: 'rgba(255, 107, 74, 0.15)', text: Colors.primary },
  success: { bg: 'rgba(74, 222, 128, 0.15)', text: Colors.success },
  warning: { bg: 'rgba(251, 191, 36, 0.15)', text: Colors.warning },
  error: { bg: 'rgba(248, 113, 113, 0.15)', text: Colors.error },
  info: { bg: 'rgba(96, 165, 250, 0.15)', text: Colors.info },
  muted: { bg: 'rgba(139, 156, 175, 0.15)', text: Colors.textSecondary },
};

export default function Badge({ label, variant = 'primary', size = 'small', style }: BadgeProps) {
  const colors = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        size === 'medium' && styles.badgeMedium,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'medium' && styles.textMedium,
          { color: colors.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeMedium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textMedium: {
    fontSize: 12,
  },
});
