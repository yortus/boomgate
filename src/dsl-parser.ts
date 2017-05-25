const grammar: { parse(text: string): RulesetAST; } = require('./dsl-grammar');





/**
 * Verifies that `source` is a valid ruleset and returns abstract syntax information about the ruleset.
 * Throws an error if `source` is not a valid ruleset. Consult the documentation for further information
 * about the ruleset DSL syntax [1].
 * [1] TODO...
 * @param {string} source - the source string to be parsed as a ruleset.
 * @returns {PredicateAST} an object containing details about the successfully parsed ruleset.
 */
export default function parse(source: string): RulesetAST {
    try {
        let ast = grammar.parse(source);
        return ast;
    }
    catch (ex) {
        let startCol = ex.location.start.column;
        let endCol = ex.location.end.column;
        if (endCol <= startCol) endCol = startCol + 1;
        let indicator = Array(startCol).join(' ') + Array(endCol - startCol + 1).join('^');
        throw new Error(`${ex.message}:\n${source}\n${indicator}`);
    }
}





/** Information associated with a successfully parsed ruleset. */
export type RulesetAST = Array<{
    clearanceMask: string;
    intentionMask: string;
    allow: boolean; // TODO: boolean for now; allow for policy function in future
}>;
