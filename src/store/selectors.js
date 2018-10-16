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
            const usersDetails = usersByIdWhoHasAccess && usersByIdWhoHasAccess.map(id => usersDictionary[id]);



            const allUsersAccess = Object.entries(usersDictionary).reduce((prev, [key, value]) => {
                if (key === 'count') return prev;

                return [...prev, value];
            }, []);

            // console.log('doesSomeUsersHasThisCheckbox', usersDetails)
            const selectionValue = selected[type][item.id];
            const isSelected = typeof selectionValue === 'boolean' && selectionValue;
            const isDeselected = typeof selectionValue === 'boolean' && !selectionValue;
            const isPartiallySelectedByDefault = defaultValues.partial[type][item.id];
            const someOfMyPartialParentsAreSelected = item.path.some(i => defaultValues.partial[type][i]);
            const someOfMyParentsAreSelected = item.path.some(i => selected[type][i]);
            const someOfMyParentsAreDeselected = item.path.some(i => selected[type][i] === false); // could be undefined as well


            // EXPERIMENTAL
            // WHAT IF ALL MY CHILDREN ARE SELECTED? SHOULD I BE ALSO SELECTED AND DISABLE CHILDREN?


            // const hasPartialValue = typeof defaultValues.partial[type].find(i => i === item.id) === 'number';
            // const iAmRoot = items[0].id === item.id;

            // const pathWithoutMe = dropRight(item.path);

            // const someOfMyParentsAreSelected = pathWithoutMe.some(i => selected[type].includes(i));

            const isCheckboxAvailable = () => {
                if (someOfMyParentsAreSelected) {
                    return false;
                }

                if (isSelected) {
                    return true;
                }

                if (isPartiallySelectedByDefault) {
                    return true;
                }

                if (someOfMyPartialParentsAreSelected) {
                    return true;
                }
                //
                // if (!selected[type].length) {
                //     return false;
                // }
                //
                // if (!isSelected && someOfMyParentsAreSelected) {
                //     return true;
                // }
                //
                // if (isSelected && someOfMyParentsAreSelected) {
                //     return true;
                // }
                //
                return true;
            };
            //
            //
            const isChecked = isSelected || someOfMyParentsAreSelected;
            const isUnchecked = isDeselected || someOfMyParentsAreDeselected;
            const isIndeterminate = !isChecked && !isUnchecked && {
                indeterminate: isPartiallySelectedByDefault || someOfMyPartialParentsAreSelected
            };

            const getUserDetails = () => {
                if (isSelected) {
                    return allUsersAccess;
                }

                if (isPartiallySelectedByDefault && isIndeterminate) {
                    return usersDetails;
                }

                if (isIndeterminate) {
                    const partialId = item.path.find(i => defaultValues.partial[type][i]);
                    const userToDictionary = users && users[partialId] && users[partialId][type];
                    return userToDictionary && userToDictionary.map(id => usersDictionary[id]);
                }

                return [];
            };

            console.log('getUserDetails', getUserDetails());


            return {
                disabled: !isCheckboxAvailable(),
                checked: isChecked,
                usersDetails: getUserDetails(),
                ...isIndeterminate,
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