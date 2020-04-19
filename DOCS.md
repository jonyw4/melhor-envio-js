## Modules
Module | Description
------ | -----------
[melhor-envio-js] | 

## Classes

Name | Description
------ | -----------
[AxiosTestError] | 

## Typedefs

Name | Description
------ | -----------
[MelhorEnvioPackage] | 
[MelhorEnvioCalculateShipmentProduct] | 
[MelhorEnvioGetShipmentCalculateShipmentItem] | 
[MelhorEnvioCompany] | 
[MelhorEnvioBoxRange] | 
[MelhorEnvioGetShipmentServicesResponseItem] | 


## melhor-envio-js


* [melhor-envio-js]
    * [.MelhorEnvio]
        * [new MelhorEnvio(token, \[isSandbox\], \[timeout\])]
        * [~calculateShipment(fromPostalCode, toPostalCode, \[packageData\], \[productsData\], \[services\], \[receipt\], \[ownHand\], \[insuranceValue\])]
        * [~fetch(url, \[method\], \[params\], \[data\])]
        * [~getShipmentServices()]


### melhor-envio-js.MelhorEnvio

**Kind**: instance class of [`melhor-envio-js`]  

* [.MelhorEnvio]
    * [new MelhorEnvio(token, \[isSandbox\], \[timeout\])]
    * [~calculateShipment(fromPostalCode, toPostalCode, \[packageData\], \[productsData\], \[services\], \[receipt\], \[ownHand\], \[insuranceValue\])]
    * [~fetch(url, \[method\], \[params\], \[data\])]
    * [~getShipmentServices()]


#### new MelhorEnvio(token, \[isSandbox\], \[timeout\])


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | `string` |  | Token for API Requests. Can be generated direct in Melhor Envio Dashboard. |
| \[isSandbox\] | `boolean` | `false` | Use or not a sandbox environment for testing. (Optional) |
| \[timeout\] | `number` | `5000` | Timeout of the request. (Optional) |


#### MelhorEnvio~calculateShipment(fromPostalCode, toPostalCode, \[packageData\], \[productsData\], \[services\], \[receipt\], \[ownHand\], \[insuranceValue\])

💵 Calculate quote for shipment

**Kind**: inner method of [`MelhorEnvio`]  
**Returns**: `Promise.<Array.<MelhorEnvioGetShipmentCalculateShipmentItem>, (Error)>` - Return all shipment quote, or an error if rejected. (Optional)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromPostalCode | `string` |  | Origin Postal Code |
| toPostalCode | `string` |  | Destination Postal Code |
| \[packageData\] | [`MelhorEnvioPackage`] | `{}` | All data of package. **If you chose these option you cant choose `productsData`** |
| \[productsData\] | `Array.<MelhorEnvioCalculateShipmentProduct>` | `[]` | A list of product required for calculate quote. **If you chose these option you cant choose `packageData`** |
| \[services\] | `Array` | `[]` | A list of services ID that you want to get in response (Optional) |
| \[receipt\] | `boolean` | `false` | If you want a receipt service (Optional) |
| \[ownHand\] | `boolean` | `false` | If you want a own hand service (Optional) |
| \[insuranceValue\] | `number` | `0` | **Used only if you use packageData**. Value for the insurance (Optional) |


#### MelhorEnvio~fetch(url, \[method\], \[params\], \[data\])

**FOR INTERNAL USE** - 📨 Fetch in the RTE API

**Kind**: inner method of [`MelhorEnvio`]  
**Returns**: `Promise.<any, (Error)>` - Data response of the fetch, or an error if rejected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | `string` |  | URL. Route to the fetch. can be `/test` |
| \[method\] | `string` | `'GET'` | Method. Can be *GET*. *POST*. |
| \[params\] | `object` | `{}` | Querystring params. Its most used in *GET* requests. (Optional) |
| \[data\] | `object` | `{}` | Data. Use for *POST* requests. (Optional) |


#### MelhorEnvio~getShipmentServices()

📖 Get all services of shipments

**Kind**: inner method of [`MelhorEnvio`]  
**Returns**: `Promise.<Array.<MelhorEnvioGetShipmentServicesResponseItem>, (Error)>` - Return all services information, or an error if rejected.  

## AxiosTestError

**Kind**: global class  
**Extends**: `Error`  

## MelhorEnvioPackage

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | `number` | Width (cm) |
| height | `number` | Height (cm) |
| length | `number` | Length (cm) |
| weight | `number` | Weigh (kg) |


## MelhorEnvioCalculateShipmentProduct

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | ID |
| width | `number` | Width (cm) |
| height | `number` | Height (cm) |
| length | `number` | Length (cm) |
| weight | `number` | Weigh (kg) |
| insurance_value | `number` | Value for the insurance |
| quantity | `number` | Qty of items |


## MelhorEnvioGetShipmentCalculateShipmentItem

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| company | `getShipmentServices.MelhorEnvioCompany` | Company information |
| \[error\] | `string` | A message of error. (Only if don't return information) |


## MelhorEnvioCompany

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | ID |


## MelhorEnvioBoxRange

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | ID |


## MelhorEnvioGetShipmentServicesResponseItem

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| restrictions | `object` | Restriction information |
| restrictions.insurance_value | `object` | Range of insurance allowed |
| restrictions.formats | `object` | A list of allowed formats |
| restrictions.formats.box | [`MelhorEnvioBoxRange`] | Box format limits |
| \[restrictions.formats.roll\] | [`MelhorEnvioBoxRange`] | Roll format limits. (Optional) |
| \[restrictions.formats.letter\] | [`MelhorEnvioBoxRange`] | Letter format limits. (Optional) |
| company | [`MelhorEnvioCompany`] | Company information |

<!-- LINKS -->

[melhor-envio-js]:#melhor-envio-js
[AxiosTestError]:#axiostesterror
[MelhorEnvioPackage]:#melhorenviopackage
[MelhorEnvioCalculateShipmentProduct]:#melhorenviocalculateshipmentproduct
[MelhorEnvioGetShipmentCalculateShipmentItem]:#melhorenviogetshipmentcalculateshipmentitem
[MelhorEnvioCompany]:#melhorenviocompany
[MelhorEnvioBoxRange]:#melhorenvioboxrange
[MelhorEnvioGetShipmentServicesResponseItem]:#melhorenviogetshipmentservicesresponseitem
[.MelhorEnvio]:#melhor-envio-jsmelhorenvio
[`melhor-envio-js`]:#melhor-envio-js
[`MelhorEnvio`]:#new-melhorenviotoken-issandbox-timeout
[`MelhorEnvioPackage`]:#melhorenviopackage
[`MelhorEnvioBoxRange`]:#melhorenvioboxrange
[`MelhorEnvioCompany`]:#melhorenviocompany
[new MelhorEnvio(token, \[isSandbox\], \[timeout\])]:#new-melhorenviotoken-issandbox-timeout
[~calculateShipment(fromPostalCode, toPostalCode, \[packageData\], \[productsData\], \[services\], \[receipt\], \[ownHand\], \[insuranceValue\])]:#melhorenviocalculateshipmentfrompostalcode-topostalcode-packagedata-productsdata-services-receipt-ownhand-insurancevalue
[~fetch(url, \[method\], \[params\], \[data\])]:#melhorenviofetchurl-method-params-data
[~getShipmentServices()]:#melhorenviogetshipmentservices
