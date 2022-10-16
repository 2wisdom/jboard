import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import httpClient from "../libs/http-client";

/*
function createData(
  id: number,
  title: string,
  author_id: string,
  created_at: string
) {
  return { id, title, author_id, created_at };
}

const rows = [
  createData(1, "글제목1", "닉네임1", "2022-01-01"),
  createData(2, "글제목2", "닉네임2", "2022-01-02"),
  createData(3, "글제목3", "닉네임3", "2022-01-03"),
  createData(4, "글제목4", "닉네임4", "2022-01-04"),
  createData(5, "글제목5", "닉네임5", "2022-01-05"),
];
*/

// 데이터 불러오기
function usePosts() {
  return useQuery(["usePosts"], async () => {
    const { data } = await httpClient.get<PostResponse>("/posts");
    return data;
  });
}

// 게시글
interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// 페이지네이션
interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

/*
const json = {
  items: [
    {
      author_id: "string",
      content: "string",
      created_at: "2022-10-14T16:10:28.993Z",
      deleted_at: null,
      id: 1,
      title: "string",
      updated_at: "2022-10-14T16:10:28.993Z",
    },
  ],
  meta: {
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  },
};
*/

interface PostResponse {
  items: Post[];
  meta: Meta;
}

export default function IndexPage() {
  const navigate = useNavigate();

  usePosts();

  const { data } = usePosts();
  console.log("data :", data);

  return (
    <Layout>
      {/* hello index page */}
      {/* <button onClick={() => navigate("/posts/1")}>go to detail 1</button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">author_id</TableCell>
              <TableCell align="right">created_at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <Link to={`/posts/${row.id}`}>
                  <TableCell align="right">{row.title}</TableCell>
                </Link>
                <TableCell align="right">{row.author_id}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
