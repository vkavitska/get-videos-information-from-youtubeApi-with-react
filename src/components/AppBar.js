import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
};


function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <Link to='/'>
          <AppBar position="fixed" color='secondary'>
            <Toolbar>
              <Typography variant="title" color='default'>
                Home
              </Typography>
            </Toolbar>
          </AppBar>
      </Link>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
