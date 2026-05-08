
  return (
<Box
  position="sticky"
  top="0"
  width="100%"
  backgroundColor="gray.100"
  zIndex="sticky"
  boxShadow="sm"
  p={2}
>

  {/* HELE HEADER SMALLER MAKEN */}
  <Flex
    maxW="650px"          // ⬅️ VEEL SMALLER
    mx="auto"
    width="100%"
    align="flex-start"
    justify="space-between"
    gap={4}
    direction={{ base: "column", md: "row" }}
  >

    {/* LINKERKOLOM: LOGO + ZOEKBALK */}
    <Flex direction="column" flex="1" align="flex-start">
      <Image
        src="/images/logo.png"
        alt="Winc Events"
        height={{ base: "120px", sm: "160px", md: "200px", lg: "240px" }}  // ⬅️ VEEL GROTER
        objectFit="contain"
      />

      <Input
        mt={1}                     // ⬅️ minimale ruimte
        width="100%"               // ⬅️ strak onder logo
        bg="white"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Flex>

    {/* RECHTERKOLOM: KNOP */}
    <Flex
      align={{ base: "stretch", md: "flex-start" }}
      justify="flex-start"
    >
      <Button
        width={{ base: "100%", md: "auto" }}
        onClick={onCreate}
      >
        Create new event
      </Button>
    </Flex>

  </Flex>

</Box>
