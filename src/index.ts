import {Multimethod} from 'multimethods';
import {default as parse, RulesetAST} from './dsl-parser';
Multimethod; // TODO: temp testing...





export async function validate(ruleset: string, options: BoomgateOptions) {
    let ast = parse(ruleset);
    await Promise.all(ast.map(async rule => { // TODO: await!!!

        if (options.checkRole) {
            const checkRole = options.checkRole;
            let roles = rule.roles;

            await Promise.all(roles.map(async role => {
                let type = await checkRole(role);
                let isRole = options.isRole ? await options.isRole(role) : '?';

                if (isUser === true && isRole !== true) return 'user';
                if (isRole === true && isUser !== true) return 'role';



            }));



        }

        // Valid `roles` value may be any of:
        // 1. empty array
        // 2. single element which is a user and not a role
        // 3. 1-M elements where every element is a role and not a user

        // also: no duplicates!
    }));
}





export function validateOptions(options: BoomgateOptions) {

    // Must specify either BOTH or NEITHER of isUser and isRole    
}





export function build(ruleset: string, options: BoomgateOptions): BoomgateFunction {
    ruleset;
    options;
    return ()=>false;
}





export interface BoomgateOptions {

    checkRole?(name: string): 'user' | 'role' | false | Promise<'user' | 'role' | false>;
    checkDeed?(text: string): boolean | Promise<boolean>;


    // users: string[]; // |Function|AsyncFunction
    // roles: string[]; // |Function|AsyncFunction
    // userRoles: { [user: string]: string[]; }; // |Function|AsyncFunction
    // operations: string[]; // |Function|AsyncFunction
    // policies: { [name: string]: boolean | ((/*TODO: args?*/) => boolean | Promise<boolean>); };
}





export {parse, RulesetAST};





export type BoomgateFunction = (user: string, operation: string) => boolean;
