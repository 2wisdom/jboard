import { Link, useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  return (
    <div>
      post detail page {id}
      <Link to="/">Go To Index</Link>
    </div>
  );
}
