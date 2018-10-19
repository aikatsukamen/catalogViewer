import { call, put, fork, take, select, takeEvery } from 'redux-saga/effects';
import { REQUEST_LIST, successList, failureList, applyLoadData, SAVE_DATA, SEARCH_CIRCLE, applySearchList } from '../actions';
import API from '../api';

function* handleGetList(action) {
  try {
    const mapResult = yield call(API.getCicleMap);
    if (mapResult.error) throw mapResult.error;
    const circleInfoResult = yield call(API.getCicleInfo);
    if (circleInfoResult.error) throw circleInfoResult.error;

    yield put(successList({ map: mapResult.data, circleInfo: circleInfoResult.data }));
  } catch (error) {
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
  const state = yield select();
  localStorage.setItem('data', JSON.stringify(state.reducer));
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
