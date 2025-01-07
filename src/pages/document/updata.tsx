import { DocumentsContainer } from "./style";
import { IDocument } from "./types";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery<IDocument>({
    queryKey: ["getAllDocuments"],
    queryFn: async () => API.getDocumentById(id),
  });

  return (
    <DocumentsContainer>
      <h1>{data?.document_name}</h1>
    </DocumentsContainer>
  );
};

export default Update;
