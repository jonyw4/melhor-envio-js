## Modules
Module | Description
------ | -----------
[melhor-envio-js] | 

## Classes

Name | Description
------ | -----------
[AxiosTestError] | 


## melhor-envio-js


* [melhor-envio-js]
    * [.MelhorEnvio]
        * [new MelhorEnvio(token, isSandbox, timeout)]
        * [~fetch(url, method, params, data)]


### melhor-envio-js.MelhorEnvio

**Kind**: instance class of [`melhor-envio-js`]  

* [.MelhorEnvio]
    * [new MelhorEnvio(token, isSandbox, timeout)]
    * [~fetch(url, method, params, data)]


#### new MelhorEnvio(token, isSandbox, timeout)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | `string` |  | Token for API Requests. Can be generated direct in Melhor Envio Dashboard. |
| isSandbox | `boolean` | `false` | Use or not a sandbox enviroment for testing. |
| timeout | `number` | `5000` | Timeout of the request |


#### MelhorEnvio~fetch(url, method, params, data)

**FOR INTERNAL USE** - 📨 Fetch in the RTE API

**Kind**: inner method of [`MelhorEnvio`]  
**Returns**: `Promise.<any, (Error)>` - Data response of the fetch, or an error if rejected.  

| Param | Type | Description |
| --- | --- | --- |
| url | `string` | URL. Route to the fetch. can be `/test` |
| method | `string` | Method. Can be *GET*. *POST*... |
| params | `object` | Querystring params. Its most used in *GET* requests |
| data | `object` | Data. Use for *POST* requests |


## AxiosTestError

**Kind**: global class  
**Extends**: `Error`  
<!-- LINKS -->

[melhor-envio-js]:#melhor-envio-js
[AxiosTestError]:#axiostesterror
[.MelhorEnvio]:#melhor-envio-jsmelhorenvio
[`melhor-envio-js`]:#melhor-envio-js
[`MelhorEnvio`]:#new-melhorenviotoken-issandbox-timeout
[new MelhorEnvio(token, isSandbox, timeout)]:#new-melhorenviotoken-issandbox-timeout
[~fetch(url, method, params, data)]:#melhorenviofetchurl-method-params-data
