import type Comment from "./Comment"
import type Alert from "@/domain/entities/Alert.ts";

export interface CommentPayload {
  data: Comment[]
  total: number
  page: number
  limit: number
  totalPages: number
}
