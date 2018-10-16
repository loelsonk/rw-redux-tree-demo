const items = require('../asd.json');
const users = require('../mocks/users.json');

const usersDictionary = {
    count: 2,
    "RBAMOUSER\\horodelk": {
        firstName: 'Karol',
        lastName: 'Horodelski',
    },
    "RBAMOUSER\\rzezakm": {
        firstName: 'Michał',
        lastName: 'Rzezak',
    },
};

export const init = () => {

    const values = items.reduce((prev, item) => {
        const usersByIdWhoHasReadAccess = (users && users[item.id] && users[item.id]['read']) || [];
        const usersByIdWhoHasWriteAccess = (users && users[item.id] && users[item.id]['write']) || [];

        const everyUserHasReadAccess = usersDictionary.count === usersByIdWhoHasReadAccess.length;
        const everyUserHasWriteAccess = usersDictionary.count === usersByIdWhoHasWriteAccess.length;

        const someUsersHasReadAccess = !everyUserHasReadAccess && usersByIdWhoHasReadAccess.length;
        const someUsersHasWriteAccess = !everyUserHasWriteAccess && usersByIdWhoHasWriteAccess.length;


        return {
            ...prev,
            partialRead: {...prev.partialRead, ...(someUsersHasReadAccess && { [item.id]: true }) },
            partialWrite: {...prev.partialWrite, ...(someUsersHasWriteAccess && { [item.id]: true }) },
            read: {...prev.read, ...(everyUserHasReadAccess && { [item.id]: true }) },
            write: {...prev.write, ...(everyUserHasWriteAccess && { [item.id]: true }) },
        };
    }, { read: {}, write: {}, partialRead: {}, partialWrite: {} });

    const defaultValues = {
        partial: { read: values.partialRead, write: values.partialWrite },
        all: { read: values.read, write: values.write },
    };

    const selected = { read: values.read, write: values.write };

    return {
        type: 'INIT_LIST',
        payload: {
            users,
            usersDictionary,
            items,
            defaultValues,
            selected,
        },
    };
};

export const markAsSelected = (type, item) => ({
    type: 'MARK_AS_SELECTED',
    payload: { type, id: item.id },
});

export const markAsDeselected = (type, item) => {
    return {
        type: 'MARK_AS_DESELECTED',
        payload: { type, id: item.id },
    }
};

export const removeFromSelection = (type, item) => {
    return {
        type: 'REMOVE_FROM_SELECTION',
        payload: { type, id: item.id },
    }
};

