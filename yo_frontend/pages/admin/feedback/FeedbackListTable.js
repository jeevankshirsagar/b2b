import React, { Component } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import axios from 'axios';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Widget from "components/admin/Widget";
import actions from "redux/actions/feedback/feedbackListActions";
import * as dataFormat from "./FeedbackDataFormatters";
import FeedbackForm from "../feedback"; // Import FeedbackForm component
import feedbackFields from "./feedbackFields";
import 'bootstrap-icons/font/bootstrap-icons.css'

// import AddCircleIcon from '@mui/icons-material/AddCircle';


class FeedbackListTable extends Component {
  state = {
    modalOpen: false,
    idToDelete: null,
    feedbackData: [],
    selectedUserData: null, 
    isEditMode: false,
    selectedFeedbackId: null,
  };


  async componentDidMount() {
    try {
      const response = await axios.get('http://srv481744.hstgr.cloud:8080/api/feedback/get');
      const feedbackData = response.data;

      this.setState({ feedbackData });
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }

    const { dispatch } = this.props;
    dispatch(actions.doFetch({}));
  }

  handleDelete() {
    const id = this.props.idToDelete;
    this.props.dispatch(actions.doDelete(id));
  }

  openModal(cell) {
    const id = cell;
    this.props.dispatch(actions.doOpenConfirm(id));
  }

  closeModal() {
    this.setState({ modalOpen: false, isEditMode: false });
  }

  handleView(cell) {
    const selectedUser = this.state.feedbackData.find((user) => user.id === cell);
    this.setState({ selectedUserData: selectedUser, modalOpen: true, isEditMode: false });
  }

  handleEdit(id, data) {
    // Open the modal in edit mode and set the selected feedback data
    this.setState({ selectedFeedbackId: id, modalOpen: true, isEditMode: true });
  }
    // Additional logic for updating the feedback data on the server if needed
  
  actionFormatter(cell) {
    return (
      <div>
        <Button
          color="default"
          size="xs"
          onClick={() => this.handleView(cell)}
        >
          View
        </Button>
        &nbsp;&nbsp;
        <Button
        color="info"
        size="xs"
        onClick={() => this.setState({ modalOpen: true, isEditMode: true })}
      >
        Edit
      </Button>
        &nbsp;&nbsp;
        <Button color="danger" size="s"  style={{borderRadius: '7px'}} onClick={() => this.openModal(cell)}>
        <i className={"bi bi-trash-fill"}></i>
        </Button>
      </div>
    )
  }
  
  // handleView(cell) {
  //   const selectedUser = this.state.feedbackData.find((user) => user.id === cell);
  //   this.setState({ selectedUserData: selectedUser, modalOpen: true });
  // }

  renderSizePerPageDropDown = (props) => {
    const limits = [];
    props.sizePerPageList.forEach((limit) => {
      limits.push(
        <DropdownItem
          key={limit}
          onClick={() => props.changeSizePerPage(limit)}
        >
          {limit}
        </DropdownItem>
      );
    });

    return (
      <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
        <DropdownToggle color="default" caret>
          {props.currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>{limits}</DropdownMenu>
      </Dropdown>
    );
  };


  render() {
    const { feedbackData, selectedUserData, selectedFeedbackId } = this.state;
    const options = {
      sizePerPage: 10,
      paginationSize: 5,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
    };

    return (
      <div>
        <Widget title={<h3 className="fw-bold">Enquiries</h3>} collapse close>
          <Link href="/admin/feedback/new">
            <button className="btn btn-dark" style={{borderRadius: '12px'}}type="button">
             Add Enquiry
              
            </button>
          </Link>
          <BootstrapTable
            bordered={false}
            data={feedbackData}
            version="4"
            pagination
            options={options}
            search
            tableContainerClass={"table-responsive table-striped table-hover"}
          >
            <TableHeaderColumn dataField="name" dataSort>
              <span className="fs-sm">Name</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>
              <span className="fs-sm">Email</span>
            </TableHeaderColumn>
            <TableHeaderColumn dataField="contact" dataSort>
              <span className="fs-sm">Contact</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="bname" dataSort>
              <span className="fs-sm">Business Name</span>
            </TableHeaderColumn>


            <TableHeaderColumn dataField="title" dataSort>
              <span className="fs-sm">Title</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="unit" dataSort>
              <span className="fs-sm">Unit</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="message" dataSort>
              <span className="fs-sm">Message</span>
            </TableHeaderColumn>

            <TableHeaderColumn
              isKey
              dataField="id"
              dataFormat={this.actionFormatter.bind(this)}
            >
              <span className="fs-sm">Actions</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </Widget>


        <Modal
          size="sm"
          isOpen={this.state.modalOpen}
          toggle={() => this.closeModal()}
        >
          <ModalHeader toggle={() => this.closeModal()}>
          {this.state.isEditMode ? "Edit Feedback" : "View User Data"}
          </ModalHeader>
          <ModalBody className="bg-white">

          {selectedFeedbackId !== null && (
              <FeedbackForm
                isEditing={this.state.isEditMode}
                onSubmit={(id, data) => this.handleEdit(id, data)}
                onCancel={() => this.closeModal()}
              />
            )}


            {selectedUserData && (
              <div>
                <p>Name: {selectedUserData.name}</p>
                <p>Email: {selectedUserData.email}</p>
                <p>Contact: {selectedUserData.contact}</p>
                <p>Business Name: {selectedUserData.bname}</p>
                <p>Title: {selectedUserData.title}</p>
                <p>Unit: {selectedUserData.unit}</p>
                {/* <p>Status: {selectedUserData.status}</p> */}
              </div>
            )}
          </ModalBody>
        </Modal>

        <Modal
          size="sm"
          isOpen={this.props.modalOpen}
          toggle={() => this.closeModal()}
        >
          <ModalHeader toggle={() => this.closeModal()}>
            Confirm delete
          </ModalHeader>
          <ModalBody className="bg-white">
            Are you sure you want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.closeModal()}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.handleDelete()}>
              Delete
            </Button>
            </ModalFooter>
        </Modal>
        </div>
            
    );
            
  }
}
function mapStateToProps(store) {
  return {
    loading: store.feedback.list.loading,
    rows: store.feedback.list.rows,
    modalOpen: store.feedback.list.modalOpen,
    idToDelete: store.feedback.list.idToDelete,
  };
}


export default connect(mapStateToProps)(FeedbackListTable);