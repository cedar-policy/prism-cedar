// the logical-not operator `!` should be highlighted as an operator
permit (principal, action, resource)
when
{
  !false &&
  !(principal == resource) &&
  !!true
};
