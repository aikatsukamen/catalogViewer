import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    marginLeft: '5vw',
    width: '90vw',
    height: '80vh',
    overflow: 'scroll'
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    top: '-60px'
  },
  icon: {},
  table: {
    border: '1px solid',
    width: 'initial',
    minWidth: '800px'
  },
  emptyCell: {
    wordBreak: 'keep-all',
    padding: 0,
    border: 0,
    width: '50px',
    backgroundColor: 'gray'
  },
  circleSpaceCell: {
    wordBreak: 'keep-all',
    padding: 0,
    border: '1px solid',
    width: '50px',
    textAlign: 'center'
  }
});

const CircleMap = props => {
  const onClickCircleSpace = spaceNo => () => {
    {
      if (spaceNo.match(/\d/) !== null) {
        props.selectCircle(spaceNo);
      }
    }
  };

  const createMapCell = allData => {
    const allDom = allData.map((rowData, index) => {
      const rowIndex = index;
      const rowDom = rowData.map((colData, colIndex) => {
        if (colData) {
          // 何か文字が入ってるセル
          // お気に入りに合致するサークルの場合は、その色にする
          let cellColor = 'white';

          for (const fav of props.favorite) {
            for (const favSpaceNo of fav.spaceNo) {
              // console.log(`favSpaceNo：${favSpaceNo}`);
              // 合体サークル等に備えて分割する
              const spaceNoList = favSpaceNo.split('.');
              if (spaceNoList.length === 2) spaceNoList[1] = spaceNoList[0].slice(0, 1) + spaceNoList[1];
              // console.log(spaceNoList);
              if (spaceNoList.indexOf(colData) > -1) {
                cellColor = fav.color;
                break;
              }
            }
          }

          return (
            <TableCell key={`cell_${rowIndex}_${colIndex}`} style={{ backgroundColor: cellColor }} className={props.classes.circleSpaceCell} onClick={onClickCircleSpace(colData)}>
              {colData}
            </TableCell>
          );
        } else {
          // 空のセル
          return (
            <TableCell key={`cell_${rowIndex}_${colIndex}`} className={props.classes.emptyCell}>
              {colData}
            </TableCell>
          );
        }
      });
      return <TableRow key={`row_${rowIndex}`}>{rowDom}</TableRow>;
    });
    return allDom;
  };

  return (
    <div className={props.classes.root}>
      <Table className={props.classes.table}>
        <TableBody>{createMapCell(props.map)}</TableBody>
      </Table>
    </div>
  );
};

CircleMap.propTypes = {
  classes: PropTypes.object.isRequired,
  map: PropTypes.array.isRequired,
  favorite: PropTypes.array.isRequired,
  selectCircle: PropTypes.func.isRequired
};

export default withStyles(styles)(CircleMap);
