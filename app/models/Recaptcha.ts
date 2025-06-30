export interface RecaptchaServerResponse {
  success: boolean;
  data?: {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    valid: boolean;
  };
  message?: string;
}