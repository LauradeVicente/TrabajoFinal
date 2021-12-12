sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"restaurant/finalproject/Router",
	"sap/ui/core/Fragment",
	"restaurant/finalproject/util/Formatter",
	"restaurant/finalproject/util/Validator",
	"restaurant/finalproject/util/Constants",
	"sap/ui/core/ValueState",
	"sap/ui/core/BusyIndicator"
],
	

	function (JSONModel, Filter, FilterOperator, Router, Fragment, Formatter, Validator, Constants, ValueState, 
			BusyIndicator) {
		"use strict";

		return Router.extend("restaurant.finalproject.controller.ProductList", {

			onInit: async function () {
				appScope = this;
				await this.initModels();
				this.loadSearchfieldValues();
			},

			initModels: function () {
				this.getView().setModel(new JSONModel(), Constants.model.PRODUCT_DIALOG);
				this.getView().setModel(new JSONModel(), Constants.model.VENDOR_DIALOG);
				this.getView().setModel(new JSONModel(), Constants.model.SEARCHFIELD_VALUES);
			},

			loadSearchfieldValues: function () {
				const oModelProductsTemp = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TEMP);
				const aProductsData = oModelProductsTemp.getProperty("/value");
				const oSearchfieldModel = this.getView().getModel(Constants.model.SEARCHFIELD_VALUES);
				oSearchfieldModel.setProperty("/products", jQuery.extend(true, [], aProductsData));
			},

			//FILTRO POR NOMBRE
			onFilterProductName: function (oEvent) {
				let aFilter = [],
				sQuery = oEvent.getParameter("query"),
				oTable = this.getView().byId("idProductsTable"),
				oTableItems = oTable.getBinding("items");

				if (sQuery) aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));

				oTableItems.filter(aFilter);
			},

			//FILTRO MULTICOMBOBOX POR TIPO
			onFilterProductType: function(oEvent) {
				const aSelectedItems = oEvent.getSource().getSelectedItems();
				const oModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);
				const aOriginalModelData = oModel.getProperty("/value");
				let aTempModelData = jQuery.extend(true, [], aOriginalModelData);

				if (!aSelectedItems.length) {
					this.getView().getModel(Constants.model.PRODUCTS_TEMP).setProperty("/value", aTempModelData);
					return;
				}
				aTempModelData = aTempModelData.filter(data => 
					aSelectedItems.find(oItem =>
						oItem.getText() === data.type
					)
				);
				this.getView().getModel(Constants.model.PRODUCTS_TEMP).setProperty("/value", aTempModelData);
			},

			//DIALOG DE AÑADIR PRODUCTO
			handlePopoverAddProducts: function () {
				let oView = this.getView();
				const oDialogModel = this.getView().getModel(Constants.model.PRODUCT_DIALOG);
				const oVendorDialogModel = this.getView().getModel(Constants.model.VENDOR_DIALOG);
				const settingsModel = this.getOwnerComponent().getModel("settings");

				if (!this._oDialog) {
					Fragment.load({
						id: oView.getId(),
						name: "restaurant.finalproject.fragment.products.AddProduct",
						controller: this
					}).then(function (oDialog) {
						this._oDialog = oDialog;
						oView.addDependent(this._oDialog);
						oDialogModel.setData({});
						oVendorDialogModel.setData({});
						settingsModel.setProperty("/addEnable", false);
						this._oDialog.open();
					}.bind(this));
				} else {
					oDialogModel.setData({});
					oVendorDialogModel.setData({});
					settingsModel.setProperty("/addEnable", false);
					this._oDialog.open();
				}
			},

			closeAddProductsDialog: function () {
				if (!this._oDialog) return;
				this._oDialog.close();
				this._oDialog.destroy();
				this._oDialog = null;
			},

			addProduct: function () {
				const oDialogModel = this.getView().getModel(Constants.model.PRODUCT_DIALOG);
				const aDialogData = oDialogModel.getProperty("/");
				const oVendorDialogModel = this.getView().getModel(Constants.model.VENDOR_DIALOG);
				const aVendorDialogData = oVendorDialogModel.getProperty("/");
				const oProductsModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS);		
				const oProductsTempModel = this.getView().getModel(Constants.model.PRODUCTS_TEMP);
				const aProductsTempData = oProductsTempModel.getProperty("/value");
				const oVendorsModel = this.getOwnerComponent().getModel(Constants.model.VENDORS);
				const aVendorsData = oVendorsModel.getProperty("/value");

				let aVendorIDS = aVendorsData.map(oVendor => parseInt(oVendor.id));
				let iVendorID = Math.max(...aVendorIDS) + 1;
				oVendorDialogModel.setProperty("/id", iVendorID.toString());
				oVendorDialogModel.setProperty("/product", aDialogData.name);

				let aProductIDS = aProductsTempData.map(oProduct => parseInt(oProduct.ProductID));
				let iProductID = Math.max(...aProductIDS) + 1;
				oDialogModel.setProperty("/ProductID", iProductID.toString());
			
				if (!Validator.checkAddProducts(aDialogData, aVendorDialogData, this.getView())) return;
				BusyIndicator.show(0);		

				aProductsTempData.push(aDialogData);
				aVendorsData.push(aVendorDialogData);

				oProductsModel.setProperty("/value", aProductsTempData);
				oProductsTempModel.setProperty("/value", aProductsTempData);
				oVendorsModel.setProperty("/value", aVendorsData);
				oProductsModel.refresh(true);
				oProductsTempModel.refresh(true);
				oVendorsModel.refresh(true);
				this.closeAddProductsDialog();
				BusyIndicator.hide();
			},

			onInputSuggest: function (oEvent) {
				let sTerm = oEvent.getParameter("suggestValue");
				let aFilters = [];
				if (sTerm) {
					aFilters.push(new Filter("type", FilterOperator.StartsWith, sTerm));
				}
				oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
			},

			onInputChange: function (oEvent) {
				const oInput = oEvent.getSource();
				oInput.setValueState(ValueState.None); 
			},

			//NAVEGAR AL DETALLE
			navToDetail: async function (oEvent) {
				let oRouter = this.getRouter();
				let sModelPath = oEvent.getSource().getBindingContextPath();
				let oProductData = this.getOwnerComponent().getModel(Constants.model.PRODUCTS).getProperty(sModelPath);

				const aVendorsData = this.getOwnerComponent().getModel(Constants.model.VENDORS).getProperty("/value");
				let aVendorData = aVendorsData.filter(oVendor => oVendor.product === oProductData.name);

				this.getOwnerComponent().setModel(new JSONModel(), "productDetail");
				let oDetailModel = this.getOwnerComponent().getModel("productDetail");
				this.getOwnerComponent().setModel(new JSONModel(), "productVendor");
				let oVendorModel = this.getOwnerComponent().getModel("productVendor");

				await oDetailModel.setData(oProductData);
				await oVendorModel.setData(aVendorData[0]);

				oRouter.navTo("ProductDetail");
			},

			//ELIMINAR UN PRODUCTO
			onDeleteProduct: function (oEvent) {
				const oProductsModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TEMP);
				let sProductPath = oEvent.getParameter("listItem").getBindingContext(Constants.model.PRODUCTS_TEMP).getPath();
				oProductsModel.setProperty(sProductPath, undefined);
				const aProducts = oProductsModel.getProperty("/value");
				const iProductPath = aProducts.indexOf(undefined);
				if (iProductPath > -1) {
					aProducts.splice(iProductPath, 1);
				}
				oProductsModel.refresh(true);
			},

			//POPOVER DE FILTRAR
			openProductsFilters: function (oEvent) {
				const oIcon = oEvent.getSource();
				let oView = this.getView();
				const sIconID = oIcon.getId();
				this.storeColumnName(sIconID);
				if (!this.oFilterPopover) {
					Fragment.load({
						id: Constants.ids.PRODUCTS_FILTER_POPOVER,
						name: "restaurant.finalproject.fragment.filters.ProductsFilter",
						controller: this
					}).then(function (oFilterPopover) {
						this.oFilterPopover = oFilterPopover;
						oView.addDependent(this.oFilterPopover);
						this.oFilterPopover.openBy(oIcon);
					}.bind(this));
				} else {
					this.oFilterPopover.openBy(oIcon);
				}
			},

			onSearchfieldSuggest: function (oEvent) {
				const oTable = this.byId("idProductsTable");
				const aListFilters = oTable.getBinding("items").aFilters;
				const oSearchfieldValuesModel = this.getView().getModel(Constants.model.SEARCHFIELD_VALUES);
				let aProducts = oSearchfieldValuesModel.getProperty("/products");
				let sID = oSearchfieldValuesModel.getProperty("/column");
				for (let i=0; i<aListFilters.length; i++) {
					aProducts = aProducts.filter(oProduct => oProduct[aListFilters[i].sPath].includes(aListFilters[i].oValue1))
				}
				const aValues = [];
				for (let i=0; i < aProducts.length; i++) {
					const oDuplicateValue = aValues.find(oValue => oValue[sID] === aProducts[i][sID]);
					if (!oDuplicateValue) aValues.push(aProducts[i]);
				}
				oSearchfieldValuesModel.setProperty("/products", aValues);
				oEvent.getSource().suggest();
			},

			onSearchfieldFilter: function (oEvent) {
				const sQuery = oEvent.getParameter("query");
				const oSearchfieldValuesModel = this.getView().getModel(Constants.model.SEARCHFIELD_VALUES);
				const sColumnID = oSearchfieldValuesModel.getProperty("/column");
				const oTable = this.byId("idProductsTable");
				const aListFilters = oTable.getBinding("items").aFilters;
				const oFilter = new Filter({
					path: sColumnID,
					operator: FilterOperator.Contains,
					value1: sQuery,
					caseSensitive: false
				});
				const iIndex = aListFilters.findIndex(oListFilter => sColumnID === oListFilter.sPath);
				if (iIndex !== -1) aListFilters.splice(iIndex, 1);
				if (!sQuery) {
					oTable.getBinding("items").filter(aListFilters);
					return;
				}
				aListFilters.push(oFilter);
				oTable.getBinding("items").filter(aListFilters);
			},
			
			storeColumnName: function (sIconID) {
				this.loadSearchfieldValues();
				const sID = sIconID.split("--")[1];
				const oSearchfieldValuesModel = this.getView().getModel(Constants.model.SEARCHFIELD_VALUES);
				oSearchfieldValuesModel.setProperty("/column", sID);
				oSearchfieldValuesModel.refresh(true);
			},

			clearProductListFilters: function () {
				const oTable = this.byId("idProductsTable");
				const oTableBinding = oTable.getBinding("items");
				let aListFilters = oTableBinding.aFilters;
				//aListFilters = [];
				oTableBinding.filter([]);
				oTable.oPropagatedProperties.oModels.productsTemp.refresh(true);
				//const oProductsTempModel = this.getOwnerComponent().getModel(Constants.model.PRODUCTS_TEMP);
				//oProductsTempModel.refresh(true);
			},

			clearProductListFilterInput: function () {
				const oInput = Fragment.byId(Constants.ids.PRODUCTS_FILTER_POPOVER, "filterSearchfield");
				oInput.setValue();
			}
        });
	});
