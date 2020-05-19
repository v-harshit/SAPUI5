sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("excel.fileupload.controller.View1", {
		onInit: function () {
			 var sJson = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(sJson)

		},
		onupload: function (oevent) {
			var that = this;
			var files = oevent.getParameters().files[0];
			var reader = new FileReader();
			reader.onload = function (sevent) {
				debugger;
				var _that = that;
				var data = event.target.result;
				var workbook = XLSX.read(data, {
					type: 'binary'
				});

				workbook.SheetNames.forEach(function (sheetName) {

					var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					var json_object = JSON.stringify(XL_row_object);
					debugger;
					var oJson = JSON.parse(json_object);
					sap.ui.getCore().getModel().setData(oJson)

				})
			};
			reader.onerror = function (event) {
				console.error("File could not be read! Code " + event.target.error.code);
			};

			reader.readAsBinaryString(files);
		}
	});
});