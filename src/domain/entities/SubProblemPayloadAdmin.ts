import type Meta from './Meta'
import type SubProblemAdmin from './SubProblemAdmin'

export default interface SubProblemPayloadAdmin {
  data: SubProblemAdmin[]
  meta: Meta
}
