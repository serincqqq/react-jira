import { Select, Spin } from 'antd'
import { useMemo, useRef, useState } from 'react'
import debounce from 'lodash/debounce'
import { getUserList } from '@/services'

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchRef = useRef(0)
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        setOptions(newOptions)
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Select
      labelInValue
      filterOption={false}
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
}
async function fetchUser(username) {
  return getUserList(username).then((res) =>
    res.data.map((user) => ({
      label: user.userName,
      value: user._id,
    }))
  )
}
function SearchSelect(props) {
  const [value, setValue] = useState([])
  const handleChange = (newVal) => {
    setValue(newVal)
    const { label, value, key } = newVal
    props.onSelect({ label, value, key })
  }
  return (
    <DebounceSelect
      value={value}
      placeholder="Select assignee"
      fetchOptions={fetchUser}
      onChange={handleChange}
      style={{
        width: '100%',
      }}
    />
  )
}
export default SearchSelect
