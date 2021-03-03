import React from 'react';
import Clock from "./Clock";
import {Link} from "react-router-dom";

const Overlays = ({match}) => {
    const widget = match.params.widget
    const Header = () => {
        return (
            <div className="ui secondary pointing menu">
                <Link className="item" to={match.url}>Overlays</Link>
                <Link className="item" to={`${match.url}/clock`}>Clock</Link>
            </div>
        )
    }

    let toShow;

    if (widget) {
        switch (widget.toLowerCase()) {
            case 'clock':
                toShow = <Clock />
                break;
            default:
                break;
        }

    }

    return (
        <>
            <Header />
            {toShow}
        </>
    );
};

export default Overlays;

