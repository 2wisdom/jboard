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

interface PostResponse {
  items: Post[];
  meta: Meta;
}

export default function IndexPage() {
  const { data } = usePosts();
  console.log("data :", data);

  return (
    <Layout>
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
