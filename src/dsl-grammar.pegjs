// Start rule
RuleSet
=   WS?   head:CompoundRule   tail:(WS?   CompoundRule)*   WS?   EOF
    { return [].concat.apply([], head.concat(tail.map(el => el[1]))); }

// Non-terminals
CompoundRule
=   cmasks:ClearanceMaskList   SPC   policy:(CAN/CANNOT)   SPC   intentionMask:IntentionMask   // TODO: iff Policy
    { return cmasks.map(clearanceMask => ({ clearanceMask, intentionMask, allow: policy === 'can' })); }

ClearanceMaskList
=   head:ClearanceMask   tail:(SPC   AND   SPC   ClearanceMask)*
    { return [head].concat(tail.map(el => el[3])); }

ClearanceMask
=   head:Clearance   tail:(SPC   Clearance)*
    { return '*\\[' + [head].concat(tail.map(el => el[1])).sort().join('\\]*\\[') + '\\]*'; }

Clearance
=   IDENTIFIER

IntentionMask
=   DQ   (!DQ !NL .)*   DQ
    { return text().slice(1, -1); }

// Terminals
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
