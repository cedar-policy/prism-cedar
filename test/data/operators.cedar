// RELOP ::= '<' | '<=' | '>=' | '>' | '!=' | '==' | 'in'
// Unary ::= ['!' | '-']x4 Member
// see https://docs.cedarpolicy.com/policies/syntax-operators.html
permit (principal, action, resource)
when { context.a == 1 && context.b != 2 }
when { context.c < 3 || context.d <= 4 }
when { context.e > 5 && context.f >= 6 }
when { context.g + 1 - 2 * 3 == 0 }
when { !context.flag }
when { !(principal in Group::"family") }
when { !!context.flag };

// operators are scoped with or without surrounding whitespace
permit (principal, action, resource)
when { true&&false||true }
when { context.a==1 }
when { context.a!=1 }
when { context.a+1>2 }
when { context.a-1<=2 }
when { context.a*2>=4 };

// the word operators
permit (principal, action, resource)
when { principal has jobLevel }
when { principal has "owner info" }
when { resource.name like "s3:*" }
when { resource is Photo }
when { principal in Group::"friends" }
when { if context.a == 1 then true else false };
