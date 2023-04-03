import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';


const KhMyFilter = ({types, type, id, title, handleTitle}) => {
  console.log(id);//qna_type
  const navigate = useNavigate();
  const location = useLocation();//URL정보를 가져오려면 필요

  const setPath = (oldItem, newItem, key) => {
    console.log(location.pathname);
    console.log(oldItem);
    console.log(newItem)
    console.log(key);

    let path= location.pathname+'?'+key+'='+newItem;
    return path;
  }

  return (
    <DropdownButton variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            if(type){ 
              navigate(setPath(title,element,id)); 
            }
            handleTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  );
};

export default KhMyFilter;