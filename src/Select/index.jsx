import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from "@material-ui/core/TextField";
import Chips from '../Chips';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '24px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 320,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class NativeSelects extends React.Component {
    state = {
        organization: 10,
        name: 'hai',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.root}>
                    <TextField
                        style={{ marginLeft: '10px', minWidth: '320px' }}
                        id="standard-name"
                        value="  "
                        disabled
                        label="Search users and groups"
                        margin="normal"
                    />

                </div>
                <div className={classes.root}>
                    <Chips />
                </div>
                <div className={classes.root}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.labelRef = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="outlined-organization-native-simple"
                        >
                            Organization Tree
                        </InputLabel>
                        <Select
                            native
                            disabled
                            value={this.state.organization}
                            onChange={this.handleChange('organization')}
                            input={
                                <OutlinedInput
                                    name="organization"
                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                    id="outlined-organization-native-simple"
                                />
                            }
                        >
                            <option value="" />
                            <option value={10}>CHRIS</option>
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }
}

NativeSelects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
