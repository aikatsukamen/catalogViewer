import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './App.css';
import { showCircleDetail, closeCircleDetail, changeFavoriteId, deleteFavoriteCircle, searchCircle, saveData } from '../../actions';
import DrawerMenu from '../molecules/DrawerMenu';
import MenuItems from '../molecules/MenuItems';
import CircleMap from '../organisms/CircleMap';
import CircleDetail from '../molecules/CircleDetail';
import Modal from '../molecules/Modal';
import FavoriteList from '../organisms/FavoriteList';
import CircleSearch from '../organisms/Search';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    top: '-60px'
  },
  icon: {}
});

const App = props => {
  const PurchaseList = () => <div>品と価格を表示して合計金額出せるといいね</div>;
  const Sync = () => (
    <div>
      <Button
        onClick={() => {
          props.saveData();
        }}
      >
        保存！
      </Button>
    </div>
  );

  return (
    <div>
      <BrowserRouter>
        <div>
          <DrawerMenu navigationLabel={'芸カ17カタログビューア'}>
            <MenuItems />
          </DrawerMenu>
          <Route exact path="/" render={() => <CircleMap map={props.map} favorite={props.favorite} selectCircle={props.showCircleDetail} />} />
          <Route path="/favorite" render={() => <FavoriteList circleInfo={props.circleInfo} favorite={props.favorite} selectCircle={props.showCircleDetail} deleteFavoriteCircle={props.deleteFavoriteCircle} />} />
          <Route path="/search" render={() => <CircleSearch circleInfo={props.circleInfo} search={props.searchResult} selectCircle={props.showCircleDetail} searchCircle={props.searchCircle} />} />
          <Route path="/purchase" component={PurchaseList} />
          <Route path="/sync" component={Sync} />
          <Modal open={props.detailCircle.open} modalClose={props.closeCircleDetail}>
            <CircleDetail circleInfo={props.detailCircle.circleInfo} favorite={props.favorite} changeFavoriteId={props.changeFavoriteId} />
          </Modal>
        </div>
      </BrowserRouter>
    </div>
  );
};

// state
function mapStateToProps(state) {
  return {
    status: state.reducer.status,
    map: state.reducer.map,
    favorite: state.reducer.favorite,
    circleInfo: state.reducer.circleInfo,
    detailCircle: state.reducer.detailCircle,
    searchResult: state.reducer.searchResult
  };
}

// action
const mapDispatchToProps = {
  showCircleDetail,
  closeCircleDetail,
  changeFavoriteId,
  deleteFavoriteCircle,
  searchCircle,
  saveData
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  favorite: PropTypes.array.isRequired,
  map: PropTypes.array.isRequired,
  circleInfo: PropTypes.array.isRequired,
  detailCircle: PropTypes.object.isRequired,
  showCircleDetail: PropTypes.func.isRequired,
  closeCircleDetail: PropTypes.func.isRequired,
  changeFavoriteId: PropTypes.func.isRequired,
  deleteFavoriteCircle: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
  searchCircle: PropTypes.func.isRequired,
  saveData: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));