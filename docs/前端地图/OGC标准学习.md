> 参考 https://www.cnblogs.com/onsummer/p/16492518.html

## 参数传递方式

### 1. 键值对

### 2. RESTful API

### 3. SOAP （不常用）

## WMS

> 参考 https://blog.csdn.net/qq_35732147/article/details/81867017

### 1. API

+ GetCapabilities 获取能力
+ GetMap 获取图片
+ GetFeatureInfo 简单查询

### 2. 测试

地址：

> 站点(根) > WebGIS_Study > BeiJing
>
> [http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WMSServer](http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities)

#### GetCapabilities

```
http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
```


| KEY     | VALUE           | 描述          |
| ------- | --------------- | ------------- |
| SERVICE | WMS             |               |
| VERSION | 1.3.0           | 1.1.0 / 1.3.0 |
| REQUEST | GetCapabilities |               |


可以获取服务的信息，服务支持哪些接口，图层的元数据。

```XML
<?xml version="1.0" encoding="UTF-8"?>
<WMS_Capabilities version="1.3.0"
  xmlns="http://www.opengis.net/wms"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:esri_wms="http://www.esri.com/wms"
  xsi:schemaLocation="http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd http://www.esri.com/wms http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?version=1.3.0%26service=WMS%26request=GetSchemaExtension">
  <Service>
    <Name><![CDATA[WMS]]></Name>
    <Title><![CDATA[WebGIS_Study_BeiJing]]></Title>
    <Abstract>WMS</Abstract>
    <KeywordList><Keyword><![CDATA[]]></Keyword></KeywordList>
    <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?"/>
    <ContactInformation>
      <ContactPersonPrimary>
        <ContactPerson><![CDATA[]]></ContactPerson>
        <ContactOrganization><![CDATA[]]></ContactOrganization>
      </ContactPersonPrimary>
      <ContactPosition><![CDATA[]]></ContactPosition>
      <ContactAddress>
        <AddressType><![CDATA[]]></AddressType>
        <Address><![CDATA[]]></Address>
        <City><![CDATA[]]></City>
        <StateOrProvince><![CDATA[]]></StateOrProvince>
        <PostCode><![CDATA[]]></PostCode>
        <Country><![CDATA[]]></Country>
      </ContactAddress>
      <ContactVoiceTelephone><![CDATA[]]></ContactVoiceTelephone>
      <ContactFacsimileTelephone><![CDATA[]]></ContactFacsimileTelephone>
      <ContactElectronicMailAddress><![CDATA[]]></ContactElectronicMailAddress>
    </ContactInformation>
    <Fees><![CDATA[]]></Fees>
    <AccessConstraints><![CDATA[]]></AccessConstraints>
    <MaxWidth>4096</MaxWidth>
    <MaxHeight>4096</MaxHeight>
  </Service>
  <Capability>
    <Request>
      <GetCapabilities>
        <Format>application/vnd.ogc.wms_xml</Format>
        <Format>text/xml</Format>
        <DCPType>
          <HTTP><Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?"/></Get></HTTP>
        </DCPType>
      </GetCapabilities>
      <GetMap>
        <Format>image/bmp</Format>
        <Format>image/jpeg</Format>
        <Format>image/tiff</Format>
        <Format>image/png</Format>
        <Format>image/png8</Format>
        <Format>image/png24</Format>
        <Format>image/png32</Format>
        <Format>image/gif</Format>
        <Format>image/svg+xml</Format>
        <DCPType>
          <HTTP><Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?"/></Get></HTTP>
        </DCPType>
      </GetMap>
      <GetFeatureInfo>
        <Format>application/vnd.esri.wms_raw_xml</Format>
        <Format>application/vnd.esri.wms_featureinfo_xml</Format>
        <Format>application/vnd.ogc.wms_xml</Format>
        <Format>application/geojson</Format>
        <Format>text/xml</Format>
        <Format>text/html</Format>
        <Format>text/plain</Format>
        <DCPType>
          <HTTP><Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?"/></Get></HTTP>
        </DCPType>
      </GetFeatureInfo>
      <esri_wms:GetStyles>
        <Format>application/vnd.ogc.sld+xml</Format>
        <DCPType>
          <HTTP><Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?"/></Get></HTTP>
        </DCPType>
      </esri_wms:GetStyles>
    </Request>
    <Exception>
      <Format>application/vnd.ogc.se_xml</Format>
      <Format>application/vnd.ogc.se_inimage</Format>
      <Format>application/vnd.ogc.se_blank</Format>
      <Format>text/xml</Format>
      <Format>XML</Format>
    </Exception>
    <Layer>
      <Title><![CDATA[图层]]></Title>
<CRS>CRS:84</CRS>
<CRS>EPSG:4326</CRS>
<CRS>EPSG:3857</CRS>
 <!-- alias 3857 -->
<CRS>EPSG:102100</CRS>
<EX_GeographicBoundingBox><westBoundLongitude>115.417302</westBoundLongitude><eastBoundLongitude>117.500177</eastBoundLongitude><southBoundLatitude>39.438288</southBoundLatitude><northBoundLatitude>41.059235</northBoundLatitude></EX_GeographicBoundingBox>
<BoundingBox CRS="CRS:84" minx="115.417302" miny="39.438288" maxx="117.500177" maxy="41.059235"/>
<BoundingBox CRS="EPSG:4326" minx="39.438288" miny="115.417302" maxx="41.059235" maxy="117.500177"/>
<BoundingBox CRS="EPSG:3857" minx="12848195.300732" miny="4784648.440128" maxx="13080059.889571" maxy="5021082.739859"/>
      <Layer queryable="1">
        <Name>0</Name>
        <Title><![CDATA[Beijing]]></Title>
        <Abstract><![CDATA[]]></Abstract>
<CRS>CRS:84</CRS>
<CRS>EPSG:4326</CRS>
<CRS>EPSG:3857</CRS>
 <!-- alias 3857 -->
<CRS>EPSG:102100</CRS>
<EX_GeographicBoundingBox><westBoundLongitude>115.417302</westBoundLongitude><eastBoundLongitude>117.500177</eastBoundLongitude><southBoundLatitude>39.438288</southBoundLatitude><northBoundLatitude>41.059235</northBoundLatitude></EX_GeographicBoundingBox>
<BoundingBox CRS="CRS:84" minx="115.417302" miny="39.438288" maxx="117.500177" maxy="41.059235"/>
<BoundingBox CRS="EPSG:4326" minx="39.438288" miny="115.417302" maxx="41.059235" maxy="117.500177"/>
<BoundingBox CRS="EPSG:3857" minx="12848195.300732" miny="4784648.440128" maxx="13080059.889571" maxy="5021082.739859"/>
        <Style>
          <Name>default</Name>
          <Title>0</Title>
          <LegendURL width="58" height="272">
            <Format>image/png</Format>
            <OnlineResource xlink:href="http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=0" xlink:type="simple" xmlns:xlink="http://www.w3.org/1999/xlink" />
          </LegendURL>
        </Style>
      </Layer>
    </Layer>
  </Capability>
</WMS_Capabilities>

```

