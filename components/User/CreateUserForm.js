
  import React, { Component } from 'react';
  import PropTypes from 'prop-types';

  import apiCall from '../../src/apiCall';

  import { ThemeProvider } from '@material-ui/styles';
  import { withStyles } from '@material-ui/styles';
  import CssBaseline from '@material-ui/core/CssBaseline';

  import Typography from '@material-ui/core/Typography';
  import TextField from '@material-ui/core/TextField';
  import Button from '@material-ui/core/Button';
  import Switch from '@material-ui/core/Switch';
  import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';

  import FormGroup from '@material-ui/core/FormGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import FormControl from '@material-ui/core/FormControl';
  import FormHelperText from '@material-ui/core/FormHelperText';
  import FormLabel from '@material-ui/core/FormLabel';

  import Snackbar from '../Shared/Snackbar';

  const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 600,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    fields: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    form: {
      // flexDirection: 'column',
      // display: 'flex',
      maxWidth: 600,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioGroup: {
      flexDirection: 'row',
      display: 'flex',
    },
    switch: {
      // width: 200,
      // minHeight: 56,
      // margin: '16px 8px 8px 8px',
    },
    switchRoot: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
    },
    radioRoot: {
      width: 200,
      minHeight: 56,
      margin: '16px 8px 8px 8px',
    },
    switchLabel: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 200,
      minHeight: 56,
      margin: '16px 8px 8px 8px',
    },
    button: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class CreateUserForm extends Component {

    constructor(props) {
      super(props);
      this.state = {"name":"","email":"","phone":"","image":""}
      this.state.snackbar = {
        variant: 'success',
        message: '',
      }
      this.schema = {"name":{"type":"String","default":""},"email":{"type":"String","trim":true,"unique":true},"phone":{"type":"String","trim":true,"unique":true},"image":{"type":"String","trim":true}}
    }

    handleChange = (name, type = '') => event => {
      let value = event.target.value;

      if (type && type === 'boolean' && typeof event.target.checked !== 'undefined') {
        value = event.target.checked;
      }
      if (type && type === 'number') {
        value = typeof value === 'string' ? Number(value) : value;
      }

      if (name.indexOf('.') === -1) {
        this.setState({ [name] : value });
      } else {
        name = name.split('.')
        const item = this.state[name[0]];
        item[name[1]] = value;
        this.setState({ [name[0]]: item });
      }
    }

    errorString = (e) => {
      const snackbar = Object.assign({}, this.state);
      snackbar.variant = 'error';
      snackbar.message = e.message ? e.message : e
      this.setState({ snackbar });
    }

    submit = async (e) => {
      e.preventDefault();
      try {
        const res = await apiCall({ url: 'user', method: 'POST', data: this.state });
        if (res && res.error) return this.errorString(res.error);
        else return this.setState({ snackbar: { variant: 'success', message: 'User Created.' }});
      } catch (e) {
        console.error('submit error', e);
        this.errorString(e);
      }
    }

    onSnackbarClose = (e) => {
      this.setState({ snackbar: { message: '', variant: 'info' }})
    }

    render () {
      const { classes } = this.props;
      const { snackbar, name, email, phone, image } = this.state;
      return (
        <div className={classes.container}>
          <form onSubmit={this.submit} className={classes.form}>
            <FormGroup className={classes.fields}>
              
               <TextField
                 required={false}
                 label="Name"
                 className={classes.textField}
                 margin="normal"
                 type="text"
                 variant="outlined"
                 onChange={this.handleChange("name", 'string')}
                 value={this.state.name}
               />

               <TextField
                 required={false}
                 label="Email"
                 className={classes.textField}
                 margin="normal"
                 type="text"
                 variant="outlined"
                 onChange={this.handleChange("email", 'string')}
                 value={this.state.email}
               />

               <TextField
                 required={false}
                 label="Phone"
                 className={classes.textField}
                 margin="normal"
                 type="text"
                 variant="outlined"
                 onChange={this.handleChange("phone", 'string')}
                 value={this.state.phone}
               />

               <TextField
                 required={false}
                 label="Image"
                 className={classes.textField}
                 margin="normal"
                 type="text"
                 variant="outlined"
                 onChange={this.handleChange("image", 'string')}
                 value={this.state.image}
               />
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="primary"
             >
              Create User
            </Button>
          </form>
          <Snackbar
            variant={snackbar.variant}
            message={snackbar.message}
            handleClose={this.onSnackbarClose}
          />
        </div>
      );
    }
  }

  CreateUserForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles, { withTheme: true })(CreateUserForm);
  