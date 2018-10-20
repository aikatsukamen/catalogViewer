import { createAction } from 'redux-actions';
// リストの取得
export const REQUEST_LIST = 'REQUEST_LIST';
export const SUCCESS_LIST = 'SUCCESS_LIST';
export const FAILURE_LIST = 'FAILURE_LIST';
export const requestList = createAction(REQUEST_LIST);
export const successList = createAction(SUCCESS_LIST);
export const failureList = createAction(FAILURE_LIST);

// ナビゲーションの選択
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const changeView = createAction(CHANGE_VIEW);

// localStorageからデータのセーブとロード
export const LOAD_DATA = 'LOAD_DATA';
export const loadData = createAction(LOAD_DATA);
export const APPLY_LOAD_DATA = 'APPLY_LOAD_DATA';
export const applyLoadData = createAction(APPLY_LOAD_DATA);
export const SAVE_DATA = 'SAVE_DATA';
export const saveData = createAction(SAVE_DATA);

// サークル詳細の表示、非表示
export const SHOW_CIRCLE_DETAIL = 'SHOW_CIRCLE_DETAIL';
export const showCircleDetail = createAction(SHOW_CIRCLE_DETAIL);
export const CLOSE_CIRCLE_DETAIL = 'CLOSE_CIRCLE_DETAIL';
export const closeCircleDetail = createAction(CLOSE_CIRCLE_DETAIL);

// お気に入り変更
export const CHANGE_FAVORITE_ID = 'CHANGE_FAVORITE_ID';
export const changeFavoriteId = createAction(CHANGE_FAVORITE_ID);
export const DELETE_FAVORITE_CIRCLE = 'DELETE_FAVORITE_CIRCLE';
export const deleteFavoriteCircle = createAction(DELETE_FAVORITE_CIRCLE);

// サークル検索
export const SEARCH_CIRCLE = 'SEARCH_CIRCLE';
export const searchCircle = createAction(SEARCH_CIRCLE);
export const APPLY_SEARCH_LIST = 'APPLY_SEARCH_LIST';
export const applySearchList = createAction(APPLY_SEARCH_LIST);

// 通知欄表示
export const OPEN_NOTIFY = 'OPEN_NOTIFY';
export const openNotify = createAction(OPEN_NOTIFY);
export const CLOSE_NOTIFY = 'CLOSE_NOTIFY';
export const closeNotify = createAction(CLOSE_NOTIFY);
