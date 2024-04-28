import * as dataFormat from "./OrdersDataFormatters";

import * as productsDataFormat from "../products/ProductsDataFormatters";
import * as usersDataFormat from "../users/UsersDataFormatters";

import actions from "redux/actions/orders/ordersListActions";
import React, { Component } from "react";
import Link from 'next/link'
import { connect } from "react-redux";
import { withRouter } from "next/router"
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

import 'bootstrap-icons/font/bootstrap-icons.css'
import UseAnimations from "react-useanimations";
import trash2 from 'react-useanimations/lib/trash2';
import download from 'react-useanimations/lib/download';



class OrdersListTable extends Component {
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


  exportData = () => {
  // Gather data and format it for export
  const { rows } = this.props;

  // Extract only the required columns
  const dataToExport = rows.map(row => ({
    "Order Date": row.order_date,
    "Order No.": row.order_no,
    "Product": row.product,
    "Retailer": row.user,
    "Quantity": row.amount,
    "Status": row.status
  }));

  // Convert the extracted data to CSV format
  const csvContent = "data:text/csv;charset=utf-8," + [
    Object.keys(dataToExport[0]).join(","), // Header row
    ...dataToExport.map(row => Object.values(row).join(","))
  ].join("\n");

  // Create a Blob object from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Create a temporary anchor element to download the CSV file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Set the filename for the CSV file
  link.download = 'orders.csv';

  // Append the anchor element to the document body and click it to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the temporary anchor element
  document.body.removeChild(link);
};

  

  
  actionFormatter(cell) {
    return (
      <div>
    
        <Button
          color="default"
          size="xs"
          onClick={() => this.props.router.push(`/admin/orders/${cell}`)}
        >
          View
        </Button>
        &nbsp;&nbsp;
        <Button
          color="info"
          size="xs"
          onClick={() =>
            this.props.router.push(`/admin/orders/edit/${cell}`)
          }
        >
          Edit
        </Button>
        &nbsp;&nbsp;
        <Button color="none" size="s" style={{borderRadius: '7px'}} onClick={() => this.openModal(cell)}>
        <UseAnimations animation={trash2} size={24}  strokeColor="red" style={{ color: 'white' }} />
        </Button>
      </div>
    );
  }

  componentDidMount() {
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
        <Widget title={<h3 className="fw-bold">Orders</h3>} >
          <Link href="/admin/orders/new">
            <button className="btn btn-dark fw-bold" style={{borderRadius: '12px'}} type="button">
              New Order
            </button>
          </Link>


          <Button color="none" className="ms-2" onClick={this.exportData}>
          <UseAnimations animation={download} size={28} strokeColor="green" style={{ color: 'none' }} />
          </Button>

          <BootstrapTable
            bordered={false}
            data={rows}
            version="4"
            pagination
            options={options}
            search
            tableContainerClass={`table-responsive table-striped table-hover`}
            selectRow={true}
          >


<TableHeaderColumn dataField="order_no" dataSort>
              <span className="fs-sm">Order No.</span>
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="order_date"
              dataSort
              dataFormat={dataFormat.dateTimeFormatter}
            >
              <span className="fs-sm">Order date</span>
            </TableHeaderColumn>




            <TableHeaderColumn
              dataField="product"
              dataSort
              dataFormat={productsDataFormat.listFormatter}
            >
              <span className="fs-sm">Product</span>
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="user"
              dataSort
              dataFormat={usersDataFormat.listFormatter}
            >
              <span className="fs-sm">Retailer</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="amount" dataSort>
              <span className="fs-sm">Quantity</span>
            </TableHeaderColumn>

            <TableHeaderColumn dataField="status" dataSort>
              <span className="fs-sm">Status</span>
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
    loading: store.orders.list.loading,
    rows: store.orders.list.rows,
    modalOpen: store.orders.list.modalOpen,
    idToDelete: store.orders.list.idToDelete,
  };
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps)(withRouter(OrdersListTable));
