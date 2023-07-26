targetScope = 'resourceGroup'

param appName string = resourceGroup().name
param location string = 'Canada East'
param siteKind string = 'windows'
param sku string = 'F1'

resource appServicePlan 'Microsoft.Web/serverfarms@2021-01-01' = {
  name: appName
  location: location
  properties: {
    reserved: false
  }
  sku: {
    name: sku
  }
  kind: siteKind
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      netFrameworkVersion: 'v4.8'
      appSettings: [
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
        {
          name: 'WEBSITE_HTTPLOGGING_RETENTION_DAYS'
          value: '7'
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '16.14.2'
        }
      ]
    }
  }
  kind: siteKind
}
