import { BsFileEarmarkSpreadsheet } from "react-icons/bs";

type Props = {
  tableData:any[],
}

const TableExport = ({tableData = []}:Props) => {
  // const tableData = [
  //   ["Name", "Age", "Country"],
  //   ["John Doe", "25", "USA"],
  //   ["Jane Smith", "30", "Canada"]
  //   // Add more rows as needed
  // ];

  const exportToCSV = () => {
    if(tableData.length <= 0) return console.log('table empty');
    
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(tableData);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertToCSV = (data:any) => {
    const csvRows = [];

    // Extract column headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Convert each object to a CSV row
    for (const row of data) {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  return (

    <button 
      className="medium" 
      onClick={exportToCSV}
      disabled={tableData.length <= 0 ? true : false}
    >
      <BsFileEarmarkSpreadsheet />
      Export to CSV
    </button>

  );
};

export default TableExport;
