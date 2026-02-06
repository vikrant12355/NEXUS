import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {
  Mail,
  MailOpen,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
} from 'lucide-react-native';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { generateObject } from '@rork-ai/toolkit-sdk';
import Colors from '@/constants/colors';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { emails } from '@/mocks/dashboard';
import { Email, EmailSummary } from '@/types';

const emailSummarySchema = z.object({
  summary: z.string().describe('A concise 2-3 sentence summary of the email'),
  actionItems: z.array(z.string()).describe('List of action items the student needs to take'),
  deadline: z.string().optional().describe('Any deadline mentioned in ISO format'),
  priority: z.enum(['low', 'medium', 'high']).describe('Priority level based on content'),
  category: z.string().describe('Category like Academic, Placement, Library, Sports, etc'),
});

export default function EmailsScreen() {
  const [summaries, setSummaries] = useState<Record<string, EmailSummary>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const summarizeMutation = useMutation({
    mutationFn: async (email: Email) => {
      console.log('Summarizing email:', email.subject);
      const result = await generateObject({
        messages: [
          {
            role: 'user',
            content: `Analyze this college email and extract key information:

From: ${email.from}
Subject: ${email.subject}
Body: ${email.body}

Please provide a summary, action items, any deadlines, priority level, and category.`,
          },
        ],
        schema: emailSummarySchema,
      });
      return { emailId: email.id, summary: result };
    },
    onSuccess: ({ emailId, summary }) => {
      console.log('Summary generated for email:', emailId);
      setSummaries((prev) => ({ ...prev, [emailId]: summary }));
    },
    onError: (error) => {
      console.error('Error summarizing email:', error);
    },
  });

  const handleSummarize = (email: Email) => {
    if (!summaries[email.id]) {
      summarizeMutation.mutate(email);
    }
    setExpandedId(expandedId === email.id ? null : email.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return Colors.error;
      case 'medium':
        return Colors.warning;
      default:
        return Colors.textSecondary;
    }
  };

  const getPriorityVariant = (priority: string): 'error' | 'warning' | 'muted' => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'muted';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.aiHeader}>
        <View style={styles.aiIconContainer}>
          <Sparkles size={20} color={Colors.primary} />
        </View>
        <View style={styles.aiHeaderText}>
          <Text style={styles.aiTitle}>AI-Powered Summaries</Text>
          <Text style={styles.aiSubtitle}>
            Tap any email to get instant AI summary with action items
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {emails.map((email) => {
          const isExpanded = expandedId === email.id;
          const summary = summaries[email.id];
          const isLoading =
            summarizeMutation.isPending &&
            summarizeMutation.variables?.id === email.id;

          return (
            <Card key={email.id} style={styles.emailCard}>
              <Pressable
                onPress={() => handleSummarize(email)}
                style={styles.emailHeader}
              >
                <View style={styles.emailIconContainer}>
                  {email.isRead ? (
                    <MailOpen size={20} color={Colors.textSecondary} />
                  ) : (
                    <Mail size={20} color={Colors.primary} />
                  )}
                </View>
                <View style={styles.emailContent}>
                  <View style={styles.emailTitleRow}>
                    <Text
                      style={[
                        styles.emailFrom,
                        !email.isRead && styles.unreadText,
                      ]}
                      numberOfLines={1}
                    >
                      {email.from}
                    </Text>
                    <Badge
                      label={email.priority}
                      variant={getPriorityVariant(email.priority)}
                    />
                  </View>
                  <Text
                    style={[
                      styles.emailSubject,
                      !email.isRead && styles.unreadText,
                    ]}
                    numberOfLines={2}
                  >
                    {email.subject}
                  </Text>
                  <Text style={styles.emailDate}>{email.date}</Text>
                </View>
                <ChevronRight
                  size={20}
                  color={Colors.textMuted}
                  style={{
                    transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
                  }}
                />
              </Pressable>

              {isExpanded && (
                <View style={styles.summaryContainer}>
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color={Colors.primary} />
                      <Text style={styles.loadingText}>
                        AI is analyzing this email...
                      </Text>
                    </View>
                  ) : summary ? (
                    <>
                      <View style={styles.summaryHeader}>
                        <Sparkles size={16} color={Colors.primary} />
                        <Text style={styles.summaryTitle}>AI Summary</Text>
                        <Badge label={summary.category} variant="info" />
                      </View>

                      <Text style={styles.summaryText}>{summary.summary}</Text>

                      {summary.actionItems.length > 0 && (
                        <View style={styles.actionItemsContainer}>
                          <Text style={styles.actionItemsTitle}>
                            Action Items:
                          </Text>
                          {summary.actionItems.map((item, index) => (
                            <View key={index} style={styles.actionItem}>
                              <CheckCircle size={14} color={Colors.success} />
                              <Text style={styles.actionItemText}>{item}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {summary.deadline && (
                        <View style={styles.deadlineContainer}>
                          <Clock size={14} color={Colors.warning} />
                          <Text style={styles.deadlineText}>
                            Deadline: {summary.deadline}
                          </Text>
                        </View>
                      )}

                      <View style={styles.priorityContainer}>
                        <AlertTriangle
                          size={14}
                          color={getPriorityColor(summary.priority)}
                        />
                        <Text
                          style={[
                            styles.priorityText,
                            { color: getPriorityColor(summary.priority) },
                          ]}
                        >
                          {summary.priority.toUpperCase()} PRIORITY
                        </Text>
                      </View>
                    </>
                  ) : null}
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: `${Colors.primary}10`,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  aiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiHeaderText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  aiSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  emailCard: {
    padding: 0,
    overflow: 'hidden',
  },
  emailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  emailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailContent: {
    flex: 1,
  },
  emailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  emailFrom: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    color: Colors.text,
    fontWeight: '600' as const,
  },
  emailSubject: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  emailDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.primary,
    flex: 1,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  actionItemsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  actionItemsTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  actionItemText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: `${Colors.warning}15`,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  deadlineText: {
    fontSize: 13,
    color: Colors.warning,
    fontWeight: '600' as const,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
});
