import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function PaginationComponent() {
    return (
        <Pagination className="pg">
            <PaginationItem className="pgItem icon">
                <PaginationLink className="pgLink" href="#">
                    <img src="/images/start.png" alt="first" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className="pgItem icon">
                <PaginationLink className="pgLink" href="#">
                    <img src="/images/previous.png" alt="previous" />
                </PaginationLink>
            </PaginationItem>


            {/* <PaginationItem className="pgItem">
                <PaginationLink className="pgLink" href="#">
                    11
                </PaginationLink>
            </PaginationItem> */}
            <PaginationItem className="pgItem pgActive" active>
                <PaginationLink className="pgLink" href="#">
                    12
                </PaginationLink>
            </PaginationItem>
            {/* <PaginationItem className="pgItem">
                <PaginationLink className="pgLink" href="#">
                    13
                </PaginationLink>
            </PaginationItem> */}


            <PaginationItem className="pgItem icon">
                <PaginationLink className="pgLink" href="#">
                    <img src="/images/next.png" alt="next" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className="pgItem icon">
                <PaginationLink className="pgLink" href="#">
                    <img src="/images/end.png" alt="last" />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}
export default PaginationComponent;