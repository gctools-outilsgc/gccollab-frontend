targetScope = 'subscription'

param prNumber string = 'latest'
param location string = 'canadaeast'

resource prResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: 'gccollab-dev-pr-${prNumber}'
  location: location
}

module collab './pr-instance.bicep' = {
  name: prResourceGroup.name
  scope: resourceGroup(prResourceGroup.name)
  params: {
    location: location
  }
}
