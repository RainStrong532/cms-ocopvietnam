import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function PaginationComponent(props) {
    const currentPage = props.router ? props.router.query.page : 1;
    const pagginationHandler = (type) => {
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        currentQuery.page = currentQuery.page ? parseInt(currentQuery.page) : 1
        currentQuery.page_size = currentQuery.page_size ? parseInt(currentQuery.page_size) : 20;
        switch (type) {
            case 2:
                {
                    (currentQuery.page > 1)
                        ?
                        currentQuery.page -= 1
                        :
                        currentQuery.page
                }
                break;
            case 3:
                currentQuery.page = 1;
                break;
            case 4:
                currentQuery.page = Math.ceil(props.total / currentQuery.page_size);
                break;
            default:
                {
                    (currentQuery.page < Math.ceil(props.total / currentQuery.page_size))
                        ?
                        currentQuery.page += 1
                        :
                        currentQuery.page
                }
                break;
        }
        if (currentQuery.page === 1 && (currentQuery.page_size === 20 || !currentQuery.page_size)) {
            props.router.push({ pathname: currentPath })
        } else {
            props.router.push({
                pathname: currentPath,
                query: currentQuery,
            });
        }
    };
    const currentQuery = props.router.query;
    currentQuery.page = currentQuery.page ? parseInt(currentQuery.page) : 1
    currentQuery.page_size = currentQuery.page_size ? parseInt(currentQuery.page_size) : 20
    const canGoFirst = (currentQuery.page === 1);
    return (
        <Pagination className="pg">
            <PaginationItem className="pgItem icon"
                onClick={() => {
                    if(!canGoFirst)
                    pagginationHandler(3)
                }}
                title="Trang đầu"
                disabled={canGoFirst}
            >
                <PaginationLink className="pgLink" href="">
                    <img src="/images/start.png" alt="first" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className="pgItem icon"
                onClick={() => {
                    if((currentPage > 1))
                    pagginationHandler(2)
                }}
                disabled={(currentPage > 1) ? false : true}
                title="Trang trước"
            >
                <PaginationLink className="pgLink" href="">
                    <img src="/images/previous.png" alt="previous" />
                </PaginationLink>
            </PaginationItem>


            {/* <PaginationItem className="pgItem">
                <PaginationLink className="pgLink" href="#">
                    11
                </PaginationLink>
            </PaginationItem> */}
            <PaginationItem className="pgItem pgActive" active title="Trang hiện tại">
                <PaginationLink className="pgLink" href="">
                    {
                        currentPage
                            ?
                            currentPage
                            :
                            1
                    }
                </PaginationLink>
            </PaginationItem>
            {/* <PaginationItem className="pgItem">
                <PaginationLink className="pgLink" href="#">
                    13
                </PaginationLink>
            </PaginationItem> */}


            <PaginationItem className="pgItem icon"
                onClick={() => {
                    if((currentPage < Math.ceil(props.total / currentQuery.page_size)))
                    pagginationHandler(1)
                }}
                title="Trang sau"
                disabled={(currentPage < Math.ceil(props.total / currentQuery.page_size)) ? false : true}
            >
                <PaginationLink className="pgLink" href="">
                    <img src="/images/next.png" alt="next" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className="pgItem icon"
                onClick={() => {
                    if((Math.ceil(props.total / currentQuery.page_size) > 1))
                    pagginationHandler(4)
                }}
                title="Trang cuối"
                disabled={(Math.ceil(props.total / currentQuery.page_size) > 1) ? false : true}
            >
                <PaginationLink className="pgLink" href="">
                    <img src="/images/end.png" alt="last" />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}
export default PaginationComponent;