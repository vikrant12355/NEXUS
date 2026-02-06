import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Award, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import { grades } from '@/mocks/academics';

export default function GradesScreen() {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return Colors.success;
    if (grade.startsWith('B')) return Colors.info;
    if (grade.startsWith('C')) return Colors.warning;
    return Colors.error;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.success, `${Colors.success}80`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cgpaCard}
      >
        <View style={styles.cgpaHeader}>
          <Award size={32} color={Colors.text} />
          <Text style={styles.cgpaLabel}>Cumulative GPA</Text>
        </View>
        <Text style={styles.cgpaValue}>{grades.cgpa}</Text>
        <View style={styles.cgpaStats}>
          <View style={styles.cgpaStat}>
            <Text style={styles.cgpaStatValue}>{grades.currentSemesterGPA}</Text>
            <Text style={styles.cgpaStatLabel}>Current Semester</Text>
          </View>
          <View style={styles.cgpaStatDivider} />
          <View style={styles.cgpaStat}>
            <Text style={styles.cgpaStatValue}>{grades.totalCredits}</Text>
            <Text style={styles.cgpaStatLabel}>Total Credits</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Degree Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(grades.totalCredits / 160) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {grades.totalCredits} of 160 credits completed
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Current Semester Courses</Text>
      {grades.courses.map((course) => (
        <Card key={course.code} style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{course.name}</Text>
              <View style={styles.courseMetaRow}>
                <BookOpen size={12} color={Colors.textSecondary} />
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseCredits}>• {course.credits} credits</Text>
              </View>
            </View>
            <View
              style={[
                styles.gradeBox,
                { backgroundColor: `${getGradeColor(course.grade)}15` },
              ]}
            >
              <Text
                style={[styles.gradeText, { color: getGradeColor(course.grade) }]}
              >
                {course.grade}
              </Text>
            </View>
          </View>
          <View style={styles.gradeBar}>
            <View
              style={[
                styles.gradeBarFill,
                {
                  width: `${
                    course.grade === 'A'
                      ? 100
                      : course.grade === 'A-'
                      ? 90
                      : course.grade === 'B+'
                      ? 85
                      : course.grade === 'B'
                      ? 80
                      : 70
                  }%`,
                  backgroundColor: getGradeColor(course.grade),
                },
              ]}
            />
          </View>
        </Card>
      ))}

      <Card style={styles.trendCard}>
        <View style={styles.trendHeader}>
          <TrendingUp size={20} color={Colors.success} />
          <Text style={styles.trendTitle}>Performance Trend</Text>
        </View>
        <Text style={styles.trendDescription}>
          Your GPA has improved by 0.3 points compared to the previous semester. Keep up the great work!
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
  cgpaCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  cgpaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cgpaLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: 'rgba(255,255,255,0.9)',
  },
  cgpaValue: {
    fontSize: 56,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  cgpaStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  cgpaStat: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cgpaStatValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  cgpaStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  cgpaStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  courseCard: {
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseCode: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  courseCredits: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  gradeBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  gradeText: {
    fontSize: 20,
    fontWeight: '800' as const,
  },
  gradeBar: {
    height: 4,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  gradeBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  trendCard: {
    backgroundColor: `${Colors.success}10`,
    borderColor: `${Colors.success}30`,
    marginTop: 12,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  trendDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});
