import {atom} from "recoil"

export const userState = atom({
    key: "userAtom",
    default: ''
})

export const postsAtom = atom({
    key: "posts",
    default: []
})
