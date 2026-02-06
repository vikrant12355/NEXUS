import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Clock,
  MapPin,
  User,
  FileText,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import SectionHeader from '@/components/SectionHeader';
import TabBar from '@/components/TabBar';
import { todaySchedule, weekSchedule, assignments, grades } from '@/mocks/academics';

const dayTabs = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
];

export default function AcademicsScreen() {
  const router = useRouter();
  const [activeDay, setActiveDay] = useState('today');

  const schedule = activeDay === 'today' ? todaySchedule : weekSchedule;
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingDeadlines = pendingAssignments.slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[Colors.academic, `${Colors.academic}80`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statsCard}
      >
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{grades.cgpa}</Text>
            <Text style={styles.statLabel}>CGPA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{grades.currentSemesterGPA}</Text>
            <Text style={styles.statLabel}>Current GPA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{grades.totalCredits}</Text>
            <Text style={styles.statLabel}>Credits</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.quickLinks}>
        <Pressable
          style={styles.quickLink}
          onPress={() => router.push('/assignments')}
        >
          <View style={[styles.quickLinkIcon, { backgroundColor: `${Colors.warning}20` }]}>
            <FileText size={20} color={Colors.warning} />
          </View>
          <Text style={styles.quickLinkText}>Assignments</Text>
          <View style={styles.quickLinkBadge}>
            <Text style={styles.quickLinkBadgeText}>{pendingAssignments.length}</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.quickLink}
          onPress={() => router.push('/grades')}
        >
          <View style={[styles.quickLinkIcon, { backgroundColor: `${Colors.success}20` }]}>
            <Award size={20} color={Colors.success} />
          </View>
          <Text style={styles.quickLinkText}>Grades</Text>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>
      </View>

      <SectionHeader title="Class Schedule" />
      <View style={styles.tabContainer}>
        <TabBar tabs={dayTabs} activeTab={activeDay} onTabChange={setActiveDay} />
      </View>

      <View style={styles.scheduleContainer}>
        {schedule.map((cls, index) => (
          <View key={cls.id} style={styles.scheduleItem}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{cls.startTime}</Text>
              <View style={styles.timeLine}>
                <View style={[styles.timeDot, { backgroundColor: cls.color }]} />
                {index < schedule.length - 1 && <View style={styles.timeConnector} />}
              </View>
            </View>
            <Card style={[styles.classCard, { borderLeftColor: cls.color }]}>
              <View style={styles.classHeader}>
                <Text style={styles.classSubject}>{cls.subject}</Text>
                <Badge label={cls.code} variant="muted" />
              </View>
              <View style={styles.classDetails}>
                <View style={styles.classDetail}>
                  <Clock size={12} color={Colors.textSecondary} />
                  <Text style={styles.classDetailText}>
                    {cls.startTime} - {cls.endTime}
                  </Text>
                </View>
                <View style={styles.classDetail}>
                  <MapPin size={12} color={Colors.textSecondary} />
                  <Text style={styles.classDetailText}>{cls.room}</Text>
                </View>
              </View>
              <View style={styles.classInstructor}>
                <User size={12} color={Colors.textSecondary} />
                <Text style={styles.instructorText}>{cls.instructor}</Text>
              </View>
            </Card>
          </View>
        ))}
      </View>

      <SectionHeader
        title="Upcoming Deadlines"
        actionLabel="View All"
        onAction={() => router.push('/assignments')}
      />
      {upcomingDeadlines.map((assignment) => (
        <Card key={assignment.id} style={styles.deadlineCard}>
          <View style={styles.deadlineHeader}>
            <Badge
              label={assignment.priority}
              variant={
                assignment.priority === 'high'
                  ? 'error'
                  : assignment.priority === 'medium'
                  ? 'warning'
                  : 'muted'
              }
            />
            <Text style={styles.deadlineDate}>{assignment.dueDate}</Text>
          </View>
          <Text style={styles.deadlineTitle}>{assignment.title}</Text>
          <View style={styles.deadlineCourse}>
            <BookOpen size={12} color={Colors.textSecondary} />
            <Text style={styles.deadlineCourseText}>
              {assignment.course} ({assignment.courseCode})
            </Text>
          </View>
        </Card>
      ))}

      <SectionHeader title="Recent Grades" />
      <Card style={styles.gradesCard}>
        {grades.courses.slice(0, 3).map((course, index) => (
          <View
            key={course.code}
            style={[
              styles.gradeRow,
              index < grades.courses.length - 1 && styles.gradeRowBorder,
            ]}
          >
            <View style={styles.gradeInfo}>
              <Text style={styles.gradeCourseName}>{course.name}</Text>
              <Text style={styles.gradeCourseCode}>{course.code}</Text>
            </View>
            <View style={styles.gradeValue}>
              <Text style={styles.gradeText}>{course.grade}</Text>
              <Text style={styles.gradeCredits}>{course.credits} credits</Text>
            </View>
          </View>
        ))}
        <Pressable
          style={styles.viewAllGrades}
          onPress={() => router.push('/grades')}
        >
          <Text style={styles.viewAllText}>View All Grades</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </Pressable>
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
  statsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500' as const,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  quickLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  quickLinkBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  quickLinkBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  tabContainer: {
    marginBottom: 16,
  },
  scheduleContainer: {
    marginBottom: 24,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  timeLine: {
    alignItems: 'center',
    flex: 1,
  },
  timeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timeConnector: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  classCard: {
    flex: 1,
    borderLeftWidth: 4,
    marginLeft: 8,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classSubject: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
    flex: 1,
  },
  classDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  classDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classDetailText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  classInstructor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deadlineCard: {
    marginBottom: 12,
  },
  deadlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deadlineDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  deadlineTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  deadlineCourse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadlineCourseText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  gradesCard: {
    marginBottom: 20,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  gradeRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeCourseName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  gradeCourseCode: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  gradeValue: {
    alignItems: 'flex-end',
  },
  gradeText: {
    fontSize: 18,
    fontWeight: '800' as const,
    color: Colors.success,
  },
  gradeCredits: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  viewAllGrades: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  bottomSpacer: {
    height: 20,
  },
});
