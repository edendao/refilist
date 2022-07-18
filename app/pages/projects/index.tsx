import {
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"
import { Card } from "app/components/Card"
import { ImpactProject, getAllProjects } from "app/core/cryptoImpactMap"
import { BlitzPage, GetStaticProps, Router, useRouterQuery } from "blitz"
import debounce from "lodash/debounce"
import omit from "lodash/omit"
import shuffle from "lodash/shuffle"
import React, { useCallback, useMemo } from "react"
import { FiSearch } from "react-icons/fi"

interface ProjectsProps {
  allProjects: ImpactProject[]
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  return {
    revalidate: 60 * 1000,
    props: {
      allProjects: shuffle(await getAllProjects()),
    },
  }
}

type FilterField = keyof ImpactProject
const FILTER_FIELDS: FilterField[] = ["name", "chain", "microSector", "macroSector"]

const Projects: BlitzPage<ProjectsProps> = ({ allProjects = [] }) => {
  const query = useRouterQuery()
  const setParams = useCallback(
    (query: Record<string, string | string[]>) =>
      Router.push({ query }, undefined, { shallow: true }),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterBy = useCallback(
    debounce(
      (key: FilterField, value: string) => setParams({ ...query, [key]: value.toLowerCase() }),
      2000,
      { leading: true }
    ),
    [query, setParams]
  )

  const removeFilter = useCallback(
    (key: FilterField) => setParams(omit(query, key)),
    [query, setParams]
  )

  const filters: [FilterField, string][] = useMemo(
    () =>
      FILTER_FIELDS.flatMap((f) => (typeof query[f] === "string" ? [[f, query[f] as string]] : [])),
    [query]
  )
  const predicate = useCallback(
    (project: ImpactProject) =>
      filters.every(([key, value]) => {
        const attribute = project[key]
        if (!attribute) {
          return false
        } else if (Array.isArray(attribute)) {
          return attribute.some((v) => v.toLowerCase().includes(value))
        } else {
          return attribute.toLowerCase().includes(value)
        }
      }),
    [filters]
  )
  const projects = useMemo(
    () => (filters.length === 0 ? allProjects : allProjects.filter(predicate)),
    [allProjects, predicate, filters.length]
  )

  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="baseline"
        width="full"
        position="sticky"
        top={0}
        p={8}
        zIndex={42}
        bg={useColorModeValue("gray.100", "gray.800")}
        borderBottomWidth={2}
      >
        <Heading size="md" fontSize="2xl">
          {projects.length === allProjects.length
            ? `${projects.length}`
            : `${projects.length} of ${allProjects.length}`}
          &nbsp;Impact Projects
        </Heading>
        {filters.length !== 0 && (
          <Wrap>
            {filters.map(([key, value]) => (
              <Tag key={key} variant="solid" colorScheme="orange" py={1} px={3} size="md">
                <TagLabel>{value}</TagLabel>
                <TagCloseButton onClick={() => removeFilter(key)} />
              </Tag>
            ))}
          </Wrap>
        )}
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="muted" boxSize="5" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            onChange={(event) => {
              const name = event.target.value as string
              if (!name) {
                removeFilter("name")
              } else {
                filterBy("name", event.target.value)
              }
            }}
          />
        </InputGroup>
      </Stack>
      <SimpleGrid
        mt="6"
        p="6"
        columns={[1, null, 2, null, 3, 4]}
        spacing="6"
        minH="480px"
        h={["80vh", null, "90vh"]}
      >
        {projects.map((p) => (
          <Card key={p.id} overflow="scroll">
            <Stack direction={["column", null, "row"]}>
              <VStack align="start" spacing={3}>
                <Heading as="h3" size="md">
                  {p.name}
                </Heading>
                <Text fontSize="sm">{p.about && preview(p.about, 120)}</Text>
                <Wrap>
                  {p.chain?.map((c) => (
                    <Button variant="solid" key={c} size="xs" onClick={() => filterBy("chain", c)}>
                      {c}
                    </Button>
                  ))}
                  {p.microSector?.map((s) => (
                    <Button
                      variant="solid"
                      key={s}
                      size="xs"
                      onClick={() => filterBy("microSector", s)}
                    >
                      {preview(s, 32)}
                    </Button>
                  ))}
                  {p.macroSector?.map((s) => (
                    <Button
                      variant="solid"
                      key={s}
                      size="xs"
                      onClick={() => filterBy("macroSector", s)}
                    >
                      {preview(s, 32)}
                    </Button>
                  ))}
                </Wrap>
                <HStack>
                  {p.url && (
                    <Button
                      as={Link}
                      isExternal
                      target="_blank"
                      variant="solid"
                      colorScheme="blue"
                      href={p.url}
                      size="sm"
                    >
                      Website
                    </Button>
                  )}
                  {p.twitter?.split(".com/")[1] && (
                    <Button
                      as={Link}
                      href={p.twitter}
                      isExternal
                      target="_blank"
                      variant="solid"
                      colorScheme="twitter"
                      size="sm"
                    >
                      @{p.twitter.split(".com/")[1]}
                    </Button>
                  )}
                  {p.discord && (
                    <Button
                      as={Link}
                      isExternal
                      target="_blank"
                      variant="solid"
                      colorScheme="purple"
                      href={p.discord}
                      size="sm"
                    >
                      Discord
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}

const preview = (s: string, n: number) => {
  if (s.length < n) return s

  const lastSpace = s.lastIndexOf(" ", n)
  if (lastSpace !== -1) {
    return s.slice(0, lastSpace) + "..."
  }

  return s.slice(0, n) + "..."
}

Projects.suppressFirstRenderFlicker = true

export default Projects