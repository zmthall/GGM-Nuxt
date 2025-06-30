import type { RecaptchaServerResponse } from "../../models/Recaptcha"

export const useRecaptcha = () => {
  const config = useRuntimeConfig()
  const recaptchaStore = useRecaptchaStore()

  interface WindowWithRecaptcha extends Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }

  const executeRecaptcha = async (action: string, timeout: number = 10000): Promise<string> => {
    return Promise.race([
      new Promise<string>((resolve, reject) => {
        const win = window as WindowWithRecaptcha
        const siteKey = config.public.recaptchaSiteKey as string
        
        if (typeof window === 'undefined' || !win.grecaptcha) {
          reject(new Error('ReCAPTCHA not loaded'))
          return
        }

        win.grecaptcha.ready(() => {
          win.grecaptcha!.execute(siteKey, { action })
            .then((token: string) => {
              resolve(token)
            })
            .catch(reject)
        })
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('ReCAPTCHA timeout')), timeout)
      )
    ])
  }

  const verifyWithServer = async (token: string): Promise<RecaptchaServerResponse> => {
    try {
      const response = await $fetch<RecaptchaServerResponse>('/api/recaptcha/verify', {
        baseURL: 'https://api.goldengatemanor.com/',
        method: 'POST',
        body: { token }
      })
      return response
    } catch (error) {
      console.error('Server verification failed:', error)
      throw error
    }
  }

  return {
    executeRecaptcha,
    verifyWithServer,
    loadRecaptcha: recaptchaStore.loadRecaptcha,
    unloadRecaptcha: recaptchaStore.unloadRecaptcha,
  }
}