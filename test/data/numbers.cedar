// INT ::= '-'? ['0'-'9']+
// see https://docs.cedarpolicy.com/policies/syntax-grammar.html#grammar-int
permit (principal, action, resource)
when { context.zero == 0 }
when { context.n == 42 }
when { context.max == 9223372036854775807 }
// leading zeros are a single INT per the grammar
when { context.padded == 007 }
// the sign is an operator, so subtraction keeps its operator
when { context.a - 1 == 0 }
when { context.b == -42 }
when { 5 - (-3) == 8 };

// digits inside an identifier are not numbers
permit (principal, action, resource)
when { context.i18n == 1 }
when { context.a1 == 1 }
when { context.utf8 == "yes" }
when { principal is k8s::User }
// nor are digits inside a path segment
when { principal == V2::User::"alice" }
when { resource in A1::B2::C3::Folder::"shared" }
when { principal == _2::User::"bob" };

// poorly formed: Cedar has no digit separators, so 1_000 is not an INT
permit (principal, action, resource)
when { context.budget == 1_000 };
