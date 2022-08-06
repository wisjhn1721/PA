import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
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

// const dummmyData = [
//   {
//     id: 1,
//     name: "CS621 Adv Web Dev",
//     instructor: "Dr. Unan",
//     startDate: "06/09/2022",
//     endDate: "08/12/2022"
//   },
//   {
//     id: 2,
//     name: "CS633 Cloud Computing",
//     instructor: "Dr. Hasan",
//     startDate: "06/09/2022",
//     endDate: "08/12/2022"
//   },
// ];

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'course_name',
    key: 'course_name',
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
    dataIndex: 'start_date',
    key: 'startDate',
    width: '25%',
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'endDate',
    width: '25%',
  },
];


const CourseList = ({ user }: { user: {[key: string]: string} | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);


  useEffect(() => {
    getCourses();
  }, [onUpdate]);

  const getCourses = () => {
    setIsLoading(true);
    axios
      .get("/api/get-courses")
      .then((resp) => {
        const res = resp.data;
        if (res) setCourses(res);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error);
      });
  }

  console.log(courses);

  return (
    <Table
      size="middle"
      dataSource={courses}
      columns={columns}
      rowKey={"id"}
      loading={isLoading}
      footer={() => <Course user={user} onRefresh={(val) => setOnUpdate(val)} />}
    />
  );
};


export { CourseList };