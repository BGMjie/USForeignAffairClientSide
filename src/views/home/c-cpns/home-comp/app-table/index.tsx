import React from 'react'
import { Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
interface DataType {
  key: string
  id: number
  lastname: string
  date: Date
  texts: string
  title: string
  travel_begin: Date
  travel_end: Date
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Texts',
    dataIndex: 'texts',
    key: 'texts',
    ellipsis: {
      showTitle: false
    },
    render: (texts) => (
      <Tooltip placement="topLeft" title={texts}>
        {texts}
      </Tooltip>
    )
  },
  {
    title: 'Travel Begin',
    dataIndex: 'travel_begin',
    key: 'travel_begin'
  },
  {
    title: 'Travel End',
    dataIndex: 'travel_end',
    key: 'travel_end'
  }
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address'
  // },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green'
  //         if (tag === 'loser') {
  //           color = 'volcano'
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   )
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   )
  // }
]

const HomeTable: React.FC = (props: any) => {
  console.log(props?.merged_data)
  const data: DataType[] = props?.merged_data?.data?.records
  return <Table columns={columns} dataSource={data} />
}
export default HomeTable
