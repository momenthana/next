import { helloRepo, useHelloRepo } from '@/repo/hello'

export const useRepo = () => ({
  helloRepo: { ...helloRepo(), ...useHelloRepo() },
})
