// Annotation ::= '@' ANYIDENT ( '('STR')' )?
// see https://docs.cedarpolicy.com/policies/syntax-grammar.html#grammar-annotation
@id("policy0")
@advice("contact support")
permit (principal, action, resource);

// the value is optional
@doNotOptimize
permit (principal, action, resource);

// ANYIDENT, not IDENT, so reserved words are legal annotation names
@is("reserved")
@if("reserved")
@true("reserved")
@__cedar("reserved")
forbid (principal, action, resource);

// an annotation value is a string, and a '@' inside a string is not an annotation
@doc("see @id and https://docs.cedarpolicy.com/")
permit (principal, action, resource)
when { context.note == "@notAnAnnotation" };
