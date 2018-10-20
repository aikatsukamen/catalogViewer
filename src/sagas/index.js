import { call, put, fork, take, select, takeEvery } from 'redux-saga/effects';
import { REQUEST_LIST, successList, failureList, applyLoadData, SAVE_DATA, SEARCH_CIRCLE, applySearchList, openNotify, closeNotify } from '../actions';
import API from '../api';

function* handleGetList(action) {
  try {
    yield put(closeNotify());
    yield put(openNotify({ message: 'サークル配置を取得しています。', variant: 'info' }));
    const mapResult = yield call(API.getCicleMap);
    if (mapResult.error) throw mapResult.error;

    yield put(closeNotify());
    yield put(openNotify({ message: 'サークル情報を取得しています。', variant: 'info' }));
    const circleInfoResult = yield call(API.getCicleInfo);
    if (circleInfoResult.error) throw circleInfoResult.error;

    yield put(successList({ map: mapResult.data, circleInfo: circleInfoResult.data }));
    yield put(closeNotify());
    yield put(openNotify({ message: '取得完了しました。', variant: 'success' }));
  } catch (error) {
    yield put(closeNotify());
    yield put(openNotify({ message: 'なんかエラーになりました', variant: 'error' }));
    yield put(failureList({ error }));
  }
}

// ローカルストレージからstateに読み込む
function* handleLoad() {
  const data = localStorage.getItem('data');
  if (data) {
    const payload = JSON.parse(data);
    yield put(applyLoadData(payload));
  }
}

// stateからローカルストレージに書き込む
function* handleSave(action) {
  try {
    const state = yield select();
    localStorage.setItem('data', JSON.stringify(state.reducer));
    yield put(closeNotify());
    yield put(openNotify({ message: 'データを保存しました。', variant: 'success' }));
  } catch (e) {
    yield put(closeNotify());
    yield put(openNotify({ message: 'データ保存でエラーがありました。', variant: 'error' }));
  }
}

// 検索するよ
function* handleSearchCircle(action) {
  const state = yield select();
  const searchResult = [];

  const searchWord = action.payload;

  for (const circle of state.reducer.circleInfo) {
    let isHit = false;
    try {
      if (circle.genre.indexOf(searchWord) > -1) isHit = true;
      if (circle.person.indexOf(searchWord) > -1) isHit = true;
      if (circle.circleName.indexOf(searchWord) > -1) isHit = true;

      if (isHit) searchResult.push(circle.spaceNo);
    } catch (e) {
      console.log(e);
      console.log(circle);
    }
  }

  // 検索結果を反映
  yield put(applySearchList(searchResult));
}

export default function* rootSaga() {
  yield call(handleLoad);
  yield takeEvery(REQUEST_LIST, handleGetList);
  yield takeEvery(SAVE_DATA, handleSave);
  yield takeEvery(SEARCH_CIRCLE, handleSearchCircle);
  yield call(handleGetList);
}