#### GetMap

```
http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&layers=0&styles=default&crs=EPSG:4326&bbox=39.438288,115.417302,41.059235,117.500177&format=image/png&width=200&height=200
```

以下为必填参数：

| KEY     | VALUE                                     | 描述                                                         |
| ------- | ----------------------------------------- | ------------------------------------------------------------ |
| SERVICE | WMS                                       |                                                              |
| VERSION | 1.3.0                                     |                                                              |
| REQUEST | GetMap                                    |                                                              |
| layers  | 0                                         | ArcGIS Server中为0，<br />GeoServer中遵循“工作空间名:图层名”<br />如：spatial_base:guangxi_cities |
| styles  | default                                   | 默认传default                                                |
| crs     | EPSG:4326                                 |                                                              |
| bbox    | 39.438288,115.417302,41.059235,117.500177 |                                                              |
| format  | image/png                                 |                                                              |
| width   | 200                                       |                                                              |
| height  | 200                                       |                                                              |

查询结果：

![img](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/SEYSFQcbY.png)



完整参数见下图：

![img](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/20180820170000853)



#### GetFeatureInfo

```
http://localhost:6080/arcgis/services/WebGIS_Study/BeiJing/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&bbox=39.438288,115.417302,41.059235,117.500177&width=200&height=200&crs=EPSG:4326&query_layers=0&info_format=application/geojson
```

| KEY          | VALUE                                     | 描述           |
| ------------ | ----------------------------------------- | -------------- |
| SERVICE      | WMS                                       |                |
| VERSION      | 1.3.0                                     |                |
| REQUEST      | GetFeatureInfo                            |                |
| layers       | 0                                         | 非必须（未知） |
| bbox         | 39.438288,115.417302,41.059235,117.500177 |                |
| width        | 200                                       |                |
| height       | 200                                       |                |
| crs          | EPSG:4326                                 |                |
| query_layers | 0                                         |                |
| info_format  | application/geojson                       |                |

