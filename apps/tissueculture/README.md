
# Documentación de Reporte de Tissue Culture

## Reportes

### Production Forcast [production_forcast](https://ms.linkaform.com/servicos/tissueculture/production_forcast.html)

Reporte para conocer los requerimientos de la demanda y la capacidad de produccion actual

#### Parametros de Filtrado

Parametros para pintar elementos de reporte.

|Parametro|Tipo|Descripcion|
|---|---|---|
|YearWeekFrom|int|Año y semana desde en el formato 202210 |
|YearWeekTo|int|Año y semana hasta en el formato 202210 |

#### Elementos del Reporte


El reporte en su primer elemento debe de recibir un json

|Nombre|Field|Descripcion|
|---|---|---|
|response|json|respuesta del script|


console.log('Data', res.response.firstElement.tabledata)
console.log('Data', res.response.firstElement.colsData)

##### Schema del response

|Nombre|Field|Descripcion|
|---|---|---|
|firstElement|json|JSON con los datos para llenar el firstElement|
|firstElement.tabledata|list|Lista de JSONs con datos de la tabla|
|firstElement.colsData|list|Lista de JSONs con los encabezados de la tabla|

##### Schema del tabledata

|Name|Field Name|Field|Descripcion|
|---|---|---|---|
|Plant Code| plant_code|text|Codigo de la Planta|
|Botanical Name|plant_name|text|Nombre de la plata|
|Actualsa Previews Weeks | actuals_previews|int|Cantidad de Plantas disponibles que tuviero que haber sido cortadas en semanas anteriories|
|Actuals | actuals|int|Cantidad de Plantas disponibles para cortar en la semana actual|
|Acutals XXXXXX |actualsXXX|int|Actuals seguido del el YearWeek de corte, para indicar cuantos habia en cada semana|
|A. Forcast S2|forcasts2|int|Inidca en cuantas plantas de los actuals se convertirian el total de actuals si los pasamos a etapa 2|
|A. Forcast S3|forcasts3|int|Inidca en cuantas plantas de los actuals se convertirian el total de actuals si los pasamos a etapa 3|
|Stage S2 Req|reqS2XXXXX|int|Indica los requeridos para la etapa 2 en dicha semana|
|Stage S3 Req|reqS3XXXXX|int|Indica los requeridos para la etapa 3 en dicha semana|


### Forcast by Cycle [forcast_by_cycle](https://ms.linkaform.com/servicos/tissueculture/forcast_by_cycle.html)

Reporte para conocer el inventario y la demanda por cyclos

#### Parametros de Filtrado

Parametros para pintar elementos de reporte.

|Parametro|Tipo|Descripcion|
|---|---|---|
|plant_code|text|Codigo de la planta en MAYUSCULAS |

#### Elementos del Reporte


El reporte en su primer elemento debe de recibir un json

|Nombre|Field|Descripcion|
|---|---|---|
|response|json|respuesta del script|
            self.items[item_type][item_id] = self.get_item_id(item_type, item_id)
        return self.items[item_type][item_id]

    def get_last_version(self, last_version_uri, answers_only=True, jwt_settings_key=False):
        if type(last_version_uri) == dict:
            uri = last_version_uri.get('uri')
        else:
            uri = last_version_uri
        print('self.dest_url  ', self.api_url.dest_url )
        url = self.api_url.dest_url +  uri
        method = self.api_url.form['version']['method']

        response = self.network.dispatch(url=url, method=method, jwt_settings_key=jwt_settings_key)

        if response['status_code'] == 200:
            if answers_only:
                return response['data'].get('answers')
            return response['data']
        return False

    def get_data(self, item_type, item_id, refresh=False):
        if not self.items_data.get(item_type):
            self.items_data[item_type] = {}

##### Schema del response

|Nombre|Field|Descripcion|
|---|---|---|
|firstElement|json|JSON con los datos para llenar el firstElement|
|firstElement.tabledata|list|Lista de JSONs con datos de la tabla|
|firstElement.colsData|list|Lista de JSONs con los encabezados de la tabla|

##### Schema del tabledata

|Name|Field Name|Field|Descripcion|
|---|---|---|---|
|Plant Code| plant_code|text|Codigo de la Planta|
|Row Type | row_typw|text|Indica si es Fufilmet, Required o Acutals|
|Total Actuals | cycle_x|int|Cantidad de Plantas disponibles de todos los cyclos combinados estimadas (se obtine el ultimo reporte de corte y se multiplica por su factor)|
|Total Required | cycle_x|int|Cantidad de Plantas requeridas de todos los cyclos combinados|
|Total Fulfillment | cycle_x|int|Diferencia entre Actuals y Required|
|Cycle # | cycle_x|int|Cantidad de Plantas disponibles (estimadas), requeridas o su diferencia de dicho cyclo|
