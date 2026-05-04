'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      const keys = Array.isArray(action.keysToRemove)
        ? action.keysToRemove
        : [];

      for (const key of keys) {
        delete newState[key];
      }

      currentState = newState;
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
