RuleSet
=   WS?   head:Rule   tail:(WS?   Rule)*   WS?   EOF
    { return head.concat(tail.map(el => el[1])); }

Rule
=   droles:DisjunctRoles   SPC   allow:(CAN/CANNOT)   SPC   deeds:DeedPredicate   // TODO: iff Policy
    { return droles.map(roles => ({ roles, deeds, allow: allow === 'can' })); }

DisjunctRoles
=   head:ConjunctRoles   tail:(SPC   AND   SPC   ConjunctRoles)*
    { return [head].concat(tail.map(el => el[3])); }

ConjunctRoles
=   head:Role   tail:(SPC   Role)*
    { return [head].concat(tail.map(el => el[1])).sort(); }

Role
=   IDENTIFIER

DeedPredicate
=   DQ   text:[^"\n\r]*   DQ
    { return text.join(''); }

AND         = 'and'   !IDCHAR
CAN         = 'can'   !IDCHAR   { return 'can'; }
CANNOT      = 'cannot'   !IDCHAR   { return 'cannot'; }
DQ          = '"'
EOF         = !.
IDENTIFIER  = !KEYWORD   IDCHAR+   { return text(); }   // TODO: important: must be a valid literal for an MM predicate
IDCHAR      = [a-zA-Z0-9._-]
KEYWORD     = AND / CAN / CANNOT
NL          = [\r\n]+
SPC         = [ \t]+

WS          = (SPC / NL / WS_SCOMMENT / WS_MCOMMENT)+
WS_MCOMMENT    = '/*'   (!'*/' .)*   '*/'
WS_SCOMMENT    = '//'   (!NL !EOF .)*
