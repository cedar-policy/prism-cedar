// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/*
Language: Cedar
Website: https://www.cedarpolicy.com/
*/
// see https://prismjs.com/extending.html and https://prismjs.com/tokens.html
Prism.languages["cedar"] = {
  comment: {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  keyword: /\b(?:permit|forbid|when|unless)\b/,
  boolean: /\b(?:false|true)\b/,
  variable: /\b(?:principal|action|resource|context)\b/,
  number: /0|\-?[1-9](_?[0-9])*/,
  operator: [
    {
      pattern: /(?:&&|\|\||==|!=|>=|<=|>|<|\+|-|\*)/,
    },
    {
      pattern: /\b(?:in|like|has|if|then|else)\b/,
    },
  ],
  //"builtin": /\b(?:ip|decimal)\b/,
  function: [
    {
      // methods
      pattern: /(?=.)(contains|containsAll|containsAny)(?=\()/,
    },
    {
      // extensions (TODO: should these be "builtin" ?)
      pattern: /\b(?:ip|decimal)\b/,
    },
    {
      // decimal methods
      pattern:
        /(?=.)(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)(?=\()/,
    },
    {
      // ip methods
      pattern: /(?=.)(isIpV4|isIpV6|isLoopback|isMulticast|isInRange)(?=\()/,
    },
  ],
};
