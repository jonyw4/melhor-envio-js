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
[MelhorEnvioGetShipmentCalculateShipmentResponseItem] | 
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
**Returns**: `Promise.<Array.<MelhorEnvioGetShipmentCalculateShipmentResponseItem>, (Error)>` - Return all shipment quote, or an error if rejected. (Optional)  

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


## MelhorEnvioGetShipmentCalculateShipmentResponseItem

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Id | `number` | Id |
| name | `string` | Name |
| price | `number` | Shipment Price |
| custom_price | `number` | Custom price |
| discount | `number` | Discount |
| currency | `string` | Currency |
| delivery_time | `number` | Delivery time in days |
| delivery_range | `object` | Range of delivery in days |
| delivery_range.min | `number` | Minimum value for delivery in days |
| delivery_range.max | `number` | Maximum value for delivery in days |
| custom_delivery_time | `number` | Custom delivery time |
| custom_delivery_range | `object` | Range of custom delivery |
| custom_delivery_range.min | `number` | Minimum value for custom delivery |
| custom_delivery_range.max | `number` | Maximum value for custom delivery |
| packages | `Array` | Packages |
| additional_services | `object` | Additional Services |
| additional_services.receipt | `boolean` | If the additional service receipt is active |
| additional_services.own_hand | `boolean` | If the additional service own hand is active |
| additional_services.collect | `boolean` | If the shipment will be collected |
| company | [`MelhorEnvioCompany`] | Company information |


## MelhorEnvioCompany

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `number` | Id |
| name | `string` | Name |
| picture | `string` | Picture |


## MelhorEnvioBoxRange

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| weight | `object` | Range of weight |
| weight.min | `number` | Minimum value for weight |
| weight.max | `number` | Maximum value for weight |
| width | `object` | Range of width |
| width.min | `number` | Minimum value for width |
| width.max | `number` | Maximum value for width |
| height | `object` | Range of height |
| height.min | `number` | Minimum value for height |
| height.max | `number` | Maximum value for height |
| length | `object` | Range of length |
| length.min | `number` | Minimum value for length |
| length.max | `number` | Maximum value for length |
| sum | `number` | sum |


## MelhorEnvioGetShipmentServicesResponseItem

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `number` | Id |
| name | `string` | Name |
| type | `string` | Type |
| range | `string` | range |
| restrictions | `object` | Restriction information |
| restrictions.insurance_value | `object` | Range of insurance allowed |
| restrictions.insurance_value.min | `number` | Minimum value for insurance |
| restrictions.insurance_value.max | `number` | Maximum value for insurance |
| restrictions.formats | `object` | A list of allowed formats |
| restrictions.formats.box | [`MelhorEnvioBoxRange`] | Box format limits |
| \[restrictions.formats.roll\] | [`MelhorEnvioBoxRange`] | Roll format limits |
| \[restrictions.formats.letter\] | [`MelhorEnvioBoxRange`] | Letter format limits |
| requirements | `Array` | Requirements |
| optionals | `Array` | optionals services |
| company | [`MelhorEnvioCompany`] | Company information |

<!-- LINKS -->

[melhor-envio-js]:#melhor-envio-js
[AxiosTestError]:#axiostesterror
[MelhorEnvioPackage]:#melhorenviopackage
[MelhorEnvioCalculateShipmentProduct]:#melhorenviocalculateshipmentproduct
[MelhorEnvioGetShipmentCalculateShipmentResponseItem]:#melhorenviogetshipmentcalculateshipmentresponseitem
[MelhorEnvioCompany]:#melhorenviocompany
[MelhorEnvioBoxRange]:#melhorenvioboxrange
[MelhorEnvioGetShipmentServicesResponseItem]:#melhorenviogetshipmentservicesresponseitem
[.MelhorEnvio]:#melhor-envio-jsmelhorenvio
[`melhor-envio-js`]:#melhor-envio-js
[`MelhorEnvio`]:#new-melhorenviotoken-issandbox-timeout
[`MelhorEnvioPackage`]:#melhorenviopackage
[`MelhorEnvioCompany`]:#melhorenviocompany
[`MelhorEnvioBoxRange`]:#melhorenvioboxrange
[new MelhorEnvio(token, \[isSandbox\], \[timeout\])]:#new-melhorenviotoken-issandbox-timeout
[~calculateShipment(fromPostalCode, toPostalCode, \[packageData\], \[productsData\], \[services\], \[receipt\], \[ownHand\], \[insuranceValue\])]:#melhorenviocalculateshipmentfrompostalcode-topostalcode-packagedata-productsdata-services-receipt-ownhand-insurancevalue
[~fetch(url, \[method\], \[params\], \[data\])]:#melhorenviofetchurl-method-params-data
[~getShipmentServices()]:#melhorenviogetshipmentservices
