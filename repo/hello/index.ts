import { HelloDocument, HelloQuery, HelloQueryVariables } from '@/lib/gql/queries/hello.gql';
import { createLazyQuery } from '@/utils/createQuery';
import { useEffect, useMemo } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { Queries } from './type';

/**
 * Dynamic Queries
 */
export const dynamicQueries = {
  helloLazyQuery: createLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, (helloLazyQueryResult) => {
    helloRepo.setState({ helloLazyQueryResult });
  })
};

/**
 * Dynamic Repo
 */
export const helloRepo = create<Queries>()(subscribeWithSelector((set, get) => ({ ...dynamicQueries })));

/**
 * Client Side Repo
 */
export const useHelloRepo = () => {
  const results = {};

  const queries = useMemo(() => ({}), []);

  useEffect(() => {
    helloRepo.setState(queries);
  }, [queries]);

  return { ...dynamicQueries, ...queries, ...results,  };
};
