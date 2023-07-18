targetScope = 'subscription'

param prNumber string = 'latest'
param location string = 'Canada East'

resource prResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: 'gccollab-dev-pr-${prNumber}'
  location: location
}

module collab './pr-instance.bicep' = {
  name: 'gcc-pr-infra'
  scope: resourceGroup(prResourceGroup.name)
  params: {
    location: location
  }
}
