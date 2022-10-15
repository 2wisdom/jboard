import {
  Box,
  Button,
  Container,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../layout/Layout";
import httpClient from "../../libs/http-client";

export type PostDetail = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  author_id: string;
};

export function usePost(id: number) {
  return useQuery(
    ["usePostDetail", id],
    async () => {
      const { data } = await httpClient.get<PostDetail>(`/posts/${id}`);

      return data;
    },
    {
      enabled: !!id,
    }
  );
}

export default function PostDetail() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(paramId!, 10);

  const { data, isFetching, error } = usePost(id);

  const formatDate = useCallback(
    (data?: string) => {
      if (!data) return "알 수 없음";
      return dayjs(data).format("YYYY. MM. DD. hh:mm");
    },
    [data]
  );

  return (
    <Layout>
      <Container component={Box} sx={{ padding: 2 }}>
        <Box>
          <Button size="large" variant="text" onClick={() => navigate("/")}>
            <ArrowBackIcon fontSize="large" />
            목록으로
          </Button>
        </Box>
        <Box>
          {isFetching ? (
            <Skeleton height={200} />
          ) : (
            <Typography variant="h2">{data?.title}</Typography>
          )}

          {isFetching ? (
            <Skeleton />
          ) : (
            <Typography variant="body2">
              작성일 {formatDate(data?.created_at)}
            </Typography>
          )}
        </Box>
        {isFetching ? (
          <Skeleton />
        ) : (
          <Box
            component="div"
            sx={{ py: 5 }}
            dangerouslySetInnerHTML={{ __html: data?.content! }}
          />
        )}
      </Container>
    </Layout>
  );
}
