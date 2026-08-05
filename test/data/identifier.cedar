// poorly formed: This identifier is reserved and cannot be used: XX
permit (principal, action, resource)
when { resource.ip == ip("127.0.0.1") }
when { resource.decimal == decimal("0.1234") }
when { resource.datetime == datetime("2024-10-15T11:35:00Z") }
when { resource.duration == duration("1d12h") }
when { resource.if.in.has.then.else.like.is.true.false }
when { resource.principal.resource.action.context }
when { resource.permit.forbid.when.unless };