没有试验成功。

```
{
    "type": "FeatureCollection",
    "features": []
}
```



## WMTS

### 1. 切片示意图

![img](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/1097074-20220718235621471-1996268123.png)

### 2. API

- `GetCapabilities`（获取WMTS元数据文档，也叫获取能力文档）
- `GetTile`（获取一张瓦片）
- `GetFeatureInfo` (可选能力)

### 3. 测试

```
WebGIS_Study/NDVI2020
http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS/1.0.0/WMTSCapabilities.xml
```



#### GetCapabilities

```
http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS?Version=1.0.0&Service=WMTS&Request=GetCapabilities
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Capabilities xmlns="http://www.opengis.net/wmts/1.0"
xmlns:ows="http://www.opengis.net/ows/1.1"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:gml="http://www.opengis.net/gml"
xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd"
version="1.0.0">
    <!-- Service Identification -->
    <ows:ServiceIdentification>
        <ows:Title>WebGIS_Study_NDVI2020</ows:Title>
        <ows:ServiceType>OGC WMTS</ows:ServiceType>
        <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
    </ows:ServiceIdentification>
    <!-- Operations Metadata -->
    <ows:OperationsMetadata>
        <ows:Operation name="GetCapabilities">
            <ows:DCP>
                <ows:HTTP>
                    <ows:Get xlink:href="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS/1.0.0/WMTSCapabilities.xml">
                        <ows:Constraint name="GetEncoding">
                            <ows:AllowedValues>
                                <ows:Value>RESTful</ows:Value>
                            </ows:AllowedValues>
                        </ows:Constraint>
                    </ows:Get>
                    <!-- add KVP binding in 10.1 -->
                    <ows:Get xlink:href="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS?">
                        <ows:Constraint name="GetEncoding">
                            <ows:AllowedValues>
                                <ows:Value>KVP</ows:Value>
                            </ows:AllowedValues>
                        </ows:Constraint>
                    </ows:Get>
                </ows:HTTP>
            </ows:DCP>
        </ows:Operation>
        <ows:Operation name="GetTile">
            <ows:DCP>
                <ows:HTTP>
                    <ows:Get xlink:href="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS/tile/1.0.0/">
                        <ows:Constraint name="GetEncoding">
                            <ows:AllowedValues>
                                <ows:Value>RESTful</ows:Value>
                            </ows:AllowedValues>
                        </ows:Constraint>
                    </ows:Get>
                    <ows:Get xlink:href="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS?">
                        <ows:Constraint name="GetEncoding">
                            <ows:AllowedValues>
                                <ows:Value>KVP</ows:Value>
                            </ows:AllowedValues>
                        </ows:Constraint>
                    </ows:Get>
                </ows:HTTP>
            </ows:DCP>
        </ows:Operation>
    </ows:OperationsMetadata>
    <Contents>
        <!--Layer-->
        <Layer>
            <ows:Title>WebGIS_Study_NDVI2020</ows:Title>
            <ows:Identifier>WebGIS_Study_NDVI2020</ows:Identifier>
            <ows:BoundingBox crs="urn:ogc:def:crs:EPSG::3857">
                <ows:LowerCorner>1.32528356581725E7 2910043.493618656</ows:LowerCorner>
                <ows:UpperCorner>1.3323730427547878E7 2982276.8896931987</ows:UpperCorner>
            </ows:BoundingBox>
            <ows:WGS84BoundingBox crs="urn:ogc:def:crs:OGC:2:84">
                <ows:LowerCorner>119.05224829660553 25.278926115604495</ows:LowerCorner>
                <ows:UpperCorner>119.68910684554584 25.8642457451911</ows:UpperCorner>
            </ows:WGS84BoundingBox>
            <Style isDefault="true">
                <ows:Title>Default Style</ows:Title>
                <ows:Identifier>default</ows:Identifier>
            </Style>
            <Format>image/jpgpng</Format>
            <TileMatrixSetLink>
                <TileMatrixSet>default028mm</TileMatrixSet>
            </TileMatrixSetLink>
            <TileMatrixSetLink>
                <!--Only show this TileMatrixSet if the tiling scheme is compliant to Google Maps (and that happens with tile width = 256 px)-->
                <TileMatrixSet>GoogleMapsCompatible</TileMatrixSet>
            </TileMatrixSetLink>
            <ResourceURL format="image/jpgpng" resourceType="tile" template="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS/tile/1.0.0/WebGIS_Study_NDVI2020/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}" />
        </Layer>
        <!--TileMatrixSet-->
        <TileMatrixSet>
            <ows:Title>TileMatrix using 0.28mm</ows:Title>
            <ows:Abstract>The tile matrix set that has scale values calculated based on the dpi defined by OGC specification (dpi assumes 0.28mm as the physical distance of a pixel).</ows:Abstract>
            <ows:Identifier>default028mm</ows:Identifier>
            <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3857</ows:SupportedCRS>
            <TileMatrix>
                <ows:Identifier>0</ows:Identifier>
                <ScaleDenominator>5.59082264028501E8</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>1</MatrixWidth>
                <MatrixHeight>1</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>1</ows:Identifier>
                <ScaleDenominator>2.7954113201425016E8</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>2</MatrixWidth>
                <MatrixHeight>1</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>2</ows:Identifier>
                <ScaleDenominator>1.3977056600712565E8</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>4</MatrixWidth>
                <MatrixHeight>2</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>3</ows:Identifier>
                <ScaleDenominator>6.988528300356229E7</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>7</MatrixWidth>
                <MatrixHeight>4</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>4</ows:Identifier>
                <ScaleDenominator>3.494264150178117E7</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>14</MatrixWidth>
                <MatrixHeight>7</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>5</ows:Identifier>
                <ScaleDenominator>1.7471320750890587E7</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>27</MatrixWidth>
                <MatrixHeight>14</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>6</ows:Identifier>
                <ScaleDenominator>8735660.375445293</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>54</MatrixWidth>
                <MatrixHeight>28</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>7</ows:Identifier>
                <ScaleDenominator>4367830.187722629</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>107</MatrixWidth>
                <MatrixHeight>55</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>8</ows:Identifier>
                <ScaleDenominator>2183915.093861797</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>214</MatrixWidth>
                <MatrixHeight>110</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>9</ows:Identifier>
                <ScaleDenominator>1091957.546930427</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>427</MatrixWidth>
                <MatrixHeight>219</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>10</ows:Identifier>
                <ScaleDenominator>545978.773465685</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>853</MatrixWidth>
                <MatrixHeight>438</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>11</ows:Identifier>
                <ScaleDenominator>272989.38673236995</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>1705</MatrixWidth>
                <MatrixHeight>876</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>12</ows:Identifier>
                <ScaleDenominator>136494.69336618498</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>3410</MatrixWidth>
                <MatrixHeight>1751</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>13</ows:Identifier>
                <ScaleDenominator>68247.34668309249</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>6820</MatrixWidth>
                <MatrixHeight>3502</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>14</ows:Identifier>
                <ScaleDenominator>34123.673341546244</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>13640</MatrixWidth>
                <MatrixHeight>7003</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>15</ows:Identifier>
                <ScaleDenominator>17061.836671245605</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>27279</MatrixWidth>
                <MatrixHeight>14005</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>16</ows:Identifier>
                <ScaleDenominator>8530.918335622784</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>54557</MatrixWidth>
                <MatrixHeight>28010</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>17</ows:Identifier>
                <ScaleDenominator>4265.459167338928</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>109114</MatrixWidth>
                <MatrixHeight>56019</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>18</ows:Identifier>
                <ScaleDenominator>2132.7295841419354</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>218227</MatrixWidth>
                <MatrixHeight>112037</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>19</ows:Identifier>
                <ScaleDenominator>1066.364791598498</ScaleDenominator>
                <TopLeftCorner>-2.0037508342787E7 2.0037508342787E7</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>436454</MatrixWidth>
                <MatrixHeight>224073</MatrixHeight>
            </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
            <ows:Title>GoogleMapsCompatible</ows:Title>
            <ows:Abstract>the wellknown 'GoogleMapsCompatible' tile matrix set defined by OGC WMTS specification</ows:Abstract>
            <ows:Identifier>GoogleMapsCompatible</ows:Identifier>
            <ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.18.3:3857</ows:SupportedCRS>
            <WellKnownScaleSet>urn:ogc:def:wkss:OGC:1.0:GoogleMapsCompatible</WellKnownScaleSet>
            <TileMatrix>
                <ows:Identifier>0</ows:Identifier>
                <ScaleDenominator>559082264.0287178</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>1</MatrixWidth>
                <MatrixHeight>1</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>1</ows:Identifier>
                <ScaleDenominator>279541132.0143589</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>2</MatrixWidth>
                <MatrixHeight>2</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>2</ows:Identifier>
                <ScaleDenominator>139770566.0071794</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>4</MatrixWidth>
                <MatrixHeight>4</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>3</ows:Identifier>
                <ScaleDenominator>69885283.00358972</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>8</MatrixWidth>
                <MatrixHeight>8</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>4</ows:Identifier>
                <ScaleDenominator>34942641.50179486</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>16</MatrixWidth>
                <MatrixHeight>16</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>5</ows:Identifier>
                <ScaleDenominator>17471320.75089743</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>32</MatrixWidth>
                <MatrixHeight>32</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>6</ows:Identifier>
                <ScaleDenominator>8735660.375448715</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>64</MatrixWidth>
                <MatrixHeight>64</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>7</ows:Identifier>
                <ScaleDenominator>4367830.187724357</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>128</MatrixWidth>
                <MatrixHeight>128</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>8</ows:Identifier>
                <ScaleDenominator>2183915.093862179</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>256</MatrixWidth>
                <MatrixHeight>256</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>9</ows:Identifier>
                <ScaleDenominator>1091957.546931089</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>512</MatrixWidth>
                <MatrixHeight>512</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>10</ows:Identifier>
                <ScaleDenominator>545978.7734655447</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>1024</MatrixWidth>
                <MatrixHeight>1024</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>11</ows:Identifier>
                <ScaleDenominator>272989.3867327723</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>2048</MatrixWidth>
                <MatrixHeight>2048</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>12</ows:Identifier>
                <ScaleDenominator>136494.6933663862</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>4096</MatrixWidth>
                <MatrixHeight>4096</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>13</ows:Identifier>
                <ScaleDenominator>68247.34668319309</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>8192</MatrixWidth>
                <MatrixHeight>8192</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>14</ows:Identifier>
                <ScaleDenominator>34123.67334159654</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>16384</MatrixWidth>
                <MatrixHeight>16384</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>15</ows:Identifier>
                <ScaleDenominator>17061.83667079827</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>32768</MatrixWidth>
                <MatrixHeight>32768</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>16</ows:Identifier>
                <ScaleDenominator>8530.918335399136</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>65536</MatrixWidth>
                <MatrixHeight>65536</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>17</ows:Identifier>
                <ScaleDenominator>4265.459167699568</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>131072</MatrixWidth>
                <MatrixHeight>131072</MatrixHeight>
            </TileMatrix>
            <TileMatrix>
                <ows:Identifier>18</ows:Identifier>
                <ScaleDenominator>2132.729583849784</ScaleDenominator>
                <TopLeftCorner>-20037508.34278925 20037508.34278925</TopLeftCorner>
                <TileWidth>256</TileWidth>
                <TileHeight>256</TileHeight>
                <MatrixWidth>262144</MatrixWidth>
                <MatrixHeight>262144</MatrixHeight>
            </TileMatrix>
        </TileMatrixSet>
    </Contents>
    <ServiceMetadataURL xlink:href="http://localhost:6080/arcgis/rest/services/WebGIS_Study/NDVI2020/MapServer/WMTS/1.0.0/WMTSCapabilities.xml" />
</Capabilities>
```

