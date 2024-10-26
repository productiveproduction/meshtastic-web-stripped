import React from 'react'
import { useState } from 'react'
import { Button } from '@componentsNEW/Button'
import styled from 'styled-components'

export default function Channels() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title>Vite + React</Title>
      <Card>
        <Button $variant="primary" size="medium" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </Card>
    </>
  )
}

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`

const Card = styled.div`
  padding: 2em;
`
