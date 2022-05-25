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
  useToast,
} from "@chakra-ui/react";
import SideDrawer from "../../drawer/SideDrawer";
import axios from "axios";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Download from "../misc/Download";
import Highlighter from "react-highlight-words";

const StudentList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const toast = useToast();
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

  const [isEditing, setIsEditing] = useState(false);
  const [dataNew, setDataNew] = useState();
  const [data, setData] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [kolum, setKolum] = useState();
  const [professorId, setProfessorId] = useState();
  const [dataSource, setDataSource] = useState();
  const [value, setValue] = useState();
  const [studentId, setStudentId] = useState();
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
  };
  var section = "BSIT-32";
  const onChange = (e) => {
    setEditingStudent(e.target.value);
    setStudentId(data?.studentId);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setProfessorId(user.professorId);
  }, []);

  const submitStatus = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/data/changeStatus",
        { editingStudent, studentId },
        config
      );
    } catch (error) {}
  };
  const submitHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/api/data/renDataBSIT33", {}, config);
      setKolum(columns);
      setDataSource(data);
    } catch (error) {}
  };

  const columns = [
    {
      title: "Lastname",
      dataIndex: "LastName",
      key: "LastName",
      ...getColumnSearchProps("LastName"),
      sorter: (a, b) => a.LastName.localeCompare(b.LastName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Firstname",
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
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      sortDirections: ["descend", "ascend"],
    },
  ];

  const columnAbsent = [
    {
      title: "Lastname",
      dataIndex: "surName",
      key: "LastName",
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "FirstName",
    },
    {
      title: "M.I",
      dataIndex: "midName",
      key: "midName",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      key: "action",
      title: "Change Status",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
              style={{ fontSize: 15, color: "green", marginLeft: 35 }}
            />
          </>
        );
      },
    },
  ];

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
    setData({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
    setData(null);
  };

  const handleAbsent = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        "/api/data/renDataAbsent",
        { section },
        config
      );
      setKolum(columnAbsent);
      setDataSource(data);
    } catch (error) {}
  };

  return (
    <VStack spacing={5} align="stretch" w="100%">
      <Center h="100px" bg="green.200">
        <Image
          marginLeft={50}
          boxSize="75px"
          src="https://upload.wikimedia.org/wikipedia/en/d/dc/Universidad_de_Manila_Logo.png"
        />

        <Spacer />
        <Text color="#557B83" fontWeight="bold" fontSize="5xl">
          STUDENT LIST
        </Text>
        <Spacer />
        <Box p={3}>
          <SideDrawer />
        </Box>
      </Center>
      <Center alignItems="center" h="100px" w="100%" bg="green.200">
        <Button mr={10} onClick={submitHandler}>
          Load Student List
        </Button>
        <Button mr={10} onClick={handleAbsent}>
          Edit Absent Status
        </Button>
        <Download />
      </Center>
      <Center>
        {!dataSource ? (
          <Container bg={"green.200"}>
            <Text fontSize={50}>Select Options</Text>
          </Container>
        ) : (
          <div className="Application">
            <Table columns={kolum} dataSource={dataSource}></Table>

            <Modal
              title="Edit Student"
              visible={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                submitStatus();
                resetEditing();
                toast({
                  title: "Changes Saved",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                  position: "bottom",
                });
              }}
              width={300}
            >
              <Radio.Group onChange={onChange} buttonStyle="solid">
                <Radio.Button value="Excused">Excused</Radio.Button>
                <Radio.Button value="Absent">Absent</Radio.Button>
              </Radio.Group>
            </Modal>
          </div>
        )}
      </Center>
    </VStack>
  );
};

export default StudentList;
