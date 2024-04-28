import * as dataFormat from "./UsersDataFormatters";

import actions from "redux/actions/users/usersListActions";
import React, { Component } from "react";
import Link from 'next/link'
import { withRouter } from "next/router"
import { connect } from "react-redux";
import axios from "axios";
import { saveAs } from "file-saver";
// const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// import { chartData, splineArea } from './chartsMock';
// import SimpleLine from './widget';


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

class UsersListTable extends Component {
  state = {
    modalOpen: false,
    idToDelete: null,
  };

  handleDelete() {
    const id = this.props.idToDelete;
    this.props.dispatch(actions.doDelete(id));
  }

  openModal(cell) {
    const id = cell;
    this.props.dispatch(actions.doOpenConfirm(id));
  }

  closeModal() {
    this.props.dispatch(actions.doCloseConfirm());
  }

  downloadUserList = async () => {
    try {    
      const response = await axios.get("/api/users");
      const userData = response.data;
      const jsonData = JSON.stringify(userData);
      const blob = new Blob([jsonData], { type: "application/json" });
      saveAs(blob, "user.json");
    } catch (error) {
      console.error("Error downloading user list:", error);
    }
  };
  
  handleDownloadClick = () => {
    this.downloadUserList();
  };

  actionFormatter(cell) {
    return (
      <div>
        <Button
          color="default"
          size="xs"
          onClick={() => this.props.router.push(`/admin/users/${cell}`)}
          iconType="node"
          
        >
          
          View
        </Button>
        &nbsp;&nbsp;
        <Button
          color="info"
          size="xs"
          onClick={() => this.props.router.push(`/admin/users/edit/${cell}`)}
        >
          Edit
        </Button>
        &nbsp;&nbsp;
        <Button color="danger" size="xs" onClick={() => this.openModal(cell)}>
          Delete
        </Button>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props)
    const { dispatch } = this.props;
    dispatch(actions.doFetch({}));
  }

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
    const { rows } = this.props;

    const options = {
      sizePerPage: 10,
      paginationSize: 5,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
    };

    return (
      <div>
        <Widget title={<h3 className="s.tabel_title fw-bold">Retailer List</h3>} >
          <Link href="/admin/users/new">
            <button className="btn btn-dark" type="button" style={{borderRadius : '12px'}}>
              Add Retailer
              
            </button>
            
          </Link>
          <div>
            
        {/* Add a button to trigger downloading the user list */}
        {/* <Button color="primary" onClick={() => this.handleDownloadClick('user')}>Export Users List</Button> */}
      </div>
          <BootstrapTable
            bordered={false}
            data={rows}
            version="4"
            pagination
            options={options}
            search
            tableContainerClass={`table-responsive table-striped table-hover`}
          >
            
            {/* <TableHeaderColumn
              dataField="avatar"
              dataSort
              dataFormat={dataFormat.imageFormatter}
            >
              <span className="fs-sm">Avatar</span>
            </TableHeaderColumn> */}
            
            <TableHeaderColumn dataField="firstName" dataSort>
              <span className="fs-sm">First Name</span>
            </TableHeaderColumn>

            {/* <TableHeaderColumn dataField="lastName" dataSort>
              <span className="fs-sm">Last Name</span>
            </TableHeaderColumn> */}

            <TableHeaderColumn dataField="bname" dataSort>
              <span className="fs-sm">Business Name</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="baddress" dataSort>
              <span className="fs-sm">Business Address</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="gst" dataSort>
              <span className="fs-sm">GST</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="email" dataSort>
              <span className="fs-sm">E-mail</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="balance" dataSort>
              <span className="fs-sm">Balance</span>
            </TableHeaderColumn>

            
            <TableHeaderColumn dataField="duedate" dataSort>
              <span className="fs-sm">Due Date</span>
            </TableHeaderColumn>

            {/* <TableHeaderColumn
              dataField="disabled"
              dataSort
              dataFormat={dataFormat.booleanFormatter}
            >
              <span className="fs-sm">Disabled</span>
            </TableHeaderColumn> */}

           

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
          isOpen={this.props.modalOpen}
          toggle={() => this.closeModal()}
          style={{width: '30%'}}
        >
          <ModalHeader toggle={() => this.closeModal()} className="fw-bold">
            Confirm Delete?
          </ModalHeader>
          <ModalBody className="bg-white text-center">
            After this action all Data related to this Retailer will erased from dashboard, Are you sure you want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"  style={{ borderRadius: '10px'}} onClick={() => this.closeModal()}>
              Cancel
            </Button>
            <Button color="primary" style={{ borderRadius: '10px'}} onClick={() => this.handleDelete()}>
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
    loading: store.users.list.loading,
    rows: store.users.list.rows,
    modalOpen: store.users.list.modalOpen,
    idToDelete: store.users.list.idToDelete,
  };
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/users");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps)(withRouter(UsersListTable));
