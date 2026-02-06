import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar, CheckCircle, Clock, BookOpen } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import TabBar from '@/components/TabBar';
import { assignments } from '@/mocks/academics';

const tabs = [
  { key: 'pending', label: 'Pending' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'graded', label: 'Graded' },
];

export default function AssignmentsScreen() {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredAssignments = assignments.filter((a) => a.status === activeTab);

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Due today';
    if (diff === 1) return '1 day left';
    return `${diff} days left`;
  };

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
        {filteredAssignments.length === 0 ? (
          <Card style={styles.emptyCard}>
            <CheckCircle size={48} color={Colors.success} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyText}>
              No {activeTab} assignments at the moment
            </Text>
          </Card>
        ) : (
          filteredAssignments.map((assignment) => (
            <Card key={assignment.id} style={styles.assignmentCard}>
              <View style={styles.assignmentHeader}>
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
                {assignment.status === 'graded' && assignment.grade !== undefined && (
                  <View style={styles.gradeContainer}>
                    <Text style={styles.gradeText}>
                      {assignment.grade}/{assignment.maxGrade}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.assignmentTitle}>{assignment.title}</Text>

              <View style={styles.courseInfo}>
                <BookOpen size={14} color={Colors.textSecondary} />
                <Text style={styles.courseText}>
                  {assignment.course} ({assignment.courseCode})
                </Text>
              </View>

              <View style={styles.assignmentFooter}>
                <View style={styles.dateInfo}>
                  <Calendar size={14} color={Colors.textSecondary} />
                  <Text style={styles.dateText}>{assignment.dueDate}</Text>
                </View>
                {assignment.status === 'pending' && (
                  <View
                    style={[
                      styles.daysRemaining,
                      getDaysRemaining(assignment.dueDate) === 'Overdue' &&
                        styles.daysRemainingOverdue,
                    ]}
                  >
                    <Clock
                      size={12}
                      color={
                        getDaysRemaining(assignment.dueDate) === 'Overdue'
                          ? Colors.error
                          : Colors.warning
                      }
                    />
                    <Text
                      style={[
                        styles.daysRemainingText,
                        getDaysRemaining(assignment.dueDate) === 'Overdue' &&
                          styles.daysRemainingTextOverdue,
                      ]}
                    >
                      {getDaysRemaining(assignment.dueDate)}
                    </Text>
                  </View>
                )}
              </View>

              {assignment.status === 'pending' && (
                <Pressable style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Submit Assignment</Text>
                </Pressable>
              )}
            </Card>
          ))
        )}
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
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  assignmentCard: {
    gap: 12,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeContainer: {
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.success,
  },
  assignmentTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  daysRemaining: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.warning}15`,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  daysRemainingOverdue: {
    backgroundColor: `${Colors.error}15`,
  },
  daysRemainingText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.warning,
  },
  daysRemainingTextOverdue: {
    color: Colors.error,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
});
