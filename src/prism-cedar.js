//! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//! SPDX-License-Identifier: Apache-2.0
/*
Language: Cedar
Website: https://www.cedarpolicy.com/
*/
// see https://prismjs.com/extending.html and https://prismjs.com/tokens.html
Prism.languages['cedar'] = {
  comment: {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  keyword: /\b(?<!\.)(?:permit|forbid|when|unless)\b/,
  // don't worry about excluding . before boolean reserved identifiers
  boolean: /\b(?:false|true)\b/,
  symbol: /\?(?:principal|resource)\b/,
  variable: /\b(?<![\.\?])(?:principal|action|resource|context)\b/,
  number: /\b0|\-?[1-9](_?[0-9])*/,
  operator: [
    {
      pattern: /(?:&&|\|\||==|!=|>=|<=|>|<|\+|-|\*)/,
    },
    {
      // don't worry about excluding . before operator reserved identifiers
      pattern: /\b(?:in|like|has|if|then|else|is)\b/,
    },
  ],
  'class-name': [
    {
      pattern: /\b(?:([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?=::)/, // (?=::")
    },
    {
      pattern: /(\s+is\s+)([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
      greedy: true, // since "is" is defined above as operator
      lookbehind: true,
    },
  ],
  builtin: /\b(?:ip|decimal)(?=\()/,
  function: [
    {
      // methods
      pattern: /(?=.)(contains|containsAll|containsAny)(?=\()/,
    },
    {
      // decimal methods
      pattern:
        /(?=.)(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)(?=\()/,
    },
    {
      // ip methods
      pattern: /(?=.)(isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
      greedy: true,
    },
  ],
};
