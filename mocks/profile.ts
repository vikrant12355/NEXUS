import { UserProfile } from '@/types';

export const userProfile: UserProfile = {
  id: '1',
  name: 'Arjun Patel',
  email: 'arjun.patel@university.edu',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  department: 'Computer Science & Engineering',
  year: '3rd Year',
  rollNumber: 'CSE21045',
  cgpa: 8.7,
  attendance: 87,
};

export const quickStats = [
  { label: 'CGPA', value: '8.7', icon: 'award' },
  { label: 'Attendance', value: '87%', icon: 'calendar-check' },
  { label: 'Credits', value: '98/160', icon: 'book' },
  { label: 'Semester', value: '6th', icon: 'graduation-cap' },
];

export const menuItems = [
  { id: '1', title: 'Edit Profile', icon: 'user', screen: 'edit-profile' },
  { id: '2', title: 'Notifications', icon: 'bell', screen: 'notifications' },
  { id: '3', title: 'Academic Records', icon: 'file-text', screen: 'records' },
  { id: '4', title: 'Fee Details', icon: 'credit-card', screen: 'fees' },
  { id: '5', title: 'Documents', icon: 'folder', screen: 'documents' },
  { id: '6', title: 'Help & Support', icon: 'help-circle', screen: 'support' },
  { id: '7', title: 'Settings', icon: 'settings', screen: 'settings' },
];
