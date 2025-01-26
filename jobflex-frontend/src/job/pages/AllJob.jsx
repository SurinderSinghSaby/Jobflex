import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import Button from '@mui/joy/Button';


import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { fetchData, deleteData } from "../../shared/util/api";



const AllJob = () => {

const gridRef = useRef(null);  // This initializes the reference to the grid


  const [rowData, setRowData] = useState([]); // Data for the grid
   // Column definitions with a delete button
   const colDefs = useMemo(() => [
    { field: "title", headerName: "Job Title" },
    { field: "company", headerName: "Company" },
    { field: "location", headerName: "Location" },


  ], []);

  const rowSelection = {
    mode: "multiRow",
    headerCheckbox: false,
  };

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,

    };
  }, []);
  const auth = useContext(AuthContext);


  const userId = auth.userId;

  useEffect(() => {
    const fetchJobs = async () => {
      try{
        const response = await fetchData(`api/jobs/user/${userId}`);
        setRowData(response.jobs); // Set data for AG Grid
        console.log(response.jobs);

      } catch (err) {
        console.log("none")
      }
      
    }
    fetchJobs();
  }, [userId])

  const deleteSelectedJobs = async () => {
    if (gridRef.current && gridRef.current.api) {
      const selectedNodes = gridRef.current.api.getSelectedNodes(); // Get selected rows
      const selectedIds = selectedNodes.map((node) => node.data.id); // Extract IDs

      if (selectedIds.length === 0) {
        alert("No jobs selected for deletion");
        return;
      }

      if (window.confirm("Are you sure you want to delete the selected jobs?")) {
        try {
          const userId = auth.userId; // Assuming you get the userId from context or props
          // Create a payload that includes both userId and the selected job IDs
          const payload = {
            userId: userId,
            jobIds: selectedIds
          };
        
          await deleteData("api/jobs", payload);
          alert("Selected jobs deleted successfully");
          gridRef.current.api.deselectAll(); // Deselect all rows
          gridRef.current.api.refreshCells(); // Refresh cells
        } catch (error) {
          alert("Error deleting jobs");
        }
      }
    } else {
      alert("Grid API is not available yet.");
    }
  };
 

  return (
    <>
      <button onClick={deleteSelectedJobs}>Delete</button>;
      <div
      className="ag-theme-alpine" // Add a theme for AG Grid
      style={{ height: 700, width: "100%" }}
      >
      <AgGridReact
        rowData={rowData} // Pass row data to the grid
        columnDefs={colDefs} // Pass column definitions to the grid
        defaultColDef={defaultColDef}
        ref={gridRef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
   
      
  </>
  
  );
};

export default AllJob;
