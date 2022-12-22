import { dynamicQueries, useHelloRepo } from '.';

export type Queries = typeof dynamicQueries & Partial<QueriesResult<typeof dynamicQueries>> & Partial<ReturnType<typeof useHelloRepo>>;

export type PostQueries = typeof dynamicQueries & QueriesResult<typeof dynamicQueries> & ReturnType<typeof useHelloRepo>;
