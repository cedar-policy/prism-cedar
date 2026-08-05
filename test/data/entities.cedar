// Entity ::= Path '::' STR
// Path   ::= IDENT {'::' IDENT}
// An entity literal always ends in a string; a bare Path is a type or an ExtFun.
permit (principal, action, resource)
when { principal == User::"alice" }
when { principal == ExampleCo::User::"alice" }
when { resource in A::B::C::Folder::"shared" }
when { action == Action::"view" };

// a Path in `is` position is a type, not an entity literal
permit (
  principal is ExampleCo::User,
  action in [Action::"view", Action::"edit"],
  resource is Photo
);

// comments are recognized even directly after a path separator
permit (principal, action, resource)
when { Namespace::User::"alice" == principal };// no space before this comment

// poorly formed: `__cedar` is reserved everywhere in a policy, and no qualified
// ExtFun call is valid, so neither `__cedar` nor `decimal` here forms a Path --
// this checks that the leading segment is not scoped as an entity type
permit (principal, action, resource)
when { __cedar::decimal("1.0").lessThan(decimal("2.0")) };
