import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '5px'
  },
  button: {
    marginRight: '20px'
  },
  controlArea: {
    marginTop: '10px'
  },
  logoutArea: {
    marginTop: '40px'
  }
});

class Sync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      eventName: '',
      mode: this.props.loginInfo.user ? 'logined' : 'init'
    };
    this.handleShowLoginForm = this.handleShowLoginForm.bind(this);
    this.handleShowRegistForm = this.handleShowRegistForm.bind(this);
  }

  handleShowLoginForm() {
    this.setState({ mode: 'login' });
  }

  handleShowRegistForm() {
    this.setState({ mode: 'regist' });
  }

  /**
   * テキストボックスの入力
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  /** 初期表示(未ログイン) */
  initForm() {
    return (
      <div>
        <Button variant="contained" color="default" onClick={this.handleShowLoginForm} className={this.props.classes.button}>
          ログイン
        </Button>
        <Button variant="contained" color="default" onClick={this.handleShowRegistForm}>
          新規登録
        </Button>
      </div>
    );
  }

  /** ログインフォーム */
  loginForm() {
    let loginLabel;
    let loginType;
    if (this.state.mode === 'login') {
      loginLabel = 'ログイン';
      loginType = 'login';
    } else {
      loginLabel = '新規登録';
      loginType = 'regist';
    }
    return (
      <div>
        {this.initForm()}
        <hr />
        <div>
          <div>
            <TextField label="ユーザ名" value={this.state.user} onChange={this.handleChange('user')} />
          </div>
          <div>
            <TextField label={'パスワード'} type="password" value={this.state.pass} onChange={this.handleChange('pass')} />
          </div>
          <div className={this.props.classes.controlArea}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.login({
                  loginType,
                  user: this.state.user,
                  pass: this.state.pass
                });
              }}
            >
              {loginLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /** ログイン済 */
  logined() {
    return (
      <div>
        <Typography variant="subtitle2">ログイン中</Typography>
        <div>
          <TextField
            label="ユーザ名"
            defaultValue={this.props.loginInfo.user}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
        <div className={this.props.classes.controlArea}>
          <Button variant="contained" color="primary" onClick={this.props.loadData} className={this.props.classes.button}>
            <CloudDownloadIcon />
            Download
          </Button>
          <Button variant="contained" color="secondary" onClick={this.props.saveData}>
            <CloudUploadIcon />
            Upload
          </Button>
        </div>
        <div className={this.props.classes.logoutArea}>
          <Button variant="contained" color="default" size="small" onClick={this.props.logout}>
            ログアウト
          </Button>
        </div>
      </div>
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loginInfo.user !== '') {
      // ログイン時の挙動
      this.setState({ mode: 'logined' });
    } else {
      // ログアウト時の挙動
      if (this.state.mode === 'logined') {
        this.setState({ mode: 'init', user: '', pass: '' });
      }
    }
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="body1" gutterBottom={true}>
          お気に入り情報をサーバに保存できるよ！
        </Typography>
        <Divider />
        {(() => {
          switch (this.state.mode) {
            case 'init':
              return this.initForm();
            case 'regist':
              return this.loginForm();
            case 'login':
              return this.loginForm();
            case 'logined':
              return this.logined();
            default:
              return;
          }
        })()}
      </div>
    );
  }
}

Sync.propTypes = {
  classes: PropTypes.object.isRequired,
  loginInfo: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired
};

export default withStyles(styles)(Sync);
