// Access ::= '.' IDENT ['(' [ExprList] ')'] | '[' STR ']'
// ExtFun ::= [Path '::'] IDENT
// A method name is only a method after a receiver dot.
permit (principal, action, resource)
when { context.tags.contains("a") }
when { context.tags.containsAll(["a", "b"]) }
when { context.tags.containsAny(["a", "b"]) }
when { context.tags.isEmpty() }
when { resource.hasTag("write") }
when { resource.getTag("write") == "yes" };

// the same names used as attributes are not method calls
permit (principal, action, resource)
when { context.contains == 1 }
when { context.isEmpty == 2 }
when { context.offset == 3 }
when { context.toDays == 4 };

// a bare call is an ExtFun call, not a method call
permit (principal, action, resource)
when { ip("127.0.0.1").isInRange(ip("127.0.0.0/8")) }
when { decimal("1.0").lessThan(decimal("2.0")) }
when { datetime("2024-10-15").offset(duration("1d")) > datetime("2024-10-15") }
when { duration("1d").toHours() == 24 };

// index access uses a string key
permit (principal, action, resource)
when { context["owner info"].name == "Alice" };
