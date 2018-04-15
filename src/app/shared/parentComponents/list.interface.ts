export interface listElements
{
    current_page_number?: number,
    num_items_per_page?: number,
    items?: any[],
    total_count?: number,
    paginator_options?: JSON,
    custom_parameters?: any[],
    route?: string,
    params?: JSON,
    page_range?: number,
    template?: string,
    sortable_template?: string,
    filtration_template?: string
}

export interface paginationTransParams
{
	current?: number,
	total?: number
}