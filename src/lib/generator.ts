import {Input, Output, Entry} from "./models/lib";
import {getTopNav, validate} from "./validators/topnav";

export function generate(input: Input): Output[] {
    validate(input)

    const entries = Object.entries(input);

    const crossedOptions = crossOptions(entries);

    return crossedOptions.map(crossedOption => {
        return {
            desc: buildDescription(crossedOption),
            urlPart: buildUrlPart(crossedOption)
        }
    })
}

function crossOptions(entries: Entry[]) {
    const crossedOptions: Record<string, unknown>[] = []

    entries.forEach((entry, index) => {
        const keys = entry[0];
        const values = entry[1];

        const nextEntries = entries[index + 1]

        if (!nextEntries) return

        const nextKeys = nextEntries[0];
        const nextValues = nextEntries[1];

        values.forEach(value => {
            nextValues.forEach(nextValue => {
                crossedOptions.push({[keys]: value, [nextKeys]: nextValue})
            })
        })
    })
    return crossedOptions;
}

function buildDescription(crossedOption: Record<string, unknown>) {
    function beautify(property: string) {
        const topNav = getTopNav();
        return topNav[0].form[0].find(option => option.name === property)!.label
    }

    function cleanupDescription(string: string) {
        return string.substring(2)
    }

    return cleanupDescription(Object.entries(crossedOption).reduce((acc, cur) => {
        const key = cur[0];
        const value = cur[1];

        return `${acc}, ${beautify(key)}: ${value}`;
    }, ""))
}

function buildUrlPart(crossedOption: Record<string, unknown>) {
    function beautify(property: string) {
        return `configurator-top_nav-${property}`
    }

    function cleanupUrlPart(string: string) {
        return `#${string.substring(1)}`
    }

    return cleanupUrlPart(Object.entries(crossedOption).reduce((acc, cur) => {
        const key = cur[0];
        const value = cur[1];

        return `${acc}&${beautify(key)}=${value}`;
    }, ""))
}

