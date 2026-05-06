import { type Business } from '@/shared/types/business';

export const agentCategories = [
  'Business',
  'Health', 
  'Finance',
  'Productivity',
  'Administration',
  'Sales',
  'Customer Support',
  'Content',
  'Social',
  'Legal',
  'Education',
  'Entertainment',
  'Gaming',
  'Other'
] as const;

export const agentKinds = [
  'Assistant',
  'Analyzer',
  'Automation',
  'Generator',
  'Classifier',
  'Translator',
  'Summarizer',
  'Other'
] as const;

export const installerTypes = [
  'docker',
  'bash',
  'n8n',
  'helm',
  'kubernetes',
  'npm',
  'pip',
  'manual'
] as const;

export const validateBusinessData = (data: Partial<Business>): string[] => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Business name is required');
  }

  if (!data.type) {
    errors.push('Business type is required');
  }

  if (!data.email?.trim()) {
    errors.push('Business email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone?.trim()) {
    errors.push('Business phone is required');
  }

  if (!data.city?.trim()) {
    errors.push('City is required');
  }

  if (!data.province?.trim()) {
    errors.push('Province is required');
  }

  if (!data.country?.trim()) {
    errors.push('Country is required');
  }

  if (data.summary && data.summary.length > 50) {
    errors.push('Summary must be 50 characters or less');
  }

  return errors;
};

export const getDefaultBusinessData = (userEmail?: string): Partial<Business> => ({
  name: '',
  type: 'Services',
  email: userEmail || '',
  phone: '',
  address: '',
  city: '',
  province: '',
  country: 'Colombia',
  summary: '',
  description: '',
  website: '',
  nid: '',
  taxId: '',
});