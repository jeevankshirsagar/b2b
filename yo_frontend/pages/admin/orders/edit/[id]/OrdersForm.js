import React, { Component } from "react";
import { Formik } from "formik";
import Widget from "components/admin/Widget";
import ProductsAutocompleteFormItem from "components/admin/CRUD/Products/autocomplete/ProductsAutocompleteFormItem";
import UsersAutocompleteFormItem from "components/admin/CRUD/Users/autocomplete/UsersAutocompleteFormItem";
import InputNumberFormItem from "components/admin/FormItems/items/InputNumberFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import SelectFormItem from "components/admin/FormItems/items/SelectFormItem";
import ordersFields from "components/admin/CRUD/Orders/ordersFields";
import IniValues from "components/admin/FormItems/iniValues";
import FormValidations from "components/admin/FormItems/formValidations";

class OrdersForm extends Component {
  iniValues = () => {
    return IniValues(ordersFields, this.props.record || {});
  };

  formValidations = () => {
    return FormValidations(ordersFields, this.props.record || {});
  };

  handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(ordersFields, values || {});
    this.props.onSubmit(id, data);
  };

  title = () => {
    if (this.props.isProfile) {
      return <h4 className="fw-bold">Edit My Profile</h4>;
    }
    return (
      <h4 className="fw-bold">
        {this.props.isEditing ? "Edit orders" : "Add orders"}
      </h4>
    );
  };

  render() {
    const { saveLoading } = this.props;

    return (
      <Widget title={this.title()} collapse close>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.iniValues()}
          validationSchema={this.formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit} className="row">
                {/* First Column */}
                <div className="col-md-6">
                  {/* Order Date */}
                  <DatePickerFormItem
                    name={"order_date"}
                    schema={ordersFields}
                    showTimeInput
                  />

                  {/* Product */}
                  <ProductsAutocompleteFormItem
                    name={"product"}
                    schema={ordersFields}
                    showCreate={!this.props.modal}
                  />

                  <div className="mb-3">
                    <img
                      src={form.values.files?.image?.[0]?.privateUrl}
                      alt="Product"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                </div>

                {/* Second Column */}
                <div className="col-md-6">
                  {/* User */}
                  <UsersAutocompleteFormItem
                    name={"user"}
                    schema={ordersFields}
                    showCreate={!this.props.modal}
                  />

                  {/* Amount */}
                  <InputNumberFormItem
                    name={"amount"}
                    schema={ordersFields}
                  />
                </div>

                {/* Status */}
                <div className="col-md-12 ">
                  <div className="d-flex justify-content-center">
                    <SelectFormItem
                      name={"status"}
                      schema={ordersFields}
                      options={[
                        { value: "ordered", label: "Ordered" },
                        { value: "intransit", label: "In Transit" },
                        { value: "delivered", label: "Delivered" },
                      ]}

                      style={{ width: "800px" }}
                    />
                  </div>
                </div>

                {/* Form buttons */}
                <div className="form-buttons col-md-12">
                  <button
                    className="btn btn-primary"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button>{" "}
                  <button
                    className="btn btn-light"
                    type="button"
                    disabled={saveLoading}
                    onClick={form.handleReset}
                  >
                    Reset
                  </button>{" "}
                  <button
                    className="btn btn-light"
                    type="button"
                    disabled={saveLoading}
                    onClick={() => this.props.onCancel()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            );
          }}
        />
      </Widget>
    );
  }
}

export default OrdersForm;
