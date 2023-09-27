// decimal(), lessThan, lessThanOrEqual, greaterThan, greaterThanOrEqual
// see https://docs.cedarpolicy.com/policies/syntax-operators.html#decimal-parse-string-and-convert-to-decimal
permit (principal, action, resource)
when
{
  (decimal("1.23").lessThan(decimal("1.24")) &&
   decimal("1.23").lessThanOrEqual(decimal("1.24"))) ||
  (decimal("1.24").greaterThan(decimal("1.23")) &&
   decimal("1.24").greaterThanOrEqual(decimal("1.23")))
};