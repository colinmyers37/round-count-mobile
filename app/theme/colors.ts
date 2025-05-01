export const colors = {
  // Primary colors
  primary: '#3B82F6',
  primaryLight: '#EFF6FF',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  
  // Background colors
  background: '#FFFFFF',
  cardBackground: '#F8FAFC',
  
  // Border colors
  border: '#E2E8F0',
  
  // Status colors
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
} as const;

export type ColorKey = keyof typeof colors; 