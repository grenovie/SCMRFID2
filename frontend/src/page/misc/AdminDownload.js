import { Button, toast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";

const AdminDownload = () => {
  const date = new Date();
  const [newData, setNewData] = useState(null);
  const submitHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/api/data/renDataAdmin", {}, config);
      for (var i = 0; i < data.length; i++) {
        delete data[i]._id;
        setNewData(data);
      }
      console.log(newData);
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const ws = XLSX.utils.json_to_sheet(newData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });
      const datadata = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(
        datadata,
        "Logs of Date:" + date.toLocaleDateString() + "ADMIN" + fileExtension
      );
    } catch (error) {}
  };

  return (
    <Button bgColor={"white"} onClick={submitHandler}>
      EXPORT to EXCEL -
      <DownloadOutlined />
    </Button>
  );
};

export default AdminDownload;
