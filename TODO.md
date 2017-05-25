
# JSON / JS

rules: [
    {
        agent: 'bob',
        operation: 'GET',
        object: '/employees',
        policy: ALLOW
    }
]



# Text file / DSL
```
# fallback rule
@all /...                   ==> deny

@bob can "GET /employees"         ==> allow
@bob cannot "POST /employees"        ==> deny

anybody/nobody can "/employee/{id}"         onlyif/unless isSelf(id)
anybody/nobody can "/employee/{id}/..."     onlyif/unless isSelf(id)

@it-dept GET /...           ==> allow

@all /employee/{id}         ==> isSelf(id)
@all /employee/{id}/...     ==> isSelf(id)




```

# operation examples
- delete site/53
- ride bus 59
- publish
- read /posts/...

# possible rule constructions
- @bob wantsTo ride bus 59
- @bob: ride bus 59
- @bob can ride bus 59
- @bob can "ride bus 59"
- @bob can 'ride bus 59'
- @bob can not ride bus 59
- @bob can only ride bus {x} if is59(x)
- all can publish
- anybody can publish
- all can not delete site/*
- nobody can delete site/*

# form examples:
@bob can "operation"                    ==> {users: "bob", ops: "operation", allow: true}
@bob cannot "operation"                 ==> {users: "admin", ops: "operation", allow: false}

user can "operation"                    ==> {users: "*", ops: "operation", allow: true}
user cannot "operation"                 ==> {users: "*", ops: "operation", allow: false}

@bob can "operation" iff policy(...)    ==> {users: "bob", ops: "operation", allow: policyFn }
@bob cannot "operation" iff policy(...) ==> {users: "bob", ops: "operation", allow: !policyFn }

user can "operation" iff policy(...)    ==> {users: "*", ops: "operation", allow: policyFn }
user cannot "operation" iff policy(...) ==> {users: "*", ops: "operation", allow: !policyFn }

user in admin can "operation"           ==> {users: "*"}
user in it-dept cannot "operation"      ==> {users: "*"}

# syntax summary:
(@user|@role|'user') ('can'|'cannot') "operation" ['iff' policy]









# Grammar:
# example: @user-or-group VERB /resource... ==> policy

Rule        :=  Agent WS Operation? WS Object WS Policy
Agent       :=  '@' IDENTIFIER
Operation   :=  GET | POST
Object      :=  <Pattern...> # must start with '/'
Policy      :=  '==>' WS ('allow' | 'deny' | Call)
Call        :=  IDENTIFIER '(' WS Args? WS ')'
Args        :=  IDENTIFIER (WS ',' WS Args)?




# Outputs:
- Predicate function: given agent, operation, object, is it permitted?
- Explorer: given agent and object, what operations are permitted?
- protocol??



# Terminology Ideas
- subject, WHO, user, agent, role, actor, accessor, trustee, applicant, seeker, claimant, identity
- operation, WHAT, verb, method, action, intent, task, work, deed, feat, step, move, plan, area
- object, WHERE, resource, area, securable, context, asset
- policy, rights, permissions, access, capability

