import { gql, request } from "graphql-request"

export type ImpactProject = {
  id: string
  name: string
  about: string | null
  token: string | null
  utility: string | null
  twitter: string | null
  discord: string | null
  url: string | null
  listed: string[] | null
  chain: string[] | null
  microSector: string[] | null
  macroSector: string[] | null
}

export const NullProject: ImpactProject = {
  id: "NULL",
  name: "NULL",
  about: null,
  token: null,
  utility: null,
  twitter: null,
  discord: null,
  url: null,
  listed: null,
  chain: null,
  microSector: null,
  macroSector: null,
} as const

export const getAllProjects = async () => {
  const { cryptoImpactMap } = await request<{ cryptoImpactMap: ImpactProject[] }>(
    endpoint,
    ALL_PROJECTS
  )

  return cryptoImpactMap
}

const endpoint = process.env.CRYPTO_IMPACT_MAP_GRAPHQL_ENDPOINT!.toString()

const ALL_PROJECTS = gql`
  {
    cryptoImpactMap {
      id
      name
      about
      token
      utility
      twitter
      discord
      url
      listed
      chain
      microSector
      macroSector
    }
  }
`
