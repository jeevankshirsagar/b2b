import { Formik } from "formik";
import React, { Component } from "react";
import Loader from "components/admin/Loader";

import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import SwitchFormItem from "components/admin/FormItems/items/SwitchFormItem";
import RadioFormItem from "components/admin/FormItems/items/RadioFormItem";
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";

import usersFields from "components/admin/CRUD/Users/usersFields";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import Widget from "components/admin/Widget";
import Toggle from "components/admin/FormItems/items/Toggle";
// import { motion } from 'framer-motion';
// import { AnimatePresence } from 'framer-motion';

class UsersForm extends Component {
  iniValues = () => {
    return {
      ...IniValues(usersFields, this.props.record || {}),
      balance: 0,
    };
  };

  formValidations = () => {
    return FormValidations(usersFields, this.props.record || {});
  };

  handleSubmit = async (values) => {
    const { id, ...data } = PreparedValues(usersFields, values || {});
    this.props.onSubmit(id, data);
  };

  title = () => {
    if (this.props.isProfile) {
      return "Edit My Profile";
    }

    return this.props.isEditing ? "Edit users" : "Add users";
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <Widget title={<h4>{this.title()}</h4>} >
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={this.iniValues()}
          validationSchema={this.formValidations()}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <InputFormItem name={"firstName"} schema={usersFields} />

                    <InputFormItem name={"lastName"} schema={usersFields} />

                    <InputFormItem name={"phoneNumber"} schema={usersFields} />

                    <InputFormItem name={"email"} schema={usersFields} />

                    <InputFormItem name={"password"} schema={usersFields} />

                    <RadioFormItem name={"role"} schema={usersFields} />
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <InputFormItem name={"bname"} schema={usersFields} />

                    <InputFormItem name={"baddress"} schema={usersFields} />

                    <InputFormItem name={"cin"} schema={usersFields} />

                    <InputFormItem name={"gst"} schema={usersFields} />

                    <InputFormItem name={"balance"} schema={usersFields} />
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <InputFormItem name={"aadhar"} schema={usersFields} />

                    <ImagesFormItem
                      name={"aadhar_url"}
                      schema={usersFields}
                      path={"users/avatar"}
                      fileProps={{
                        size: undefined,
                        formats: undefined,
                      }}
                      max={undefined}
                    />

                    <ImagesFormItem
                      name={"aadhar_back_url"}
                      schema={usersFields}
                      path={"users/avatar"}
                      fileProps={{
                        size: undefined,
                        formats: undefined,
                      }}
                      max={undefined}
                    />

<div className="d-flex">
  <span className="fw-bold"> Status</span>

  {/* <motion.div layout /> */}


            {/* <Toggle 

            name="disabled"
            form={form}
            schema={usersFields}
            className="custom-toggle"
          /> */}
</div>

                  </div>
                </div>

                <ImagesFormItem
                  name={"avatar"}
                  schema={usersFields}
                  path={"users/avatar"}
                  fileProps={{
                    size: undefined,
                    formats: undefined,
                  }}
                  max={undefined}
                />

                <div className="form-buttons">
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

export default UsersForm;
