import type { IconProps } from '@tabler/icons-react';
import type React from 'react';

export type Feature = {
  title: string;
  Icon: React.ComponentType<IconProps>;
  bg: string;
  color: string;
  description: string;
};

export type Step = {
  label: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  image: string;
  role: string;
};
