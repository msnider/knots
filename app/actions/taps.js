// @flow
import axios from 'axios';

const baseUrl = 'http://localhost:4321';

export const TAPS_LOADING = 'TAPS_LOADING';
export const UPDATE_TAPS = 'UPDATE_TAPS';
export const UPDATE_TAP_FIELDS = 'UPDATE_TAP_FIELDS';
export const UPDATE_TAP_FIELD = 'UPDATE_TAP_FIELD';
export const SCHEMA_RECEIVED = 'SCHEMA_RECEIVED';
export const UPDATE_SCHEMA_FIELD = 'UPDATE_SCHEMA_FIELD';
export const SCHEMA_UPDATED = 'SCHEMA_UPDATED';

type actionType = {
  +type: string
};

export function fetchTaps() {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: TAPS_LOADING
    });

    axios
      .get(`${baseUrl}/taps/`)
      .then((response) =>
        dispatch({
          type: UPDATE_TAPS,
          taps: response.data.taps,
          error: response.data.error
        })
      )
      .catch((error) =>
        dispatch({
          type: UPDATE_TAPS,
          taps: [],
          error
        })
      );
  };
}

export function selectTap(tap: string, version: string) {
  return (dispatch: (action: actionType) => void) => {
    console.log('Called');
    dispatch({
      type: TAPS_LOADING
    });

    axios
      .post(`${baseUrl}/taps/`, {
        tap,
        version
      })
      .then((response) =>
        dispatch({
          type: UPDATE_TAP_FIELDS,
          tapFields: response.data.config,
          error: response.data.error
        })
      )
      .catch((error) =>
        dispatch({
          type: UPDATE_TAP_FIELDS,
          tapFields: [],
          error
        })
      );
  };
}

export function updateTapField(key: string, value: string) {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: UPDATE_TAP_FIELD,
      key,
      value
    });
  };
}

export function submitConfig(config: {}) {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: TAPS_LOADING
    });
    axios
      .post(`${baseUrl}/tap/schema/`, {
        config
      })
      .then((response) => {
        dispatch({
          type: SCHEMA_RECEIVED,
          schema: response.data.schema,
          error: response.data.error
        });
      })
      .catch((error) => {
        dispatch({
          type: SCHEMA_RECEIVED,
          schema: [],
          error
        });
      });
  };
}

export function editSchemaField(field: string, index: string, value: string) {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: UPDATE_SCHEMA_FIELD,
      field,
      index,
      value
    });
  };
}

export function submitSchema(schema: {}) {
  return (dispatch: (action: actionType) => void) => {
    dispatch({
      type: TAPS_LOADING
    });
    axios
      .put(`${baseUrl}/schema/`, {
        streams: schema
      })
      .then(() => {
        dispatch({
          type: SCHEMA_UPDATED
        });
      })
      .catch((error) => {
        dispatch({
          type: SCHEMA_UPDATED,
          error
        });
      });
  };
}
