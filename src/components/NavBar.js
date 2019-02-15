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
  }
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
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme} >
      <div className={classes.ogDiv}>
        <AppBar position="static">
          <Toolbar classnName={classes.root}>
            <div className='baseSelector'>
              <Button color="secondary" variant="outlined">Decimal</Button>
              <Button color="secondary" variant="outlined">Binary</Button>
              <Button color="secondary" variant="outlined">Hex</Button>
              <Button color="secondary" variant="outlined">Octal</Button>
              <Button color="inherit" variant="outlined">36</Button>
              <Button color="secondary" variant="outlined">62</Button>
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
