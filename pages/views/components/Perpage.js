import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const data= [
    20, 50, 80, 100
]
const Perpage = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(data[0]);

  const toggle = () => setDropdownOpen(prevState => !prevState);
    let listData = data.map((item, index) => {
        return(
            <DropdownItem key={index} className="ddItem"
                onClick={()=> setValue(item)}
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