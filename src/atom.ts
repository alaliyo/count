import { atom, selector } from "recoil";

export const countState = atom({
    key: "fontSizeState",
    default: 0,
});

export const fontSizeState = selector({
    key: "fontSizeLabelState",
    get: ({get}) => {
        const fontSize = get(countState);
        const unit = "px";

        return `${fontSize}${unit}`
    },
});

export const timerState = atom({
    key: 'timerState',
    default: 0,
});

export const millisecondsState = atom({
    key: 'millisecondsState',
    default: 0,
});

export const countStartState = atom({
    key: "countStart",
    default: false,
});

export const btnNameState = atom({
    key: "btnNameState",
    default: "시작",
});