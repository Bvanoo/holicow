import type { Component } from 'vue'

export interface ColumnDefinition<T extends object> {
  key: keyof T
  label: string
  icon?: Component
}

export interface BaseRow {
  id?: string | number
  title?: string
}
