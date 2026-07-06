// numbers should be whole tokens; `-` is an operator, not part of the number.
// leading zeros (01, 007) are valid Cedar and should be highlighted;
// `0` inside/at the end of an identifier (count0, a0b) must stay a plain variable.
// a digit glued to following text (0has, 0.attr) still highlights the leading number.
permit (principal, action, resource)
when
{
  context.a == -5 &&
  context.b == 0 &&
  context.c == -0 &&
  context.count0 == 42 &&
  context.a0b == 7 &&
  context.d == 10 &&
  context.e == 101 &&
  context.f == 01 &&
  context.g == 007 &&
  0has attr &&
  0.attr
};
