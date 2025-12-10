import axios, { AxiosError, type AxiosInstance } from 'axios'
import { type IRepositoryStrategy, type StrategyResponse } from './IRepositoryStrategy'

export class AxiosTransport implements IRepositoryStrategy {
  private client: AxiosInstance

  constructor(baseURL: string, config: Record<string, unknown> = {}) {
    this.client = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
      ...config,
    })

    // Exemple : interceptor (optionnel)
    this.client.interceptors.response.use(
      (res) => res,
      (err: AxiosError) => {
        // on laisse handleError() gérer ensuite
        return Promise.reject(err)
      },
    )
  }

  async request<T>(
    path: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: unknown
      params?: Record<string, string>
    },
  ): Promise<StrategyResponse<T>> {
    try {
      const res = await this.client.request<T>({
        url: path,
        method: options?.method ?? 'GET',
        data: options?.body,
        params: options?.params,
      })
      console.log("RESULT ::" , await res.data)
      return { success: true, data: res.data }
    } catch (err) {
      return this.handleError<T>(err)
    }
  }

  // Axios ne gère pas nativement les subscriptions (poussées/temps réel)
  // → on ne l'implémente pas ici
  subscribe?(): { unsubscribe(): void } {
    throw new Error('AxiosTransport does not support subscriptions')
  }

  private handleError<T>(err: unknown): StrategyResponse<T> {
    if (axios.isAxiosError(err)) {
      const ax = err as AxiosError

      const message =
        ax.response?.data && typeof ax.response.data === 'string'
          ? ax.response.data
          : ax.response?.status
            ? `HTTP ${ax.response.status}`
            : ax.message

      return { success: false, error: message }
    }

    return { success: false, error: (err as Error).message ?? String(err) }
  }
}
