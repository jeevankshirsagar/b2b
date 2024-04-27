import Errors from "components/admin/FormItems/error/errors";
import axios from "axios";

async function list() {
  const response = await axios.get(`/blogs`);
  return response.data;
}

const actions = {
  doAdd: (product) => async (dispatch) => {
    dispatch({
      type: "BLOGS_LIST_DO_ADD",
      payload: {product}
    });
  },

  doFetch: (filter, keepPagination = false) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "BLOGS_LIST_FETCH_STARTED",
        payload: { filter, keepPagination },
      });

      const response = await list();

      dispatch({
        type: "BLOGS_LIST_FETCH_SUCCESS",
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "BLOGS_LIST_FETCH_ERROR",
      });
    }
  },

  doDelete: (id) => async (dispatch) => {
    try {
      dispatch({
        type: "BLOGS_LIST_DELETE_STARTED",
      });

      await axios.delete(`/blogs/${id}`);

      dispatch({
        type: "BLOGS_LIST_DELETE_SUCCESS",
      });

      const response = await list();
      dispatch({
        type: "BLOGS_LIST_FETCH_SUCCESS",
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "BLOGS_LIST_DELETE_ERROR",
      });
    }
  },
  doOpenConfirm: (id) => async (dispatch) => {
    dispatch({
      type: "BLOGS_LIST_OPEN_CONFIRM",
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch) => {
    dispatch({
      type: "BLOGS_LIST_CLOSE_CONFIRM",
    });
  },
};

export default actions;
