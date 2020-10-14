/*
 *
 * Tasks actions
 *
 */

import {
  REFRESH_TASKS,
  REFRESH_TASKS_FAIL,
  REFRESH_TASKS_SUCCESS,
  RESET_TASKS,
} from './constants';

export function resetTasks() {
  return {
    type: RESET_TASKS,
  };
}

export function refreshTasks() {
  return {
    type: REFRESH_TASKS,
  };
}

export function refreshTasksSuccess(tasks) {
  return {
    type: REFRESH_TASKS_SUCCESS,
    total: tasks.total,
    tasks: tasks.tasks,
    nextCursor: tasks.nextCursor,
    previousCursor: tasks.previousCursor,
  };
}

export function refreshTasksFail(err) {
  return {
    type: REFRESH_TASKS_FAIL,
    error: err,
  };
}
