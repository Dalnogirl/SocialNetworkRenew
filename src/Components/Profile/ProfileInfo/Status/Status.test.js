import React from 'react';

import ReactDOM, {render} from 'react-dom'
import SocialNetworkApp from "./Components/App/App";
import Status from "./Status";
import {act} from "react-dom/test-utils";

it('renders without crashing', () => {
    const div = document.createElement("div")
    ReactDOM.render(<Status/>, div)
    it('texst', () => {
        act(() => {
            render()
        })
    })
    ReactDOM.unmountComponentAtNode(div)
});
