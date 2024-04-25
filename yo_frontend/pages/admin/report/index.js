import React, { useState, useEffect } from "react";
import s from "./report.module.scss";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin
import ReactPaginate from "react-paginate";
import { CSVDownload } from "react-csv";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [csvData, setCsvData] = useState([]); // State variable for CSV data
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    fetchData();
  }, [pageNumber]); // Refetch data when page number changes

  const fetchData = () => {
    const offset = pageNumber * itemsPerPage;
    fetch(
      `http://localhost:8080/api/report/?offset=${offset}&limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
        // No need to update CSV data here
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/report/?offset=${
          pageNumber * itemsPerPage
        }&limit=${itemsPerPage}`
      );
      const currentPageData = await response.json();

      // Format data for CSV
      const csvFormattedData = currentPageData.map((item) => ({
        ID: item.id,
        Status: item.status,
        "Order Number": item.order_no,
        "Order Date": item.order_date,
        "User ID": item.user.id,
        "User Business Name": item.user.bname,
        "User Business Address": item.user.baddress,
        "User GST": item.user.gst,
        "User PAN": item.user.pan,
      }));

      setCsvData(csvFormattedData); // Update CSV data
    } catch (error) {
      console.error("Error fetching data for CSV:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  // Calculate the total number of pages
  const pageCount = Math.ceil(reportData.length / itemsPerPage);

  // Get the data for the current page
  const currentPageData = reportData.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  return (
    <div className={s.report}>
      <h1>Report</h1>
      <table className={s.reportTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>User ID</th>
            <th>User Business Name</th>
            <th>User Business Address</th>
            <th>User GST</th>
            <th>User PAN</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.status}</td>
              <td>{item.order_no}</td>
              <td>{item.order_date}</td>
              <td>{item.user.id}</td>
              <td>{item.user.bname}</td>
              <td>{item.user.baddress}</td>
              <td>{item.user.gst}</td>
              <td>{item.user.pan}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
      <button onClick={handleDownload}>Download CSV</button>
      {/* Render CSVDownload component */}
      {csvData.length > 0 && <CSVDownload data={csvData} target="_blank" />}
    </div>
  );
};

export default Report;
