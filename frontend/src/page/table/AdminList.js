import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Table, Modal, Input, Radio, Space } from "antd";
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AdminDownload from "../misc/AdminDownload";

const AdminList = () => {
  const [sourceData, setSourceData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "LastName",
      ...getColumnSearchProps("LastName"),
    },
    {
      title: "FirstName",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "M.I",
      dataIndex: "MiddleName",
      key: "MiddleName",
    },
    {
      title: "StudentId",
      dataIndex: "StudentId",
      key: "StudentId",
    },
    {
      title: "Section",
      dataIndex: "Section",
      key: "Section",
      ...getColumnSearchProps("Section"),
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
    },
    {
      title: "Professor",
      dataIndex: "Professor",
      key: "Professor",
    },
    {
      title: "Room",
      dataIndex: "Room",
      key: "Room",
    },
    {
      title: "TimeIn",
      dataIndex: "TimeIn",
      key: "TimeIn",
      sorter: (a, b) => a.TimeIn.localeCompare(b.TimeIn),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "TimeOut",
      dataIndex: "TimeOut",
      key: "TimeOut",
      sorter: (a, b) => a.TimeOut.localeCompare(b.TimeOut),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
  ];

  const submitHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/api/data/renDataAdmin", {}, config);
      setSourceData(data);
    } catch (error) {}
  };

  return (
    <VStack>
      <Center>
        <div>
          <Button m={2} onClick={submitHandler}>
            {" "}
            Reload Table
          </Button>
          <AdminDownload />
          <Table columns={columns} dataSource={sourceData}></Table>
        </div>
      </Center>
    </VStack>
  );
};

export default AdminList;
