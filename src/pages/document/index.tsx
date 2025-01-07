import { useState } from "react";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Button, Select, Table } from "antd";
import { Link } from "react-router-dom";
import { CreateItem, DocumentsContainer, SortContainer } from "./style";
import { IDocument } from "./types";
import { routes } from "@/constants/routes";
import { status } from "./create";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date);
};

const Documents = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    "DRAFT"
  );

  const { data, isFetching, error } = useQuery<IDocument[]>({
    queryKey: ["getAllDocuments", selectedStatus?.toString()],
    queryFn: async () => API.getAllDocuments(selectedStatus!),
    enabled: !!selectedStatus || selectedStatus === undefined,
  });

  if (isFetching) return <p>loading</p>;

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Document title",
      dataIndex: "document_name",
      key: "document_name",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => formatDate(created_at),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Document Size",
      dataIndex: "field_count",
      key: "document_name",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (_: any, record: IDocument) => (
        <Link to={`/update/${record.id}`}>Document preview</Link>
      ),
    },
  ];

  return (
    <DocumentsContainer>
      <CreateItem>
        <SortContainer>
          <span>Sort By Status</span>
          <Select
            options={status}
            placeholder="Please Select"
            onChange={(value) => setSelectedStatus(value)}
          />
        </SortContainer>
        <Link to={routes.CREATE_DOC}>
          <Button>Create Document</Button>
        </Link>
      </CreateItem>
      <Table dataSource={data} columns={columns} />
    </DocumentsContainer>
  );
};

export default Documents;
