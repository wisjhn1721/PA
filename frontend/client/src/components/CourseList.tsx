import { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

// LOCAL
import { Course } from "../forms";


interface DataType {
  id: number;
  name: string;
  instructor: string;
  startDate: string;
  endDate: string;
}

const dummmyData = [
  {
    id: 1,
    name: "CS621 Adv Web Dev",
    instructor: "Dr. Unan",
    startDate: "06/09/2022",
    endDate: "08/12/2022"
  },
  {
    id: 2,
    name: "CS633 Cloud Computing",
    instructor: "Dr. Hasan",
    startDate: "06/09/2022",
    endDate: "08/12/2022"
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
  },
  {
    title: 'Instructor',
    dataIndex: 'instructor',
    key: 'instructor',
    width: '25%',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '25%',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    width: '25%',
  },
];


const CourseList = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Table
      size="middle"
      dataSource={dummmyData}
      columns={columns}
      rowKey={"id"}
      loading={isLoading}
      footer={() => <Course />}
    />
  );
};


export { CourseList };