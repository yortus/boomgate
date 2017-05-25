# Boomgate

### Terminology Glossary
- clearance: enumerates the roles/credentials posessed by the requestor.
- intention: specifies the outcome sought by the requestor, in terms of action/verb and resource/object
- mask: a predicate/filter that matches a specific set of clearances or intentions. Takes form of MM predicate.
- implied clearances: given a particular clearance, enumerates further clearances that implicitly come with it (for clearance hierarchies, user/group mappings, etc)
- policy: TODO: ...
- policy determinant: the optional policy function in the `iff` clause of a rule (TODO: explain better...)
- rule: triple of clearance mask + intention mask + policy (TODO: explain better...)
- ruleset: TODO...

### Clearances and Clearance Masks

- unqualified clearance, or simply 'clearance':
  - a simple name
  - must be unique within a system
  - consists of one or more adjacent characters from the set `[A-Za-z0-9._-]`.
  - must not be a reserved name: `and`, `can`, `cannot`
  - example: `bob   # a specific user`
  - example: `administrators   # a group`

- fully-qualified clearance:
  - given as a specially-formatted string
  - T = transitive closure over implied clearances
  - concatenation of all clearances in T, arranged in alphabetical order, each surrounded by square brackets
  - example: `[bob][hr][vp-hr]   # bob is the user, bob is the VP of HR, which also implies HR clearance`

- clearance masks:
  - predicate that matches a set of fully-qualified clearances
  - predicate format is that used by the npm `multimethods` library
  - example: `*\[bob\]*   # matches any requestor with 'bob' clearance`
  - example: `*\[it\]*\[manager\]*   # matches any requestor with *both* 'it' and 'manager' clearance`

### Intentions and Intention Masks

- intention:
  - includes action/verb and specific resource
  - typically looks like a URL with a HTTP verb
  - typically hierarchical
  - example: `GET /employees/317/bank-accounts/1`

- intention mask:
  - predicate that matches a set of intentions
  - predicate format is that used by the npm `multimethods` library
  - example: `{METHOD} /accounts/...`
  - example: `GET /employees/{empid}/...`
