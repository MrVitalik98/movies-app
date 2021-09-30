import { memo, FC } from 'react'
import Pagination from 'react-responsive-pagination'


interface IProps {
  currentPage: number
  changePage: (n: number) => void
  total: number
}


const Paginate:FC<IProps> = ({currentPage, changePage, total}) => {
  const handleChangeCurrentPage = (p:number) => changePage(p)
  
  
  return (
    <Pagination
      current={currentPage}
      total={total}
      onPageChange={handleChangeCurrentPage}
      maxWidth={350}
    />
  )
}

export default memo(Paginate)