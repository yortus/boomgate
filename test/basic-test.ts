import {expect} from 'chai';
import {parse, RulesetAST/*TODO: was..., BoomgateOptions*/} from 'boomgate';





describe('Parsing a ruleset', () => {

    const tests = [
        `user can "do this"                 ==> [{roles: [], deeds: 'do this', allow: true}]`,
        `user can "  df2f$ #F%$   ^#< >><." ==> [{roles: [], deeds: '  df2f$ #F%$   ^#< >><.', allow: true}]`,
        `user can do this                   ==> ERROR`,
        `  \tuser   can \t   "do this"      ==> [{roles: [], deeds: 'do this', allow: true}]`,
        `user can 'do this'                 ==> ERROR`,
        `user can"do this"                  ==> ERROR`,
        `user can "do\rthis"                ==> ERROR`,
        `user cannot "do that"              ==> [{roles: [], deeds: 'do that', allow: false}]`,
        `user can not "do this"             ==> ERROR`,
        `adam can "do this"                 ==> [{roles: ['adam'], deeds: 'do this', allow: true}]`,
        `bree cannot "do that"              ==> [{roles: ['bree'], deeds: 'do that', allow: false}]`,
        `it admin can "do this"             ==> [{roles: ['admin', 'it'], deeds: 'do this', allow: true}]`,
        `cody and dana cannot "do that"     ==> [{roles: ['cody'], deeds: 'do that', allow: false}, {roles: ['dana'], deeds: 'do that', allow: false}]`,
        `user and dana can "do this"        ==> ERROR`,
        `some user can "do this"            ==> ERROR`,

// TODO: 'or' is not a user or role:
//        `cody or dana can "do this"         ==> ERROR`,
    ];

    // const boomgateOptions: BoomgateOptions = {
        // users: ['adam', 'bree', 'cody', 'dana'],
        // roles: [],
        // userRoles: {
        //     adam: []
        // },
        // operations: [
        //     '/...'
        // ],
        // policies: {
        //     allow: true,
        //     deny: false
        // }
    // };


    tests.forEach(test => it(test, () => {
        let ruleset = test.split(' ==> ')[0];
        let rhs = test.split(' ==> ')[1];
        let expected: RulesetAST|string = rhs === "ERROR" ? rhs : eval(`(${rhs})`);

        let actual: RulesetAST|string = 'ERROR';
        try {
            actual = parse(ruleset/*TODO: was... , boomgateOptions*/);
        }
        catch (ex) { }
        expect(actual).to.deep.equal(expected);




    }));
});
