"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const PaginationUI = ({ totalItems, limit, currentPage, onPageChange }) => {
    return (
        <Pagination.Root
                count={totalItems}
                pageSize={limit}
                page={currentPage}
                onChange={(e) => onPageChange(e.page)}
        >
            <ButtonGroup variant="ghost" size="sm">
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                render={(page) => (
                    <IconButton
                        key={page.value}
                        aria-label={`Sayfa ${page.value}`}
                        variant={{ base: "ghost", _selected: "outline" }}
                        onClick={() => onPageChange(page.value)}
                        >
                        {page.value}
                    </IconButton>
                )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}


export default PaginationUI;