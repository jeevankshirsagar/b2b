import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactPaginate from 'react-paginate';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import s from './report.module.scss';
import Head from 'next/head';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const fetchData = () => {
    const offset = pageNumber * itemsPerPage;
    fetch(`http://srv481744.hstgr.cloud:8080/api/report/?offset=${offset}&limit=${itemsPerPage}`)
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();
  //   const columns = [
  //     { title: 'ID', dataKey: 'id' },
  //     { title: 'Status', dataKey: 'status' },
  //     { title: 'Order Number', dataKey: 'order_no' },
  //     { title: 'Order Date', dataKey: 'order_date' },
  //     { title: 'User ID', dataKey: 'user.id' },
  //     { title: 'User Business Name', dataKey: 'user.bname' },
  //     { title: 'User Business Address', dataKey: 'user.baddress' },
  //     { title: 'User GST', dataKey: 'user.gst' },
  //     { title: 'User PAN', dataKey: 'user.pan' }
  //   ];
  //   const rows = selectedItems.map(item => ({
  //     id: item.id,
  //     status: item.status,
  //     order_no: item.order_no,
  //     order_date: item.order_date,
  //     'user.id': item.user.id,
  //     'user.bname': item.user.bname,
  //     'user.baddress': item.user.baddress,
  //     'user.gst': item.user.gst,
  //     'user.pan': item.user.pan
  //   }));
  //   doc.autoTable({ columns, body: rows });
  //   doc.save('report.pdf');
  // };

  const handleDownloadExcel = () => {
    import('xlsx').then((xlsx) => {
      const columns = [
        // { title: 'ID', dataKey: 'id' },
        // { title: 'Status', dataKey: 'status' },
        // { title: 'Order Number', dataKey: 'order_no' },
        // { title: 'Order Date', dataKey: 'order_date' },
        { title: 'User ID', dataKey: 'user.id' },
        { title: 'User Business Name', dataKey: 'user.bname' },
        { title: 'User Business Address', dataKey: 'user.baddress' },
        { title: 'User GST', dataKey: 'user.gst' },
        { title: 'User PAN', dataKey: 'user.pan' }
      ];
  
      const rows = reportData.map(item => ({
        id: item.id,
        status: item.status,
        order_no: item.order_no,
        order_date: item.order_date,
        'User ID': item.user.id,
        'Business Name': item.user.bname,
        'Business Address': item.user.baddress,
        'Users Business GST': item.user.gst,
        'User Pan Number': item.user.pan
      }));
  
      const worksheet = xlsx.utils.json_to_sheet(rows, { header: columns.map(col => col.title) });
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      const currentDate = new Date().toISOString().slice(0, 10); // Get current date in format YYYY-MM-DD
      saveAsExcelFile(excelBuffer, `report_${currentDate}`); 
    });
  };
  
  

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + EXCEL_EXTENSION);
      }
    });
  };

  const handleDownloadCSV = () => {
    const csvData = selectedItems.map(item => ({
      ID: item.id,
      Status: item.status,
      'Order Number': item.order_no,
      'Order Date': item.order_date,
      'User ID': item.user.id,
      'User Business Name': item.user.bname,
      'User Business Address': item.user.baddress,
      'User GST': item.user.gst,
      'User PAN': item.user.pan
    }));
    return csvData;
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const onSelectionChange = (e) => {
    setSelectedItems(e.value);
  };
  



  
  return (

    


    <div className="p-d-flex p-flex-column">
      <h1 className='fw-bold'>Report</h1>
      <div className="p-d-flex p-jc-end p-mt-3 export-buttons p-rounded" style={{ textAlign: 'right' }}>
        <Button type="button" icon="pi pi-file-export" onClick={handleDownloadExcel}  data-pr-tooltip="XLS" className="p-button-success p-rounded p-mr-2" style={{ borderRadius: '25px'}}/>
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable 
        value={reportData} 
        paginator 
        rows={itemsPerPage} 
        emptyMessage="No orders found." 
        className="p-datatable-report mt-2" 
        style={{borderRadius : '7px', border: '1px solid #ccc'}}
        selection={selectedItems} 
        onSelectionChange={onSelectionChange}
      >
        <Column field="id" header="ID" />
        <Column field="status" header="Status" />
        <Column field="order_no" header="Order Number" />
        <Column field="order_date" header="Order Date" />
        <Column field="user.id" header="User ID" />
        <Column field="user.bname" header="User Business Name" />
        <Column field="user.baddress" header="User Business Address" />
        <Column field="user.gst" header="User GST" />
        <Column field="user.pan" header="User PAN" />
      </DataTable>
    </div>
  );
};

export default Report;
