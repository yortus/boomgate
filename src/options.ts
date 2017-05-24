import Role from './role';
export default Options;





interface Options {
    membershipsFor(role: Role): Role[];

    // TODO: validation of roles and deeds...
}
