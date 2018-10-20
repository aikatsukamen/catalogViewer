import { combineReducers } from 'redux';
import { OPEN_NOTIFY, CLOSE_NOTIFY, REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST, SHOW_CIRCLE_DETAIL, CLOSE_CIRCLE_DETAIL, CHANGE_FAVORITE_ID, DELETE_FAVORITE_CIRCLE, APPLY_SEARCH_LIST, APPLY_LOAD_DATA } from '../actions';

const initial = {
  status: 'init',
  error: false,
  // サークル配置
  map: [],
  // サークル情報
  circleInfo: [],
  // お気に入りリスト
  favorite: [
    {
      id: '0',
      name: 'Cute',
      color: 'pink',
      spaceNo: []
    },
    { id: '1', name: 'Cool', color: 'lightBlue', spaceNo: [] },
    { id: '2', name: 'Sexy', color: '#ba68c8', spaceNo: [] },
    { id: '3', name: 'Pop', color: 'yellow', spaceNo: [] }
  ],
  // お気に入り検索結果
  searchResult: [],
  // 詳細表示
  detailCircle: {
    open: false,
    circleInfo: {}
  },
  // 購入リスト
  purchase: [],
  // 通知欄
  notify: {
    open: false,
    type: 'info',
    message: ''
  }
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case REQUEST_LIST: {
      return { ...state, status: 'loading', error: false };
    }
    case SUCCESS_LIST: {
      return { ...state, status: 'done', error: false, circleInfo: action.payload.circleInfo, map: action.payload.map };
    }
    case FAILURE_LIST: {
      return { ...state, status: 'done', error: true };
    }
    case APPLY_LOAD_DATA: {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }
    case SHOW_CIRCLE_DETAIL: {
      const matchedCircle = state.circleInfo.filter(circle => {
        return circle.spaceNo.indexOf(action.payload) > -1;
      });

      if (matchedCircle.length !== 0) {
        return { ...state, detailCircle: { open: true, circleInfo: matchedCircle[0] } };
      } else {
        return state;
      }
    }
    case CLOSE_CIRCLE_DETAIL: {
      return { ...state, detailCircle: { open: false, circleInfo: {} } };
    }
    // お気に入り更新
    case CHANGE_FAVORITE_ID: {
      const spaceNo = action.payload.spaceNo;
      const favId = action.payload.id;
      let newFavorite = [...state.favorite];
      // まずは既存のお気に入りから削除
      for (let i = 0; i < newFavorite.length; i++) {
        newFavorite[i].spaceNo.some((value, index) => {
          if (value === spaceNo) newFavorite[i].spaceNo.splice(index, 1);
        });
      }

      // IDが合致するお気に入りに追加
      for (let i = 0; i < newFavorite.length; i++) {
        if (newFavorite[i].id === favId) {
          newFavorite[i].spaceNo.push(spaceNo);
        }
      }

      return { ...state, favorite: newFavorite };
    }
    case DELETE_FAVORITE_CIRCLE: {
      const spaceNo = action.payload;
      let newFavorite = [...state.favorite];
      // 既存のお気に入りから削除
      for (let i = 0; i < newFavorite.length; i++) {
        newFavorite[i].spaceNo.some((value, index) => {
          if (value === spaceNo) newFavorite[i].spaceNo.splice(index, 1);
        });
      }
      return { ...state, favorite: newFavorite };
    }
    // 検索結果を反映
    case APPLY_SEARCH_LIST: {
      return { ...state, searchResult: action.payload };
    }
    case OPEN_NOTIFY: {
      return { ...state, notify: { ...action.payload, isOpen: true } };
    }
    case CLOSE_NOTIFY: {
      return { ...state, notify: { isOpen: false, message: '', variant: 'info' } };
    }
    default:
      return state;
  }
};

export default combineReducers({ reducer });
