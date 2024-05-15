import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { deleteUser, searchUsers, updateUser } from "@/services/ant-design-pro/api";
import { Image, message, Modal, Form, Input, Select } from "antd";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const YourComponent = () => {
  const actionRef = useRef<ActionType>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<API.CurrentUser | null>(null);
  const [form] = Form.useForm();

  const handleUpdateUser = async () => {
    try {
      const values = await form.validateFields();
      Modal.confirm({
        title: '确认更新',
        content: '确定要更新这个用户的信息吗？',
        onOk: async () => {
          try {
            await updateUser({
              id: currentUser?.id,
              ...values,
            });
            message.success('用户信息更新成功');
            setEditModalVisible(false);
            actionRef.current?.reload();
          } catch (error) {
            message.error('更新失败，请重试');
          }
        },
      });
    } catch (errorInfo) {
      console.error('Failed:', errorInfo);
    }
  };

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render:(_, record) => (
        <div>
          <Image src={record.avatarUrl} width={100} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
      valueEnum: {
        0: { text: '男', status:"Default" },
        1: {
          text: '女',
          status: 'Default',
        }
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '账号状态',
      dataIndex: 'userStatus',
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: { text: '用户', status:"Default" },
        1: {
          text: '管理员',
          status: 'Success',
        }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentUser(record);
            setEditModalVisible(true);
            form.setFieldsValue(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              content: '确定要删除这个用户吗？',
              onOk: async () => {
                try {
                  await deleteUser(record.id);
                  message.success('用户删除成功');
                  action?.reload();
                } catch (error) {
                  message.error('删除失败，请重试');
                }
              },
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.CurrentUser>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(500);
          const userList = await searchUsers();
          return {
            data: userList
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户管理"
      />

      <Modal
        title="编辑用户信息"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleUpdateUser}
      >
        <Form
          form={form}
          initialValues={currentUser}
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像 URL"
            name="avatarUrl"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select>
              <Select.Option value={0}>男</Select.Option>
              <Select.Option value={1}>女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="权限"
            name="userRole"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Select>
              <Select.Option value={0}>用户</Select.Option>
              <Select.Option value={1}>管理员</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default YourComponent;
