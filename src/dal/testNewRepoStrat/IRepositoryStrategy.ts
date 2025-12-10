// réponse générique
export type StrategyResponse<T> = { success: true; data: T } | { success: false; error: string }

// stratégie (transport) générique
export interface IRepositoryStrategy {
  // 1er strategy : requête typée GET/POST/PUT/DELETE générique — retourne TransportResponse<T>
  request<T>(
    path: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: unknown
      params?: Record<string, string>
    },
  ): Promise<StrategyResponse<T>>

  // 2eme strategy (optionnel) : abonnement (pour websocket / push)
  subscribe?<T>(path: string, onData: (data: T) => void): { unsubscribe(): void }
}
