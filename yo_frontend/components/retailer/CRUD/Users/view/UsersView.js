import React, { Component } from "react";
import Loader from "components/admin/Loader";
import TextViewItem from "components/admin/FormItems/items/TextViewItem";
import ImagesViewItem from "components/admin/FormItems/items/ImagesViewItem";
import Widget from "components/admin/Widget";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";

class UsersView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <Widget title={<h4>{"View User"}</h4>} collapse close>
        <ImagesViewItem label={"Avatar"} value={record.avatar} />

        <TextViewItem label={"First name"} value={record.firstName} />

        <TextViewItem label={"Last Name"} value={record.lastName} />

        <TextViewItem label={"Phone number"} value={record.phoneNumber} />

        <TextViewItem label={"Email"} value={record.email} />

        <TextViewItem label={"Business Name"} value={record.bname} />

        <TextViewItem label={"Business Address"} value={record.baddress} />

        <TextViewItem label={"GST"} value={record.gst} />

        <TextViewItem label={"Balance"} value={record.balance} />

        <DatePickerFormItem label={"Due Date"} value={record.duedate} />

        <TextViewItem label={"aadhar"} value={record.aadhar} />

        <ImagesViewItem label={"aadhar_url"} value={record.aadhar_url} />

        <ImagesViewItem label={"aadhar_back_url"} value={record.aadhar_back_url} />

        <TextViewItem label={"pan"} value={record.pan} />

        <ImagesViewItem label={"pan_url"} value={record.pan_url} />

        <TextViewItem label={"Disabled"} value={record.disabled} />
      </Widget>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Loader />;
    }

    return this.renderView();
  }
}

export default UsersView;
