import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ExclamationCircleFilled,
  CheckSquareFilled,
} from '@ant-design/icons'
const prioritys = [
  {
    icon: <ArrowUpOutlined style={{ color: '#CD1317' }} />,
    label: 'Highest',
  },
  {
    icon: <ArrowUpOutlined style={{ color: '#E9494A' }} />,
    label: 'High',
  },
  {
    icon: <ArrowUpOutlined style={{ color: '#E97F33' }} />,
    label: 'Medium',
  },
  {
    icon: <ArrowDownOutlined style={{ color: '#2D8738' }} />,
    label: 'Low',
  },
  {
    icon: <ArrowDownOutlined style={{ color: '#57A55A' }} />,
    label: 'Lowest',
  },
]
const issueType = [
  {
    icon: <CheckSquareFilled style={{ color: '#4FADE6' }} />,
    label: 'Task',
  },
  {
    icon: <ExclamationCircleFilled style={{ color: '#E44D42' }} />,
    label: 'Bug',
  },
]
export { issueType, prioritys }
