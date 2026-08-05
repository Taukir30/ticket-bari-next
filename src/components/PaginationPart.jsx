import React from "react";
import { Pagination } from "@heroui/react";
import Link from "next/link";

const PaginationPart = ({ totalPage, page, from='', to='' }) => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }

    return (
        <Pagination size="md">
            <Pagination.Summary></Pagination.Summary>
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1}>
                        <Link
                            className="flex items-center gap-2"
                            href={`/alltickets?page=${page - 1}&from=${from}&to=${to}`}
                        >
                            <Pagination.PreviousIcon />
                            Prev
                        </Link>
                    </Pagination.Previous>
                </Pagination.Item>
                {pages.map((p) => (
                    <Link key={p} href={`/alltickets?page=${p}&from=${from}&to=${to}`}>
                        <Pagination.Item>
                            <Pagination.Link isActive={p === page}>{p}</Pagination.Link>
                        </Pagination.Item>
                    </Link>
                ))}
                <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPage}>
                        <Link
                            className="flex items-center gap-2"
                            href={`/alltickets?page=${page + 1}&from=${from}&to=${to}`}
                        >
                            Next
                            <Pagination.NextIcon />
                        </Link>
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
};

export default PaginationPart;

