import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      hello index page
      <button onClick={() => navigate("/posts/1")}>go to detail 1</button>
    </Layout>
  );
}
