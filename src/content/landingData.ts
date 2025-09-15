import {
  IconBell,
  IconChartPie,
  IconCreditCard,
  IconProgressCheck,
  IconReceipt,
  IconUsers,
} from '@tabler/icons-react';

import Boy from '../assets/boy.png';
import Man from '../assets/man.png';
import Gamer from '../assets/gamer.png';
import type { Feature, Step, Testimonial } from '@/types/staticDataTypes';

export const FEATURES: Feature[] = [
  {
    title: 'Group Expenses',
    Icon: IconUsers,
    bg: 'bg-orange-100',
    color: 'text-orange-600',
    description: 'Create groups for roommates, trips, or events to keep expenses organized.',
  },
  {
    title: 'Smart Settlements',
    Icon: IconCreditCard,
    bg: 'bg-teal-100',
    color: 'text-teal-600',
    description: 'Our algorithm minimises the number of payments when settling up.',
  },
  {
    title: 'Expense Analytics',
    Icon: IconChartPie,
    bg: 'bg-orange-100',
    color: 'text-orange-600',
    description: 'Track spending patterns and discover insights about your shared costs.',
  },
  {
    title: 'Payment Reminders',
    Icon: IconBell,
    bg: 'bg-amber-100',
    color: 'text-amber-600',
    description: 'Automated reminders for pending debts and insights on spending patterns.',
  },
  {
    title: 'Multiple Split Types',
    Icon: IconReceipt,
    bg: 'bg-orange-100',
    color: 'text-orange-600',
    description: 'Split equally, by percentage, or by exact amounts to fit any scenario.',
  },
  {
    title: 'Real‑time Updates',
    Icon: IconProgressCheck,
    bg: 'bg-teal-100',
    color: 'text-teal-600',
    description: 'See new expenses and repayments the moment your friends add them.',
  },
];

export const STEPS: Step[] = [
  {
    label: '1',
    title: 'Create or Join a Group',
    description: 'Start a group for your roommates, trip, or event and invite friends.',
  },
  {
    label: '2',
    title: 'Add Expenses',
    description: 'Record who paid and how the bill should be split amongst members.',
  },
  {
    label: '3',
    title: 'Settle Up',
    description: 'View who owes what and log payments when debts are cleared.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'JebCheck made splitting rent with my roommates so much easier. No more awkward conversations about who owes what!',
    name: 'Ananya Sharma',
    image: Man,
    role: 'College Student',
  },
  {
    quote:
      'I use JebCheck during every group trip. The smart settlement feature saves us from doing manual math at the end.',
    name: 'Rahul Verma',
    image: Gamer,
    role: 'Software Engineer',
  },
  {
    quote:
      "Our office team lunches used to be a nightmare to calculate. Now everyone just adds expenses in JebCheck and we're done!",
    name: 'Priya Nair',
    image: Boy,
    role: 'HR Manager',
  },
];
