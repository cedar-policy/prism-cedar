// you "must" be 54" tall to ride (wink)
@id("54\" rule") // 54" is 4' 6"
forbid (principal, action, resource)
when
{
  resource.restriction == "54\"" &&
  principal.height < 54 &&
  principal.attrSet.contains({
    "key": "height", 
    "values": ["54\"", "4' 6\""]
  })
};