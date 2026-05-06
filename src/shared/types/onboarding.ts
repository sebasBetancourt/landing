/**
 * Onboarding form and submission types
 */

export type OnboardingInputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'number'
  | 'radio'      // Multiple choice (single)
  | 'checkbox'   // Multiple choice (multiple)
  | 'dropdown'   // Dropdown (single)
  | 'date'
  | 'time'
  | 'scale';    // Linear scale (min–max)

export interface OnboardingQuestion {
  id: string;
  label: string;
  inputType: OnboardingInputType;
  maxLength: number;
  required: boolean;
  page: number;
  sortOrder: number;
  /** Options for radio, checkbox, dropdown (option labels) */
  options?: string[];
  /** Linear scale: minimum value (default 1) */
  scaleMin?: number;
  /** Linear scale: maximum value (default 5) */
  scaleMax?: number;
  /** Optional label for the minimum end (e.g. "Not at all") */
  scaleLabelMin?: string;
  /** Optional label for the maximum end (e.g. "Very much") */
  scaleLabelMax?: string;
}

/** Banner config for one onboarding page (optional per page) */
export interface OnboardingPageBanner {
  page: number;
  imageUrl: string;
  position?: 'top' | 'bottom';
  fit?: 'cover' | 'contain' | 'fill';
  altText?: string;
}

export interface OnboardingForm {
  id: number;
  title: string;
  questionsPerPage: number;
  questions: OnboardingQuestion[];
  pageBanners?: OnboardingPageBanner[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OnboardingFormUpdate {
  title?: string;
  questionsPerPage?: number;
  questions: OnboardingQuestion[];
  pageBanners?: OnboardingPageBanner[];
}

export interface OnboardingSubmission {
  id: number;
  formId: number;
  userId?: number;
  sessionId?: string;
  responses: Record<string, unknown>;
  createdAt: string;
}

export interface OnboardingSubmissionsResponse {
  items: OnboardingSubmission[];
  total: number;
  limit: number;
  offset: number;
}

export interface OnboardingSubmitPayload {
  formId: number;
  responses: Record<string, unknown>;
  sessionId?: string;
}

export interface BusinessOnboardingQuestion {
  id: string;
  label: string;
  inputType: "text" | "textarea" | "dropdown";
  placeholder?: string;
  required: boolean;
  options?: string[];
  maxLength?: number;
}

export interface BusinessOnboardingForm {
  title: string;
  description: string;
  questions: BusinessOnboardingQuestion[];
}

export interface BusinessOnboardingMetricsDay {
  date: string;
  start: number;
  continue: number;
  backToEdit: number;
  validationError: number;
  submitSuccess: number;
  submitError: number;
}

export interface BusinessOnboardingMetricsCount {
  event: string;
  count: number;
}

export interface BusinessOnboardingMetricsSummary {
  totalEvents: number;
  uniqueUsers: number;
  start: number;
  continue: number;
  backToEdit: number;
  validationError: number;
  submitSuccess: number;
  submitError: number;
  completionRatePct: number;
  dropOffAfterStartPct: number;
}

export interface BusinessOnboardingMetricsResponse {
  formType: string;
  days: number;
  fromDate: string;
  summary: BusinessOnboardingMetricsSummary;
  eventBreakdown: BusinessOnboardingMetricsCount[];
  daily: BusinessOnboardingMetricsDay[];
  topValidationFields: BusinessOnboardingMetricsCount[];
  eventSessionIdFilter: string;
}
