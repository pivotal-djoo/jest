import React, {ChangeEvent, useState} from "react"
import {Button, Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent} from "@mui/material"
import {useNavigate} from "react-router-dom"

type Pizza = {
    size: string
    dough: string
    toppings: string[]
}

const initialPizza = {
    size: 'medium',
    dough: 'plain',
    toppings: ['cheese']
}

export function Order() {
    const [pizza, updatePizza] = useState<Pizza>(initialPizza)
    const navigate = useNavigate();

    const updateSize = (event: SelectChangeEvent) => updatePizza({
        ...pizza,
        size: event.target.value
    })

    const updateDough = (event: ChangeEvent<HTMLInputElement>) => updatePizza({
        ...pizza,
        dough: event.target.value
    })

    const checkTopping = (topping: string) => {
        return pizza.toppings.indexOf(topping) > -1
    }

    const updateToppings = (topping: string) => {
        if (checkTopping(topping)) {
            updatePizza({
                ...pizza,
                toppings: pizza.toppings.splice(
                    pizza.toppings.indexOf(topping),
                    1
                )
            })
        } else {
            updatePizza({
                ...pizza,
                toppings: [
                    ...pizza.toppings,
                    topping
                ]
            })
        }
    }

    return (
        <>
            <h2>What size of pizza would you like?</h2>
            <Select
                labelId="pizza-size-label"
                id="pizza-size-dropdown"
                value={pizza.size}
                label="Pizza Size"
                onChange={updateSize}
            >
                <MenuItem value={'small'}>Small</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'large'}>Large</MenuItem>
            </Select>

            <h2>Choose type of dough</h2>
            <RadioGroup
                aria-labelledby="pizza-dough-label"
                value={pizza.dough}
                name="pizza-dough-radio-group"
                onChange={updateDough}
            >
                <FormControlLabel value="plain" control={<Radio/>} label="Plain"/>
                <FormControlLabel value="multigrain" control={<Radio/>} label="Multigrain"/>
                <FormControlLabel value="gluten-free" control={<Radio/>} label="Gluten Free"/>
            </RadioGroup>

            <h2>Choose toppings</h2>
            <div>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('cheese')} onChange={() => updateToppings('cheese')}/>
                } label="Cheese (included)"/>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('pepperoni')} onChange={() => updateToppings('pepperoni')}/>
                } label="Pepperoni"/>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('peppers')} onChange={() => updateToppings('peppers')}/>
                } label="Green Peppers"/>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('onions')} onChange={() => updateToppings('onions')}/>
                } label="Onions"/>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('bacon')} onChange={() => updateToppings('bacon')}/>
                } label="Bacon"/>
                <FormControlLabel control={
                    <Checkbox checked={checkTopping('pineapples')} onChange={() => updateToppings('pineapples')}/>
                } label="Pineapples"/>
            </div>

            <Button variant="contained" onClick={() => navigate('/confirmation', {state: pizza})}>
                Order
            </Button>
        </>
    )
}
