import { generate } from './generator';

describe('TopNav link generator', () => {
    it('should throw Error if key dot not exists into topnav json config', () => {
        const input = {
            "some-wrong-property": [0, 1]
        }

        expect(() => generate(input)).toThrow(Error);
    })

    it('should NOT throw if key exists into topnav json config', () => {
        const input = {
            "numLinks": [0, 1]
        }

        expect(() => generate(input)).not.toThrow(Error);
    })

    it('should map top nav configs to test input', () => {
        const input = {
            "numLinks": [0, 1],
            "linkAlignment":  ["Distributed", "topnav-trailing"],
        }

        const result = [
            {
                desc: 'Links: 0, Link Alignment: Distributed',
                urlPart: '#configurator-top_nav-numLinks=0&configurator-top_nav-linkAlignment=Distributed',
            },
            {
                desc: 'Links: 0, Link Alignment: topnav-trailing',
                urlPart: '#configurator-top_nav-numLinks=0&configurator-top_nav-linkAlignment=topnav-trailing',
            },
            {
                desc: 'Links: 1, Link Alignment: Distributed',
                urlPart: '#configurator-top_nav-numLinks=1&configurator-top_nav-linkAlignment=Distributed',
            },
            {
                desc: 'Links: 1, Link Alignment: topnav-trailing',
                urlPart: '#configurator-top_nav-numLinks=1&configurator-top_nav-linkAlignment=topnav-trailing',
            }
        ]
        expect(generate(input)).toEqual(result)
    })
});
