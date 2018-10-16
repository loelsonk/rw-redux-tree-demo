import { createSelector } from 'reselect';
import { dropRight, get } from 'lodash';

export const itemsSelector = state => state.privileges.items;
export const usersSelector = state => state.privileges.users;
export const usersDictionarySelector = state => state.privileges.usersDictionary;
export const selectedSelector = state => state.privileges.selected;
export const defaultValuesSelector = state => state.privileges.defaultValues;

export const isCheckedSelector = (id) => createSelector(
    selectedSelector,
    items => items.findIndex(i => i === id),
);

export const privilegesSelector = createSelector(
    itemsSelector,
    selectedSelector,
    defaultValuesSelector,
    usersSelector,
    usersDictionarySelector,
    (items, selected, defaultValues, users, usersDictionary) => {

        console.log('defaultValues', defaultValues);

        const getCheckboxState = (type, item) => {
            if (!items.length) {
                return {}
            }

            console.log('id', item.id);
            const usersByIdWhoHasAccess = (users && users[item.id] && users[item.id][type]) || [];
            const everyUserHasAccess = usersDictionary.count === usersByIdWhoHasAccess.length;
            const someUsersHasAccess = !everyUserHasAccess && usersByIdWhoHasAccess.length;


            // const usersDetails = usersByIdWhoHasAccess && usersByIdWhoHasAccess.map(id => usersDictionary[id]);
            // console.log('doesSomeUsersHasThisCheckbox', usersDetails)
            //
            // const isSelected = typeof selected[type].find(i => i === item.id) === 'number';
            // const hasPartialValue = typeof defaultValues.partial[type].find(i => i === item.id) === 'number';
            // const iAmRoot = items[0].id === item.id;
            //
            // const pathWithoutMe = dropRight(item.path);
            //
            // const someOfMyParentsAreSelected = pathWithoutMe.some(i => selected[type].includes(i));
            //
            // const someOfMyPartialParentsAreSelected = pathWithoutMe.some(i => defaultValues.partial[type].includes(i));
            //
            //
            // const checkDisabled = () => {
            //     if (isSelected && iAmRoot) {
            //         return false;
            //     }
            //
            //     if (iAmRoot) {
            //         return false;
            //     }
            //
            //     if (!selected[type].length) {
            //         return false;
            //     }
            //
            //     if (!isSelected && someOfMyParentsAreSelected) {
            //         return true;
            //     }
            //
            //     if (isSelected && someOfMyParentsAreSelected) {
            //         return true;
            //     }
            //
            //     return false;
            // };
            //
            //
            // const isChecked = isSelected || someOfMyParentsAreSelected;

            return {
                disabled: false,
                checked: false,
                // usersDetails,
                // ...(!isChecked && {
                //     indeterminate: someUsersHasAccess || someOfMyPartialParentsAreSelected
                // }),
            };
        };


        return ({
            items,
            selected,
            defaultValues,
            getCheckboxState,
        })
    }
);