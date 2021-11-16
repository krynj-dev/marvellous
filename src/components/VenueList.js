import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * This Component manages a list of venues in the Marvellous app. It reads the venue list
 * from an API call and creates list entries for each.
 * TODO: Also periodically pings the backend to get updates on venue status.
 */
class VenueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { "content-type": "application/json" },
        };
        fetch(API_URL+'/get-venues', requestOptions)
            .then(response => response.json())
            .then(data => this.setState( { data: data } ));
    }
    
    render() {
        return <ul>
            {this.get_venue_list_entries()}
        </ul>;
    }

    get_venue_list_entries() {
        if (this.state.data == null){
            return null;
        }

        return this.state.data.map((value, index) => 
            <li key={index}>{value.fields.venue_name}</li>
        );
    }
}

export default VenueList;