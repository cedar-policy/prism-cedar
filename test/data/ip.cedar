// ip(), isIpv4, isIpv6, isLoopback, isMulticast, isInRange
// see https://docs.cedarpolicy.com/policies/syntax-operators.html#ip-address-functions
permit (principal, action, resource)
when
{
  ip("127.0.0.1").isIpv4() &&
  ip("127.0.0.2").isLoopback() &&
  ip("::1").isIpv6() &&
  ip("ff00::2").isMulticast() &&
  ip("192.168.0.1").isInRange(ip("192.168.0.1/24"))
};