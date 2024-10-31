// inspired by https://www.cedarpolicy.com/blog/cedar-for-kubernetes
forbid (
    principal is k8s::User,
    action in [k8s::Action::"list", k8s::Action::"update"],
    resource is k8s::Resource
) when {
    principal in k8s::Group::"block-list"
};