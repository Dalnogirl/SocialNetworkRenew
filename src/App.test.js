import React from 'react';
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import SocialNetworkApp from "./Components/App/App";

it('renders without crashing', () => {
    const div = document.createElement("div")
    ReactDOM.render(<SocialNetworkApp />, div)
    ReactDOM.unmountComponentAtNode(div)
});
