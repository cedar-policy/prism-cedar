// see https://docs.cedarpolicy.com/policies/syntax-policy.html
@id("F1")
forbid (principal, action, resource)
when { resource.private }
unless { principal == resource.owner };

// see https://docs.cedarpolicy.com/policies/syntax-operators.html
@id("F2")
forbid (principal, action, resource)
when
{
  (true == false || true == !true || true != true) &&
  (1 > 2 || 1 >= 2) &&
  (2 < 1 || 2 <= 1) &&
  (1 == -1) &&
  "true" like "false"
};