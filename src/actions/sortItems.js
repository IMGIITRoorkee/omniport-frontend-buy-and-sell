import { SORT_ITEMS } from '../constants/action-types';

export const sortItems = (items) => {
    return {
        type: SORT_ITEMS,
        payload: items
      }
}