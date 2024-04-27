import { Formik, FieldArray } from "formik";
import React, { Component } from "react";
import Loader from "components/admin/Loader";
import { Button, Col, Row } from "reactstrap";

import InputNumberFormItem from "components/admin/FormItems/items/InputNumberFormItem";
import SelectFormItem from "components/admin/FormItems/items/SelectFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import Widget from "components/admin/Widget";

import ordersFields from "components/admin/CRUD/Orders/ordersFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";

import ProductsAutocompleteFormItem from "components/admin/CRUD/Products/autocomplete/ProductsAutocompleteFormItem";

import UsersAutocompleteFormItem from "components/admin/CRUD/Users/autocomplete/UsersAutocompleteFormItem";

class OrdersForm extends Component {
  iniValues = () => {
    return {
      ...IniValues(ordersFields, this.props.record || {}),
      products: [] // Initialize products field as an empty array
    };
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
      return "Edit My Profile";
    }

    return this.props.isEditing ? "Edit orders" : "Add orders";
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <Widget title={<h4>{this.title()}</h4>} collapse close>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.iniValues()}
          validationSchema={this.formValidations()}
          render={(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <Row>
                <Col md={6}>
                  <DatePickerFormItem
                    name={"order_date"}
                    schema={ordersFields}
                    showTimeInput
                  />
                  <FieldArray
                    name="products"
                    render={(arrayHelpers) => (
                      <>
                        {formikProps.values.products.map((product, index) => (
                          <Row key={index}>
                            <Col md={6}>
                              <ProductsAutocompleteFormItem
                                name={`products.${index}.product`}
                                schema={ordersFields}
                                showCreate={!this.props.modal}
                                onSelect={(selectedProduct) =>
                                  arrayHelpers.replace(index, {
                                    product: selectedProduct,
                                    quantity: product.quantity || 1 // Default quantity to 1 if not set
                                  })
                                }
                              />
                            </Col>
                            <Col md={6}>
                              <InputNumberFormItem
                                name={`products.${index}.quantity`}
                                schema={ordersFields}
                                onChange={(value) =>
                                  arrayHelpers.replace(index, {
                                    product: product.product,
                                    quantity: value
                                  })
                                }
                              />
                            </Col>
                          </Row>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push({ product: "", quantity: 1 })}
                        >
                          Add Product
                        </Button>
                      </>
                    )}
                  />
                </Col>
                <Col md={6}>
                  <UsersAutocompleteFormItem
                    name={"user"}
                    schema={ordersFields}
                    showCreate={!this.props.modal}
                  />
                  <SelectFormItem
                    name="status"
                    schema={ordersFields}
                    options={[
                      { value: "ordered", label: "Ordered" },
                      { value: "intransit", label: "In Transit" },
                      { value: "delivered", label: "Delivered" }
                    ]}
                  />
                </Col>
              </Row>
              <div className="form-buttons">
                <Button
                  className="btn btn-primary"
                  disabled={saveLoading}
                  type="submit"
                >
                  Place Order
                </Button>{" "}
                <Button
                  className="btn btn-light"
                  type="button"
                  disabled={saveLoading}
                  onClick={formikProps.handleReset}
                >
                  Reset
                </Button>{" "}
                <Button
                  className="btn btn-light"
                  type="button"
                  disabled={saveLoading}
                  onClick={() => this.props.onCancel()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        />
      </Widget>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Loader />;
    }

    if (isEditing && !record) {
      return <Loader />;
    }

    return this.renderForm();
  }
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default OrdersForm;
