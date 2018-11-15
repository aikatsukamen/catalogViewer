import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_LIST,
  successList,
  failureList,
  applyLoadData,
  SAVE_DATA,
  SEARCH_CIRCLE,
  SEARCH_KKT,
  applySearchList,
  openNotify,
  closeNotify,
  SEARCH_TO_FAVORITE,
  changeFavoriteId,
  changeSearchToFavoriteId,
  LOGIN,
  loginDone,
  SYNC_LOAD,
  SYNC_SAVE,
  CHANGE_FAVORITE_ID,
  LOGOUT,
  logoutDone
} from '../actions';
import API from '../api';

/**
 * サークル情報、配置図を取得
 */
function* handleGetList() {
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
    yield call(handleSave);

    yield put(closeNotify());
    yield put(openNotify({ message: '取得完了しました。', variant: 'success' }));
  } catch (error) {
    yield put(closeNotify());
    yield put(openNotify({ message: 'なんかエラーになりました', variant: 'error' }));
    yield put(failureList({ error }));
  }
}

// ローカルストレージからstateに読み込む
function* handleLoadLocalStorage() {
  const data = localStorage.getItem('data');
  if (data) {
    const payload = JSON.parse(data);
    yield put(applyLoadData(payload));
  }
}

// stateからローカルストレージに書き込む
function* handleSave() {
  try {
    const state = yield select();
    const saveData = {
      map: state.reducer.map,
      circleInfo: state.reducer.circleInfo,
      favorite: state.reducer.favorite,
      purchase: state.reducer.purchase,
      login: state.reducer.login
    };
    localStorage.setItem('data', JSON.stringify(saveData));
  } catch (e) {
    // 特に何もしない
  }
}

/**
 * 検索ワードを元に、サークルを検索
 * @param {*} action
 */
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
  yield put(applySearchList(searchResult));
}

/**
 * KKTのサークルを検索
 */
function* handleSearchKkt() {
  const state = yield select();
  const searchResult = [];

  for (const circle of state.reducer.circleInfo) {
    try {
      if (circle.kktId !== '') searchResult.push(circle.spaceNo);
    } catch (e) {
      console.log(e);
      console.log(circle);
    }
  }

  // 検索結果を反映
  yield put(applySearchList(searchResult));
}

/**
 * 検索結果をまとめてお気に入り
 * @param {*} action
 */
function* handleSearchToFavorite(action) {
  const state = yield select();
  const id = action.payload;

  for (const spaceNo of state.reducer.searchResult) {
    yield put(changeFavoriteId({ spaceNo, id }));
  }

  // localstorageに保存
  yield call(handleSave);
  yield put(changeSearchToFavoriteId(id));
}

/**
 * 初期処理
 */
function* initialProcess() {
  const state = yield select();
  if (state.reducer.circleInfo.length === 0) {
    yield call(handleGetList);
  }
}

/**
 * ログイン、新規登録
 * @param {object} action
 */
function* handleLogin(action) {
  const { loginType, user, pass } = action.payload;
  const state = yield select();

  try {
    switch (loginType) {
      case 'regist': {
        // ユーザの存在チェック
        yield put(closeNotify());
        yield put(openNotify({ message: '登録可能なユーザかチェックしています。', variant: 'info' }));
        const checkResult = yield call(API.checkExistUser, user, state.reducer.eventName);
        if (checkResult.error) throw checkResult.error;

        // 登録API叩く
        yield call(handleSyncSave());
        break;
      }
      case 'login': {
        // データを取得する
        yield put(closeNotify());
        yield put(openNotify({ message: 'ログインしています・・・', variant: 'info' }));
        const getResult = yield call(API.getUserData, user, state.reducer.eventName, pass);
        if (getResult.error) throw getResult.error;

        // ログインだけするので、stateへの反映はここではしない
        yield put(loginDone({ user: action.payload.user, pass: action.payload.pass }));

        yield put(closeNotify());
        yield put(openNotify({ message: 'ログインしました。', variant: 'success' }));
        break;
      }
      default:
        break;
    }
    // localstorageに保存
    yield call(handleSave);
  } catch (e) {
    yield put(closeNotify());
    console.log(e);
    const message = e.error || e.message;
    yield put(openNotify({ message: message, variant: 'error' }));
  }
}

/**
 * サーバからロード
 */
function* handleSyncLoad() {
  const state = yield select();
  try {
    yield put(closeNotify());
    yield put(openNotify({ message: 'サーバからデータをダウンロードしています。', variant: 'info' }));
    const getResult = yield call(API.getUserData, state.reducer.login.user, state.reducer.eventName, state.reducer.login.pass);
    if (getResult.error) throw getResult.error;
    console.log(getResult.data);

    yield put(applyLoadData(getResult.data));
    yield call(handleSave);
    yield put(closeNotify());
    yield put(openNotify({ message: 'ダウンロード完了', variant: 'success' }));
  } catch (e) {
    yield put(closeNotify());
    console.log(e);
    const message = e.error || e.message;
    yield put(openNotify({ message: message, variant: 'error' }));
  }
}

/**
 * サーバにセーブ
 */
function* handleSyncSave() {
  const state = yield select();
  try {
    yield put(closeNotify());
    yield put(openNotify({ message: 'サーバにデータをアップロードしています', variant: 'info' }));
    const saveData = JSON.stringify({
      favorite: state.reducer.favorite
    });
    const saveResult = yield call(API.saveData, state.reducer.login.user, state.reducer.eventName, state.reducer.login.pass, saveData);
    if (saveResult.error) throw saveResult.error;

    yield put(closeNotify());
    yield put(openNotify({ message: 'アップロード完了', variant: 'success' }));
  } catch (e) {
    yield put(closeNotify());
    console.log(e);
    const message = e.error || e.message;
    yield put(openNotify({ message: message, variant: 'error' }));
  }
}

/**
 * お気に入り処理
 * ※Reducerも発火してる
 */
function* handleChangeFavarite(action) {
  yield call(handleSave);
}

function* handleLogout() {
  if (window.confirm('ログアウトしますか？')) {
    yield put(logoutDone());
    yield call(handleSave);

    yield put(closeNotify());
    yield put(openNotify({ message: 'ログアウトしました。', variant: 'info' }));
  }
}

export default function* rootSaga() {
  yield call(handleLoadLocalStorage);
  yield takeEvery(REQUEST_LIST, handleGetList);
  yield takeEvery(SAVE_DATA, handleSave);
  yield takeEvery(SEARCH_CIRCLE, handleSearchCircle);
  yield takeEvery(SEARCH_KKT, handleSearchKkt);
  yield takeEvery(SEARCH_TO_FAVORITE, handleSearchToFavorite);
  yield takeEvery(LOGIN, handleLogin);
  yield takeEvery(LOGOUT, handleLogout);
  yield takeEvery(SYNC_LOAD, handleSyncLoad);
  yield takeEvery(SYNC_SAVE, handleSyncSave);

  yield takeEvery(CHANGE_FAVORITE_ID, handleChangeFavarite);
  yield call(initialProcess);
}
