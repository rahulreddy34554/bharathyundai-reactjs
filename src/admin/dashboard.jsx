import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { db } from "../lib/firebase";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"; // <-- Excel export support
const customStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#7E22CE",
      color: "white",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRight: "1px solid #EAEAEA",
    },
  },
};
const Export = ({ onExport }) => (
  <button
    className="bg-green-600 text-white rounded px-5 py-1.5 text-sm"
    onClick={onExport}
  >
    Export to Excel
  </button>
);
function Dashboard() {
  const [active, setActive] = useState(true);
  const handleActive = () => {
    setActive(!active);
  };
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let list = [];
      try {
        const collectionRef = collection(db, "leads");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setFilteredData(list);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };
    fetchData();
  }, []);
  const downloadExcel = (array) => {
    const formattedData = array.map((row) => ({
      ID: row.id,
      Name: row.name,
      Email: row.email,
      Phone: row.mobile,
      Model: row.model,
      Timestamp: formatTimestamp(row.timestamp),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "leads.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadExcel(data)} />,
    [data]
  );
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.mobile,
    },
    {
      name: "Model",
      selector: (row) => row.model,
    },
    {
      name: "Timestamp",
      selector: (row) => formatTimestamp(row.timestamp),
      sortable: true,
    },
  ];
  function formatTimestamp(timestamp) {
    if (!timestamp?.seconds) return "Invalid date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  }
  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item.mobile?.toLowerCase().includes(search.toLowerCase()) ||
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, data]);
  return (
    <div className="flex flex-row h-screen">
      <Sidebar active={active} />
      <div className="flex-auto bg-gray-50 overflow-auto">
        <Navbar handleActive={handleActive} />
        <div className="mx-5 mt-5">
          {loading ? (
            <div className="text-center">
              <CgSpinner
                className="animate-spin flex mx-auto"
                size={50}
                color="#7E22CE"
              />
            </div>
          ) : (
            <DataTable
              title="All Leads"
              columns={columns}
              data={filteredData}
              selectableRows
              selectableRowsHighlight
              pagination
              fixedHeader
              fixedHeaderScrollHeight="100vh"
              customStyles={customStyles}
              highlightOnHover
              subHeader
              actions={actionsMemo}
              subHeaderComponent={
                <SearchComponent search={search} setSearch={setSearch} />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
const SearchComponent = ({ search, setSearch }) => {
  return (
    <div className="flex items-center justify-center">
      <input
        className="border-2 rounded mb-3 py-2 px-4 text-gray-700 font-light focus:outline-none"
        type="text"
        placeholder="Search by name, phone or email"
        value={search}
        style={{ width: "300px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
export default Dashboard;
