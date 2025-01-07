/** @format */

import React from "react";
import { Form, Input, Select, Checkbox, Button, Space, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./style";
import { IField } from "./types";
import { API } from "@/services/api";
import { routes } from "@/constants/routes";
interface ICreateDocument {
  document_name: string;
  fields: IField[];
}
enum FieldTypes {
  Select = "select",
  Input = "input",
  Number = "number",
  TextArea = "textarea",
}

const fieldTypeOptions = [
  { label: "Input", value: "input" },
  { label: "Select", value: "select" },
  { label: "Number", value: "number" },
  { label: "Textarea", value: "textarea" },
];

export const status = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "INACTIVE", value: "INACTIVE" },
  { label: "ACTIVE", value: "ACTIVE" },
];
const { TextArea } = Input;

const DocumentForm: React.FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => API.createDocument(data),
    onSuccess: () => {
      navigate(routes.HOME);
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
      } else {
      }
    },
  });

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: ICreateDocument) => {
    mutate(values);
  };

  const FieldComponents: Record<FieldTypes, JSX.Element> = {
    [FieldTypes.Select]: (
      <Select
        options={[
          { label: "MALE", value: "Male" },
          { label: "FEMALE", value: "Female" },
        ]}
        placeholder="Please Select"
      />
    ),
    [FieldTypes.Input]: <Input placeholder="Default Text" />,
    [FieldTypes.Number]: <Input type="number" placeholder="Default Number" />,
    [FieldTypes.TextArea]: <TextArea rows={4} placeholder="Default Text" />,
  };

  return (
    <FormContainer>
      <Form
        form={form}
        name="document_form"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical">
        <Form.Item
          name="document_name"
          label="Document title"
          rules={[{ required: true, message: "Please input document title!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select field type!" }]}>
          <Select options={status} />
        </Form.Item>
        <Form.List name="fields">
          {(fields, { add }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <>
                  <Form.Item
                    {...restField}
                    name={[name,]}
                    label="Field sequence (weight)"
                    initialValue={index + 1}>
                    <Input min={1} disabled />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "field_type"]}
                    label="Field type"
                    rules={[
                      { required: true, message: "Please select field type!" },
                    ]}>
                    <Select options={fieldTypeOptions} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "field_name"]}
                    label="Field name"
                    rules={[
                      { required: true, message: "Please input field name!" },
                    ]}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "is_mandatory"]}
                    valuePropName="checked">
                    <Checkbox>Mandatory</Checkbox>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues?.fields?.[name]?.field_type !==
                      currentValues?.fields?.[name]?.field_type
                    }>
                    {({ getFieldValue }) => {
                      const fieldType = getFieldValue([
                        "fields",
                        name,
                        "field_type",
                      ]) as FieldTypes;

                      if (!fieldType || !FieldComponents[fieldType]) {
                        return null;
                      }

                      return (
                        <Form.Item
                          {...restField}
                          name={[name, "current_value"]}
                          label={
                            fieldType === FieldTypes.Select
                              ? "Default Option"
                              : fieldType === FieldTypes.Number
                              ? "Default Number"
                              : "Default Value"
                          }>
                          {FieldComponents[fieldType]}
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}>
                  Add more
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default DocumentForm;
