import {describe, it} from '@jest/globals'
import {render, screen} from "@testing-library/react"
import {Order} from "./Order"
import React from "react"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUseNavigate,
}));

describe('order page', () => {
    it('should allow choosing pizza size', async () => {
        render(<Order />)

        expect(screen.getByText('What size of pizza would you like?')).toBeVisible()

        await userEvent.click(screen.getByRole('button', {name: 'Medium'}))

        expect(screen.getByRole('option', {name: 'Small'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'Medium'})).toBeVisible()
        expect(screen.getByRole('option', {name: 'Large'})).toBeVisible()

        await userEvent.click(screen.getByRole('option', {name: 'Large'}))

        expect(screen.getByRole('option', {name: 'Small'})).toBeNull()
        expect(screen.queryByRole('option', {name: 'Medium'})).toBeNull()
        expect(screen.getByRole('button', {name: 'Large'})).toBeVisible()
    })

    it('should allow choosing pizza dough', async () => {
        render(<Order />)

        expect(screen.getByText('Choose type of dough')).toBeVisible()

        await userEvent.click(screen.getByText('Multigrain'))

        expect(screen.getByRole('radio', {name: 'Plain'})).not.toBeChecked()
        expect(screen.getByRole('radio', {name: 'Multigrain'})).toBeChecked()
        expect(screen.getByRole('radio', {name: 'Gluten Free'})).not.toBeChecked()
    })

    it('should allow choosing pizza toppings', async () => {
        render(<Order />)

        await userEvent.click(screen.getByText('Pepperoni'))
        await userEvent.click(screen.getByText('Pineapples'))

        expect(screen.getByRole('checkbox', {name: 'Cheese (included)'})).toBeChecked()
        expect(screen.getByRole('checkbox', {name: 'Pepperoni'})).toBeChecked()
        expect(screen.getByRole('checkbox', {name: 'Green Peppers'})).not.toBeChecked()
        expect(screen.getByRole('checkbox', {name: 'Onions'})).not.toBeChecked()
        expect(screen.getByRole('checkbox', {name: 'Bacon'})).not.toBeChecked()
        expect(screen.getByRole('checkbox', {name: 'Pineapples'})).toBeChecked()
    })

    it('should navigate to confirmation page up on submitting the order', async () => {
        render(<Order />)

        await userEvent.click(screen.getByText('Order'))

        expect(mockedUseNavigate).toHaveBeenCalledWith(
            '/confirmation',
            {"state": {"dough": "plain", "size": "medium", "toppings": ["cheese"]}}
        )
    });
})
