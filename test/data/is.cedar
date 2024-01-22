// https://docs.cedarpolicy.com/policies/syntax-operators.html#operator-is
permit (
  principal is User in Group::"friends",
  action,
  resource in Group::"friends"
)
unless
{
  // false - `ExampleCo::User` and `User` are different entity types
  ExampleCo::User::"alice" is User
};