const initialState = {
    users: {},
    usersDictionary: {},
    defaultValues: [],
    selected: { write: [], read: [] },
    items: [],
};

const exampleSelected = {
    write: {
        1: true,
        2: true,
        3: true,
    },
    read: {
        1: true,
        2: true,
        3: false,
    }
};

const privilegesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'INIT_LIST': {
            return { ...state, ...payload };
        }
        case 'MARK_AS_SELECTED': {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    [payload.type]: {
                        ...state.selected[payload.type],
                        [payload.id]: true
                    },
                },
            };
        }
        case 'MARK_AS_DESELECTED': {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    [payload.type]: {
                        ...state.selected[payload.type],
                        [payload.id]: false
                    },
                },
            };
        }
        case 'REMOVE_FROM_SELECTION': {
            return {
                ...state,
                selected: {
                    ...state.selected,
                    [payload.type]: getNewStateAfterRemoveFromSelection(state.selected[payload.type], payload.id),
                },
            };
        }
        default:
            return state;
    }
};

const getNewStateAfterRemoveFromSelection = (state, id) => {
    return Object.entries(state).reduce((prev, array) => {
        const [key, value] = array;
        if (key === id) return prev;
        if (key === id.toString()) return prev;
        return { ...prev, [key]: value };
    }, {})
}

export default privilegesReducer;