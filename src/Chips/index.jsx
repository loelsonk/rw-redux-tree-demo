import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

function handleDelete() {}

function Chips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Chip
                avatar={
                    <Avatar>
                        MZ
                    </Avatar>
                }
                label="Karol Horodelski (horodelk)"
                onDelete={handleDelete}
                className={classes.chip}
            />
            <Chip
                avatar={
                    <Avatar>
                        MZ
                    </Avatar>
                }
                label="Michał Rzezak (rzezakm)"
                onDelete={handleDelete}
                className={classes.chip}
            />
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
