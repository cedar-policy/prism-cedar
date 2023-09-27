// contains, containsAll, containsAny
// see https://docs.cedarpolicy.com/policies/syntax-operators.html
permit (principal, action, resource)
when
{
  [1, -22, 34].contains(1) &&
  [1, -22, 34].containsAll([-22, 1]) &&
  [1, -22].containsAny([1, -22, 34])
};