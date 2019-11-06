interface Person {
    id: string;
    name: string;
    birthday: string;
    seen?: string;
}

interface PersonEdit {
    id: string;
    name: string;
    day: string;
    month: string;
    year: string;
}

interface Action {
    type: string;
    payload?: any;
}

interface State {
    persons: {[key: string]: Person};
    personEdit?: PersonEdit;
    activeElement?: Element;
    deleteOverlayId?: string;
    dataProvider?: Object;
    isAddingPerson?: boolean,
}
