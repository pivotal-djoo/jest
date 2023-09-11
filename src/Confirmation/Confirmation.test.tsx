import {describe, it} from "@jest/globals";
import {render} from "@testing-library/react";
import React from "react";
import {Confirmation} from "./Confirmation";

describe('confirmation page', () => {
    it('should show what kind of pizza was ordered', async () => {
        render(<Confirmation />)


        // TODO1: check for contents of this page using react testing library
        // TODO2: set state for this component to specify the order
        // TODO3: replace UI with MUI components, and update the tests to use -ByRole queries
    })
})
