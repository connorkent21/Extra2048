import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = {
  root: {
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  ogDiv: {
    flexGrow: 1,
  },
  button: {
    transition: 'all .3s,'
  },
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#393f4d',
    },
    secondary: {
      main:'#d4d4dc'
    }
  },
});

function NavBar(props) {
  const { classes, page } = props;

  return (
    <MuiThemeProvider theme={theme} >
      <div className={classes.ogDiv}>
        <AppBar position="static">
          <Toolbar classnName={classes.root}>
            <div className='baseSelector'>
              <Button color={page.state.base == 10 ? 'inherit' : 'secondary'} className={page.state.base == 10 ? `${classes.selected} button` : 'button' } variant="outlined" onClick={() => {
                  page.setState({base: 10})
                }
              }
              >Decimal</Button>
            <Button color={page.state.base == 2 ? 'inherit' : 'secondary'} className={page.state.base == 2 ? `${classes.selected} button` : 'button' } variant="outlined" onClick={() => {
                  page.setState({base: 2})
                }
              }
              >Binary</Button>
            <Button color={page.state.base == 16 ? 'inherit' : 'secondary'} className={page.state.base == 16 ? `${classes.selected} button` : 'button' } variant="outlined" onClick={() => {
                  page.setState({base: 16})
                }
              }
              >Hex</Button>
            <Button color={page.state.base == 8 ? 'inherit' : 'secondary'} className={page.state.base == 8 ? `${classes.selected} button` : 'button' } variant="outlined" onClick={() => {
                  page.setState({base: 8})
                }
              }
              >Octal</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
