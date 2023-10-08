permit (
  principal,
  action == NameSpace::Action::"readObjects",
  resource in NameSpace::Container::"container"
)
when { resource.tenant == principal.custom.tenant_id }
when
{
  if
    resource has owner
  then
    resource.owner == principal.custom.user_id
  else
    true
};