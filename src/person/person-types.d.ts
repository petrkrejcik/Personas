interface PersonModelProps {
    persons: Array<PersonProps>;
    isAdd: boolean;
    onSave: Function;
    onCancel: Function;
}

interface PersonProps extends Person {
    age: number;
    daysToBirthday: number;
    seenBefore: number;
    onEditClick: Function;
    onRemoveClick: Function;
    cancelRemove: Function;
    remove: Function;
    save: Function;
}
