export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormState, string>>;