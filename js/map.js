var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "esri/dijit/Scalebar",
        "esri/dijit/Legend",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map,Extent,ArcGISDynamicMapServiceLayer,FeatureLayer, BasemapToggle,
              ready, parser, on, Scalebar, Legend,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the initial extent
             * Note: Exact coordinates may vary slightly from snippet/solution
             * Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html
             */
            var extentInitial = new Extent({
                "xmin":-13946833.011482073,"ymin":4297506.856369127,"xmax":-13551806.449304389,"ymax":5038640.282621998,
                "spatialReference":{"wkid":102100,"latestWkid":3857}
            })

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent: extentInitial
            });

            /*
             * Step: Add the USA map service to the map
             */
            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",{opacity:0.5});
            //Add the scalebar
            //mapMain.addLayer(lyrUSA);
            /*
             * Step: Add the earthquakes layer to the map
             */
            var lyrQuakes = new FeatureLayer("https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0");
            lyrQuakes.setDefinitionExpression("magnitude >= 2.0");
            /*
            * Step: Revise code to use the addLayers() method
            */
           //Add the scalebar
            //mapMain.addLayer(lyrQuakes);
            /*
             * Step: Add the BaseMapToggle widget to the map
             */
            var toggle = new BasemapToggle({
                map: mapMain,
                basemap : "topo"
            }, "BasemapToggle");
            toggle.startup();

            /*
            * Step: Add the scalebar widget to the map
            */
           var dijitScalebar = new Scalebar({
               map: mapMain,
               scalebarUnit : "dual",
               attachTo : "bottom-left"
           })


            /*
             * Step: Add a legend once all layers have been added to the map
             */
            mapMain.addLayers ([lyrUSA,lyrQuakes]);

            mapMain.on("layers-add-result", function(){
                var dijitLegend = new Legend({
                    map: mapMain,
                    arrangement: Legend.ALIGN_RIGHT
                }, "divLegend");
               // dijitLegend.refresh([{layer:lyrUSA, title:'MAPA USA'},{layer:lyrQuakes,title:'MAPA TERREMOTOS'}]);
                dijitLegend.startup();
            });// stub

        
        });
    });
