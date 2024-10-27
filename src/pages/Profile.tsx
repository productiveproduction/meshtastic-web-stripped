import React, { useState } from 'react'
import styled from 'styled-components'
import { Check } from 'lucide-react'
import { Button } from '@components/Button'


const communities = [
  { id: 'food-beverage', name: 'food + beverage', color: '#4ade80' },
  { id: 'health-wellness', name: 'health + wellness', color: '#60a5fa' },
  { id: 'fashion-beauty', name: 'fashion, beauty, design', color: '#fb923c' },
  { id: 'tech-sustainability', name: 'technology + sustainability', color: '#facc15' },
  { id: 'arts-culture-entertainment', name: 'arts, culture + entertainment', color: '#a78bfa' },
]

export default function Profile() {
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([])

  const toggleCommunity = (id: string) => {
    setSelectedCommunities(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSave = () => {
    // Here you would typically send the selectedCommunities to your backend
    console.log('Saved communities:', selectedCommunities)
    alert('Profile saved successfully!')
  }

  const handleCancel = () => {
    setSelectedCommunities([])
  }

  return (
    <ProfileContainer>
      <Title>5 plays of lyf communities</Title>
      <ToggleGroup>
        {communities.map(community => (
          <ToggleGroupItem 
            key={community.id}
            $isActive={selectedCommunities.includes(community.id)}
            $color={community.color}
            onClick={() => toggleCommunity(community.id)}
          >
            {community.name}
            {selectedCommunities.includes(community.id) && <Check size={20} />}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ButtonGroup>
        <Button $variant="outline" size="small" onClick={handleCancel}>Cancel</Button>
        <Button $variant="primary" size="small" onClick={handleSave}>Save</Button>
      </ButtonGroup>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
`

const ToggleGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const ToggleGroupItem = styled.button<{ $isActive: boolean; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${props => props.$isActive ? props.$color : '#f3f4f6'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  border-radius: 0.375rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};

  &:hover {
    background-color: ${props => props.$isActive ? props.$color : '#e5e7eb'};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`