import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const data = [
  20, 50, 80, 100
]
const Perpage = ({ router }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(router.query.page_size ? parseInt(router.query.page_size) : 20);
  const onChangeValue = (value) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = 1;
    currentQuery.page_size = parseInt(value);
    setValue(value);
    if (currentQuery.page === 1 && (currentQuery.page_size === 20)) {
      router.push({ pathname: currentPath })
  } else {
      router.push({
          pathname: currentPath,
          query: currentQuery,
      });
  }
  }
  const toggle = () => setDropdownOpen(prevState => !prevState);
  let listData = data.map((item, index) => {
    return (
      <DropdownItem key={index} className="ddItem"
        onClick={() => onChangeValue(item)}
      >
        {item}
      </DropdownItem>
    )
  })
  return (
    <Dropdown className="perpage" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="ddToggle" caret>
        {value}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header className="ddHeader">Số lượng</DropdownItem>
        {
          listData
        }
      </DropdownMenu>
    </Dropdown>
  );
}

export default Perpage;