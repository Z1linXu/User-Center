
import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {searchUsers} from "@/services/ant-design-pro/api";
import { TableDropdown } from '@ant-design/pro-components';



const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: 'User Account',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <img src={record.avatarUrl} width={100} />
      </div>
    ),
  },

  {
    title: 'Gender',
    dataIndex: 'gender',
    copyable: true,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
  },

  {
    title: 'Status',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
  },
  {
    title: 'Serial Number',
    dataIndex: 'serialNumber',
  },
  {
    title: 'Role',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: 'User', status: 'Default' },
      open: {
        text: 'Unresolved',
        status: 'Error',
      },
      1: {
        text: 'Manager',
        status: 'Success',
        disabled: true,
      },
    },
  },
  {
    title: 'Creation Time',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },

  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
       Edit
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        View
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: 'Copy' },
          { key: 'delete', name: 'Delete' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return{
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
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
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="User Form"

    />
  );
};
