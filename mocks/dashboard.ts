import { MessMenuItem, Email, CampusAlert, Event } from '@/types';

export const messMenu: MessMenuItem[] = [
  {
    id: '1',
    name: 'Breakfast',
    type: 'breakfast',
    items: ['Idli Sambar', 'Poha', 'Bread Toast', 'Milk', 'Tea/Coffee'],
    time: '7:30 AM - 9:30 AM',
    isVeg: true,
  },
  {
    id: '2',
    name: 'Lunch',
    type: 'lunch',
    items: ['Rice', 'Dal Fry', 'Paneer Butter Masala', 'Roti', 'Salad', 'Curd'],
    time: '12:30 PM - 2:30 PM',
    isVeg: true,
  },
  {
    id: '3',
    name: 'Snacks',
    type: 'snacks',
    items: ['Samosa', 'Tea/Coffee', 'Biscuits'],
    time: '5:00 PM - 6:00 PM',
    isVeg: true,
  },
  {
    id: '4',
    name: 'Dinner',
    type: 'dinner',
    items: ['Jeera Rice', 'Chole', 'Mixed Veg', 'Chapati', 'Kheer'],
    time: '7:30 PM - 9:30 PM',
    isVeg: true,
  },
];

export const emails: Email[] = [
  {
    id: '1',
    from: 'Dean of Academics',
    subject: 'Important: Mid-Semester Examination Schedule Released',
    body: `Dear Students,

This is to inform you that the Mid-Semester Examination schedule for the current semester has been released. Please note the following important points:

1. Examinations will commence from February 15, 2026
2. All students must carry their ID cards to the examination hall
3. The detailed timetable is available on the student portal
4. Any clash in examination timings must be reported to the Academic Section by February 10, 2026
5. Students with medical emergencies should apply for makeup examinations through the proper channel

Please ensure you are well-prepared and follow all examination guidelines. Late arrivals will not be permitted after 15 minutes of the scheduled start time.

Best regards,
Dr. Sharma
Dean of Academics`,
    date: '2026-02-05',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    from: 'Placement Cell',
    subject: 'Pre-Placement Talk by Google - Register Now',
    body: `Dear Students,

We are delighted to announce that Google will be conducting a Pre-Placement Talk on our campus.

Event Details:
- Date: February 12, 2026
- Time: 3:00 PM - 5:00 PM
- Venue: Seminar Hall A
- Eligibility: B.Tech/M.Tech students (CS, IT, ECE branches)

Registration is mandatory. Please register through the placement portal by February 10, 2026. Limited seats available on first-come-first-serve basis.

What to bring:
- Updated resume (2 copies)
- College ID card
- Pen and notepad

Regards,
Training & Placement Cell`,
    date: '2026-02-04',
    isRead: false,
    priority: 'high',
  },
  {
    id: '3',
    from: 'Library Services',
    subject: 'Library Book Return Reminder',
    body: `Dear Student,

This is a gentle reminder that you have 3 books due for return:

1. "Introduction to Algorithms" - Due: Feb 8, 2026
2. "Database Management Systems" - Due: Feb 10, 2026
3. "Computer Networks" - Due: Feb 12, 2026

Please return or renew these books before the due date to avoid late fees (₹5 per day per book).

You can renew books online through the library portal if no other student has placed a hold.

Thank you for your cooperation.

Central Library`,
    date: '2026-02-03',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '4',
    from: 'Sports Committee',
    subject: 'Annual Sports Meet - Team Registration Open',
    body: `Hello Athletes!

The Annual Sports Meet 2026 is here! We invite all students to participate and showcase their sporting talents.

Events:
- Athletics (Track & Field)
- Basketball
- Volleyball
- Badminton
- Table Tennis
- Chess

Registration Deadline: February 20, 2026
Event Dates: March 1-5, 2026

Form teams of 5-10 members for team sports. Individual registration available for athletics and racquet sports.

Register at the Sports Office or through the student app.

Let's make this year's sports meet the best one yet!

Sports Committee`,
    date: '2026-02-02',
    isRead: true,
    priority: 'low',
  },
];

export const campusAlerts: CampusAlert[] = [
  {
    id: '1',
    title: 'Water Supply Disruption',
    description: 'Water supply will be interrupted from 10 AM to 2 PM tomorrow for maintenance.',
    type: 'warning',
    date: '2026-02-06',
    icon: 'droplet',
  },
  {
    id: '2',
    title: 'Guest Lecture',
    description: 'Prof. James from MIT will deliver a lecture on AI Ethics at 4 PM.',
    type: 'event',
    date: '2026-02-06',
    icon: 'mic',
  },
  {
    id: '3',
    title: 'Fee Payment Deadline',
    description: 'Last date for semester fee payment is February 15, 2026.',
    type: 'urgent',
    date: '2026-02-06',
    icon: 'alert-circle',
  },
];

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Fest 2026',
    description: 'Annual technical festival with workshops, competitions, and guest speakers.',
    date: '2026-02-20',
    time: '9:00 AM',
    location: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizer: 'Technical Society',
    attendees: 450,
    category: 'Technical',
  },
  {
    id: '2',
    title: 'Cultural Night',
    description: 'A night of music, dance, and drama performances by students.',
    date: '2026-02-25',
    time: '6:00 PM',
    location: 'Open Air Theatre',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    organizer: 'Cultural Committee',
    attendees: 800,
    category: 'Cultural',
  },
];