#### GetTile

| param         | value                       | desc                       |
| :------------ | :-------------------------- | :------------------------- |
| layer         | spatial_base:guangxi_cities | 与 WMS 的 layers 意义一致  |
| style         | ""                          | 与 WMS 的 style 意义一致   |
| tilematrixset | EPSG:900913                 | 瓦片阵集                   |
| TileMatrix    | EPSG:900913:7               | 当前级别的瓦片阵           |
| TileCol       | 103                         | 瓦片列号                   |
| TileRow       | 55                          | 瓦片行号                   |
| Service       | WMTS                        | 与 WMS 的 service 意义一致 |
| Request       | GetTile                     | 与 WMS 的 request 意义一致 |
| Version       | 1.0.0                       | 与 WMS 的 version 意义一致 |
| Format        | image/png                   | 与 WMS 的 format 意义一致  |

ArcGIS Server 没有成功。

#### GetTile RESTful

```
http://localhost:4800/geoserver/gwc/service/wmts/rest/spatial_base:guangxi_cities/polygon/EPSG:900913/EPSG:900913:7/55/103?format=image/png
```

未尝试



## WFS

不好用。

## TMS

ArcGIS Server 无TMS



```
http://localhost:4800/geoserver/gwc/service/tms/1.0.0
/spatial_base:guangxi_cities@EPSG:900913@png
/7/103/72.png
```

直接使用web服务器搭建即可。

## WCS （不常用）



## WPS （不常用）

## OGC API

或许是 WebGIS 下一代的数据规范 - OGC API 系列 

https://www.cnblogs.com/onsummer/p/what-is-ogc-api.html