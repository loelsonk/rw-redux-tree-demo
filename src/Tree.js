import React, {Component} from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { Field, reduxForm } from 'redux-form';
import * as privilegesActions from './store/actions';
import { connect } from 'react-redux';
import Chips from './Chips';
import Select from './Select';
import './styles.scss';
import CheckboxField from './CheckboxField';
import {
    privilegesSelector,
} from './store/selectors';

//
// list-style: none;
// padding: 0;
// margin: 0;
const RenderTree = ({ items, getCheckboxState, isCheckedIfParentChecked, amIlastManStanding, isDisabled, isChecked, onToggle }) => {
    if (!items.length) return null;
    return items.map(item => (
        <TreeNode
            key={item.id}
            item={item}
            isChecked={isChecked}
            isDisabled={isDisabled}
            getCheckboxState={getCheckboxState}
            amIlastManStanding={amIlastManStanding}
            isCheckedIfParentChecked={isCheckedIfParentChecked}
            onToggle={onToggle} />
    ))
};



const CheckboxTooltip = ({ item, onToggle, getCheckboxState, type }) => {
    const { disabled, checked, indeterminate, ...props } = getCheckboxState(type, item);

    console.log('userDetails', props.usersDetails);

    const title = props.usersDetails && props.usersDetails.length ? props.usersDetails.reduce((prev, next) => {
        const user = `${next.firstName} ${next.lastName}`;
        return prev + ` ${user}`;
    }, '') : '';

    console.log(title)

    return (
        <Tooltip title={title} placement="top">
            <Checkbox
                disableRipple
                disabled={disabled}
                checked={checked}
                indeterminate={indeterminate}
                onChange={e => { console.log('next state is:', e.target.checked); onToggle(type, e.target.checked, item); }}
                />
        </Tooltip>
    )
}

const TreeNode = ({ item, getState, onToggle, getCheckboxState, isChecked, isDisabled, isCheckedIfParentChecked, amIlastManStanding }) => {
    return (
        <div  className={`level-${item.path.length - 1}`}>
            <div className="grid">
                <div className="title">{item.name}</div>
                <div className="checkboxesWrapper">
                    <CheckboxTooltip
                        type="read"
                        item={item}
                        onToggle={onToggle}
                        getCheckboxState={getCheckboxState} />
                    <CheckboxTooltip
                        type="write"
                        item={item}
                        onToggle={onToggle}
                        getCheckboxState={getCheckboxState} />
                </div>
            </div>
        </div>
    )
}



class PrivilegesForm extends Component {
    componentDidMount() {
        this.props.actions.init();
    }

    handleToggle = (type, isSelected, item) => {
        const hasPartialDefaultValue = this.props.defaultValues.partial[type][item.id];
        const hasSelectedByAllDefaultValue = this.props.defaultValues.all[type][item.id];

        console.log('isPartial', hasPartialDefaultValue);

        if (hasPartialDefaultValue && !isSelected) {
            return this.props.actions.markAsDeselected(type, item);
        }

        // This way we enable triple checkbox
        // if (hasPartialDefaultValue && isSelected && this.props.selected[type][item.id] === false) {
        //     return this.props.actions.removeFromSelection(type, item);
        // }

        if (hasSelectedByAllDefaultValue && !isSelected) {
            return this.props.actions.markAsDeselected(type, item);
        }

        if (isSelected) {
            return this.props.actions.markAsSelected(type, item)
        }

        return this.props.actions.removeFromSelection(type, item)
    };

    render() {
      const { items, actions } = this.props;
        return (
            <div style={{ padding: '10px' }}>
                <div>
                    <h1>Organization Privilege Manager</h1>
                </div>
                <div>
                    <Select />
                </div>
                <div className="header">
                    <div />
                    <div className="checkboxesWrapper">
                        <span>R</span>
                        <span>W</span>
                    </div>
                </div>
                <RenderTree
                    onToggle={this.handleToggle}
                    getCheckboxState={this.props.getCheckboxState}
                    isChecked={this.props.isChecked}
                    isDisabled={this.props.isDisabled}
                    amIlastManStanding={this.props.amIlastManStanding}
                    isCheckedIfParentChecked={this.props.isCheckedIfParentChecked}
                    items={items.filter((item, index) => index < 25)} />
            </div>
        )
    }
}


const mapStateToProps = privilegesSelector;

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(privilegesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivilegesForm);