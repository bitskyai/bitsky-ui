/*
 *
 * Intelligences actions
 *
 */

import { RESET_INTELLIGENCES, REFRESH_INTELLIGENCES, REFRESH_INTELLIGENCES_FAIL, REFRESH_INTELLIGENCES_SUCCESS } from './constants';

export function resetIntelligences(){
  return {
    type: RESET_INTELLIGENCES,
  };
}

export function refreshIntelligences() {
  return {
    type: REFRESH_INTELLIGENCES,
  };
}

export function refreshIntelligencesSuccess(intelligences) {
  return {
    type: REFRESH_INTELLIGENCES_SUCCESS,
    total: intelligences.total,
    intelligences: intelligences.intelligences,
    nextCursor: intelligences.nextCursor,
    previousCursor: intelligences.previousCursor
  };
}

export function refreshIntelligencesFail(err) {
  return {
    type: REFRESH_INTELLIGENCES_FAIL,
    error: err
  };
}
