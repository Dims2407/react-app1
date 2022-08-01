import React from "react";
import s from "./Paginator.module.css";

export const Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
     let newPages
    if (currentPage <= 5) {
        newPages = pages.slice(0, 10)
    } else {
        newPages = pages.slice(currentPage - 5, currentPage + 5)
    }

    return <div>

            {newPages.map(p => {
                    return <span className={currentPage === p && s.selectedPage}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }
                                 }>{p}</span>
                }
            )}

    </div>
}