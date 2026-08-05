//! Copyright Cedar Contributors
//! SPDX-License-Identifier: Apache-2.0
/*
Language: Cedar
Website: https://www.cedarpolicy.com/
*/
// see https://prismjs.com/extending.html and https://prismjs.com/tokens.html
//
// Grammar references:
//   policy -> https://docs.cedarpolicy.com/policies/syntax-grammar.html
//   schema -> https://docs.cedarpolicy.com/schema/human-readable-schema-grammar.html
Prism.languages['cedar'] = {
  // COMMENT := '//' ~NEWLINE* NEWLINE
  // No lookbehind guard: `string` is also greedy, so Prism's greedy-token
  // resolution keeps `"https://example.com"` a single string. Guarding on a
  // preceding ':' only produced false negatives (e.g. `A::B:://comment`).
  comment: {
    pattern: /\/\/.*/,
    greedy: true,
  },
  string: {
    pattern: /(["])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  // Annotation ::= '@' ANYIDENT ( '('STR')' )?
  // ANYIDENT, not IDENT, so reserved words are legal annotation names (@is, @if).
  // Matched before `keyword`/`boolean`/`operator` so those words do not win, and
  // after `string` so the annotation value stays a string. The value is optional.
  annotation: {
    pattern: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    greedy: true,
  },
  // Effect ::= 'permit' | 'forbid', plus Condition ::= ('when' | 'unless').
  keyword: [
    {
      pattern: /\b(?<!\.)(?:permit|forbid|when|unless)\b/,
    },
    {
      // Expr ::= Or | 'if' Expr 'then' Expr 'else' Expr
      // don't worry about excluding . before operator reserved identifiers
      pattern: /\b(?:if|then|else)\b/,
    },
  ],
  // don't worry about excluding . before boolean reserved identifiers
  boolean: /\b(?:false|true)\b/,
  symbol: /\?(?:principal|resource)\b/,
  variable: /\b(?<![\.\?])(?:principal|action|resource|context)\b/,
  // INT ::= '-'? ['0'-'9']+
  // The sign is left to `operator` so that `a - 1` keeps its operator, and the
  // \b anchors stop digits inside an identifier from being scoped as numbers
  // (`context.i18n`, `context.a1`, `k8s`).
  number: /\b[0-9]+\b/,
  operator: [
    {
      // '!' must follow '!=' so the two-character operator wins.
      pattern: /(?:&&|\|\||==|!=|>=|<=|>|<|\+|-|\*|!)/,
    },
    {
      // RELOP 'in' and the Relation-level word operators.
      // don't worry about excluding . before operator reserved identifiers
      pattern: /\b(?:in|like|has|is)\b/,
    },
  ],
  'class-name': [
    {
      // Relation ::= ... | Add 'is' Path ('in' Add)?
      pattern: /(\s+is\s+)([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
      greedy: true, // since "is" is defined above as operator
      lookbehind: true,
    },
    {
      // Entity ::= Path '::' STR -- the '::"' lookahead keeps this from firing
      // on a bare Path such as the `__cedar::` prefix of an ExtFun call.
      pattern: /\b(?:([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?=::")/,
      greedy: true,
    },
  ],
  builtin: /\b(?:ip|decimal|datetime|duration)(?=\()/,
  function: [
    {
      // methods -- Access ::= '.' IDENT ['(' [ExprList] ')']
      // The lookbehind requires the receiver dot, so a bare `contains(` is not
      // scoped as a method. Longest alternatives first.
      pattern:
        /(?<=\.)(?:containsAll|containsAny|contains|isEmpty|getTag|hasTag)(?=\()/,
    },
    {
      // decimal methods
      pattern:
        /(?<=\.)(?:lessThanOrEqual|lessThan|greaterThanOrEqual|greaterThan)(?=\()/,
    },
    {
      // ip methods
      pattern:
        /(?<=\.)(?:isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
      greedy: true,
    },
    {
      // datetime methods
      pattern: /(?<=\.)(?:offset|durationSince|toDate|toTime)(?=\()/,
      greedy: true,
    },
    {
      // duration methods
      pattern:
        /(?<=\.)(?:toMilliseconds|toSeconds|toMinutes|toHours|toDays)(?=\()/,
      greedy: true,
    },
  ],
  // '::' first so a Path separator is not split into two ':' tokens.
  punctuation: /::|[(){}[\],;.:]/,
};

Prism.languages['cedarschema'] = {
  // COMMENT := '//' ~NEWLINE* NEWLINE -- see the note on the policy comment rule.
  comment: {
    pattern: /\/\/.*/,
    greedy: true,
  },
  // AttrDecls := Annotations Name ['?'] ':' Type, and Name := IDENT | STR, so a
  // quoted attribute name is a property rather than a string. This has to be
  // matched before `string`, which is greedy and would otherwise claim it. The
  // trailing-':' lookahead is what keeps it from firing on an ordinary string
  // that happens to contain a colon, such as `@doc("id: the task id")`.
  'string-property': {
    pattern: /"(?:\\[\s\S]|[^\\"\r\n])*"(?=\s*[?]?:(?!:))/,
    greedy: true,
    alias: 'property',
  },
  string: {
    pattern: /(["])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  // Annotation := '@' IDENT '(' STR ')' -- legal before a namespace, an entity,
  // an action, a type declaration and each attribute declaration. Matched after
  // `string` so a '@' inside a string literal is not treated as an annotation.
  annotation: {
    pattern: /@[_a-zA-Z][_a-zA-Z0-9]*/,
    greedy: true,
  },
  // PRIMTYPE := 'Long' | 'String' | 'Bool'; RESERVED adds Boolean, Entity,
  // Extension, Record and Set; the extension types are ipaddr, decimal,
  // datetime and duration. Restricted to type position -- after ':' in an
  // attribute, after '=' in a type declaration, inside 'Set<...>', or after
  // 'tags' -- so that `entity String;` and an attribute named `Set` are not
  // mistaken for built-in types.
  //
  // This must precede `operator` and `keyword`: Prism consumes matched text as
  // it walks the rules in order, so if '=' were tokenized first the lookbehind
  // would no longer see it (`type Alias = Long;`), and likewise for `tags`.
  builtin:
    /(?<=[:=<]\s*|\btags\s+)(?<!::\s*)(?:Boolean|Bool|Long|String|Record|Entity|Extension|Set|ipaddr|decimal|datetime|duration)\b/,
  keyword: [
    {
      // Entity := ... [['='] RecType] ['tags' Type] ';'
      // RecType is optional, so `tags` is not gated on a preceding '}'.
      //
      // Listed first because the assertions need the surrounding text raw:
      // Prism consumes matched text as it walks the rules, so once
      // `type|entity|action` below has been tokenized the lookbehind can no
      // longer see it.
      //
      // The lookbehinds rule out `tags` used as the declared name
      // (`entity tags in P;`, `action tags appliesTo {..}`, `entity E, tags;`)
      // and the lookahead rules out an attribute name, a declared type name and
      // a type reference. A real `tags` clause is always followed by a Type.
      pattern:
        /(?<!\b(?:entity|action|type)\s+)(?<!,\s*)\btags\b(?!\s*[?]?[:;,=})\]])/,
    },
    {
      pattern: /\b(?:type|entity|action)(?=\s+)/,
    },
    {
      pattern: /\b(?:in)\b/,
    },
    {
      // Entity := ... 'entity' Idents 'enum' '[' STR+ ']' ';'
      pattern: /\benum\b(?=\s*\[)/,
    },
    {
      pattern: /\b(?:appliesTo)(?=\s*{)/,
    },
  ],
  // Placed after `keyword` so that the `tags` rule above still sees the raw '='
  // and can rule out `type tags = Long;`.
  operator: /=/,
  // Namespace := (Annotations 'namespace' Path '{' {Decl} '}') | Decl
  'namespace-declaration': {
    pattern:
      /\bnamespace\s+(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
    inside: {
      keyword: /^namespace/,
      namespace: /(?:[_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*$/,
    },
  },
  property: /\b(?:[_a-zA-Z][_a-zA-Z0-9]*)(?=[?]?:(?!:))/,
  // EntType := Path
  'entity-type': {
    pattern: /\b(?:([_a-zA-Z][_a-zA-Z0-9]*::)+[_a-zA-Z][_a-zA-Z0-9]*)/,
    inside: {
      // '+' not '*': a zero-length match here makes Prism emit a run of empty
      // namespace tokens, and the outer pattern already requires one segment.
      namespace: /^([_a-zA-Z][_a-zA-Z0-9]*::)+/,
    },
  },
  // '::' first, and '<' '>' are the SetType brackets.
  punctuation: /::|[(){}[\],;:<>]/,
};
