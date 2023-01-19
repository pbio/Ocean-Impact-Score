
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import IndustrySelector from './industry-selector'

const props = {selectedIndustry:"", setIndustry:jest.fn()}

describe('IndustrySelector', () => {
  it('checks if the button exists', () => {
    render(<IndustrySelector {...props} />)
    const select = screen.getByRole('button')
    expect(select).toBeInTheDocument()
  })
  it('checks if the text is Industry', () => {
    render(<IndustrySelector />)
    const select = screen.getByText('Industry')
    expect(select).toBeInTheDocument()
  })
  it('checks if the Communications option is selected', () => {
    render(<IndustrySelector selectedIndustry= "Communications" />)
    const select = screen.getByText('Communications')
    expect(select).toBeInTheDocument()
  })
  it('checks if the no option is selected', () => {
    render(<IndustrySelector selectedIndustry= "" />)
    const select = screen.getByText('Industry')
    expect(select).toBeInTheDocument()
  })
})
