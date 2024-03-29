import React, {useState, useEffect} from "react";
import s from "./Paginator.module.css";
import cn from 'classnames'

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 9}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    if (portionNumber === null) portionNumber = 1

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage])

    //  let newPages
    // if (currentPage <= 5) {
    //     newPages = pages.slice(0, 10)
    // } else {
    //     newPages = pages.slice(currentPage - 5, currentPage + 5)
    // }

    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [s.selectedPage] : currentPage === p
                }, s.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }
                             }>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
    </div>
}

