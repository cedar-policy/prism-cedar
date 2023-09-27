// see https://docs.cedarpolicy.com/policies/templates.html
permit (
  principal in ?principal,
  action in [Action::"comment"], 
  resource in ?resource
)
unless {
  context.readOnly == true
};