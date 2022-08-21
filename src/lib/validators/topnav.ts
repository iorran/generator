import { Convert } from '../gen-models/topnav'
import json from '../../configs/topnav.json'
import {Input} from "../models/lib";

/**
 * TODO: validators should not have this responsibility
 */
export function getTopNav() {
    return Convert.toTopnav(JSON.stringify(json));
}

export function validate(input: Input) {
    const topNav = getTopNav()

    const keys = topNav[0].form[0].map(option => option.name)

    const nonExistentKeys = Object.keys(input).filter(x => !keys.includes(x));

    if(nonExistentKeys.length > 0) {
        throw new Error(`${nonExistentKeys.join(", ")}`)
    }
}