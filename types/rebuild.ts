export interface BuildStatus {
  id: string
  status: 'running' | 'success' | 'failed'
  startedAt: string
  completedAt?: string
  message?: string
  error?: string
  logs?: string[]
}