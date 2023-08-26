import React from 'react';

import './List.scss';
import Card from '../../components/Card/Card';
import useFetch from '../../hooks/useFetch.js';

const List = ({categorieId, sort}) => {

  const {data, loading, error} = useFetch(
    `/products?populate=*&[filters][categories][id]=${categorieId}&sort=price:${sort}`
  )

  return (
    <div className='list'>
      {
        data?.map(item => (
          <Card item={item} key={item.id} />
        ))
      }
    </div>
  )
}

export default List