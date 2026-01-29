import React, { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';

function Home() {
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("-1");
    const [selectedState, setSelectedState] = useState("-1");
    const [selectedCity, setSelectedCity] = useState("-1");

    const getCountry = async () => {
        try {
            setState([]);
            setCity([]);
            setSelectedState("-1");
            setSelectedCity("-1");
            const resp = await fetch("https://location-selector.labs.crio.do/countries");
            if (!resp.ok) {
                throw new Error("Network Error");
            }
            const respData = await resp.json();
            setCountry(respData);
        }
        catch (error) {
            console.error("Error Fetching Country :", error);
        }
    }
    useEffect(() => {
        getCountry();
    }, []);
    const getState = async (country) => {
        try {
            setSelectedState("-1");
            setCity([]);
            setSelectedCity("-1");
            const resp = await fetch(`https://location-selector.labs.crio.do/country=${country}/states`);
            if (!resp.ok) {
                throw new Error("Network Error");
            }
            const respData = await resp.json();
            setState(respData);
        }
        catch (error) {
            console.error("Error Fetching Country :", error);
        }
    }
    const getCity = async (country, state) => {
        try {
            setSelectedCity("-1");
            const resp = await fetch(`https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`);
            if (!resp.ok) {
                throw new Error("Network Error");
            }
            const respData = await resp.json();
            setCity(respData);
        }
        catch (error) {
            console.error("Error Fetching Country :", error);
        }
    }
    return (
        <div><h2>Select Location</h2>
            <div style={{ display: 'flex', justifyContent: "center", gap: "20px" }}>
                <Dropdown data={country} initialValue={selectedCountry} setValue={setSelectedCountry}
                    type="Country" selectedCountry={selectedCountry} prevDropValue={selectedCountry}
                    bindNextDropdown={(value) => getState(value)} />

                <Dropdown data={state} initialValue={selectedState} setValue={setSelectedState}
                    type="State" selectedCountry={selectedCountry} prevDropValue={selectedCountry}
                    bindNextDropdown={(value1, value2) => getCity(value1, value2)} />

                <Dropdown data={city} initialValue={selectedCity} setValue={setSelectedCity}
                    type="City" selectedCountry={selectedCountry} prevDropValue={selectedState} />
            </div>
            {selectedCountry !== "-1" && selectedState !== "-1" && selectedCity !== "-1" &&
            <h3>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3>}
        </div>)

}

export default Home