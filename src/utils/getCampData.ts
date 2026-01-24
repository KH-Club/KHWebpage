/**
 * @deprecated Use hooks from @/hooks instead
 * This file is kept for backwards compatibility but will be removed in a future version.
 * 
 * Use:
 * - useCamps() for getting all camps
 * - useCampDetail(campID) for getting a single camp
 * - getCampsData() for synchronous access to cached data
 * - getCampById(campID) for synchronous lookup
 */

export {
  getCampsData as getMainCampsData,
  getCampById as getMainCampsDataByCampID
} from "@/hooks/useCamps"
