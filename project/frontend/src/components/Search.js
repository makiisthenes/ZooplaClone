/* Import React */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './css/search.css'
import SearchBox from './SearchBox';



function Search() {
    console.log("Rerender of Search component.")
    const location = useLocation();
    const navigate = useNavigate();
    const history = useParams();

    
    // Setting States for component.
    const [searchResults, setSearchResults] = useState({});

    // Parse filters from URL.
    const [filters, _] = useState(()=>{
        let filter = ""
        const Mprice =  new URLSearchParams(location.search).get('Mprice');
        const Wprice =  new URLSearchParams(location.search).get('Wprice');
        const Ptype =  new URLSearchParams(location.search).get('Ptype');
        const Clength =  new URLSearchParams(location.search).get('Clength');
        if (Mprice){
        filter +="&Mprice="+Mprice
        }
        if (Wprice){
            filter +="&Wprice="+Wprice
        }
        if (Ptype){
            filter +="&Ptype="+Ptype
        }
        if (Clength){
            filter +="&Clength="+Clength
        }
        return filter
    });

    // Parse search query from URL. 
    const [searchQuery, setsearchQuery] = useState(()=>{
        let query =  new URLSearchParams(location.search).get('query');
        if (query) {
            return query;
        }else{
            navigate("/error");
        }
    });



    // Same as componentDidMount.
    useEffect(() => { getData(searchQuery+filters) }, []);  // Only runs this code, if things in the dependecies array change., we have no dependecies.

    useEffect(() => { getData(searchQuery+filters) }, []); // On refresh, search query will be updated.

    // Same as componentDidUpdate.
    useEffect(() => {console.log("Filters have changed..")}, [filters]); // only runs this code if the filters state changes, which it hasnt..



    // Active CSS structuring.
    // Making height of figure equal to a percentage of the width of the figure.
    // This is to make the figure look like a reactangle, landscape.
    // Array.from(document.getElementsByClassName("result_listing_flex")).map((elem)=>{
    //     elem.style.height = elem.style.width *0.15;
    // })
    


    async function getData(query){
        console.log("Getting data for search query: ", query);
        // In charge of getting data when query has changed.
        const url = `http://localhost:3500/listing?query=${query}`;
        try {
            const response = await axios.get(url);
            let data = await response.data;
            if (data === undefined){
                throw Error("Data is undefined.");
            }
            setSearchResults(data);
        } catch (error) {
            console.log("Error trying to get the data for this search.");
            setSearchResults({})
        }
        
    }

    function applyFilter(e){

        e.preventDefault();
        // Get the form data.
        const form = e.target;
        const location = form.location.value;
        const Mprice = form.Mprice.value;
        const Wprice = form.Wprice.value;
        const type = form.type.value;
        const Clength = form.Clength.value;

        if(location === ''){
            alert('You need a search location');
            return;
        }
        let query = location;

        let filter = ""
        if (Mprice){
            filter +="&Mprice="+Mprice
        }
        if (Wprice){
            filter +="&Wprice="+Wprice
        }
        if (type){
            filter +="&Ptype="+type
        }
        if (Clength){
            filter +="&Clength="+Clength
        }
        navigate('/search?query=' + query+filter)
        setsearchQuery(query)
        getData(query+filter)


        // Check the e, for changed values, and then append them to search url and then send this to the server which will give us new data,
        // to update the state of component, and cause a rerender of webpage.

        // e.preventDefault();
        // let newFilters = {};
        // for (let i = 0; i < e.target.length; i++){
        //     if (e.target[i].value !== ""){
        //         newFilters[e.target[i].name] = e.target[i].value;
        //     }
        // }
        // setFilters(newFilters);
        // let newQuery = `?query=${searchQuery}`;
        

    }
    
    console.log("search results", searchResults, searchResults.length);
    try{
        if (searchResults.listings_no === 0){
            return(
                <>
                    <div id="search_main_content" className="mid_70_layout">
                        <FilterSection />

                        <h2 id="no_result"><i>No results found.</i></h2>
                    </div>
                </>
                )
        }else{
            return (
                <>
                    <div id="search_main_content" className="mid_70_layout">
                    <FilterSection />
                    <div id="result_no_section">
                        <span>{searchResults.listings_no} results</span>
                    </div>
                    <hr />
                    
                    {/* Add listing components. */}
                    {searchResults.listings.map((listing) => {
                        return (
                            <SearchBox 
                                listing_cover_image_url={listing.listing_cover_image_url}
                                monthly_price = {String(listing.monthly_price)}
                                weekly_price = {String(listing.weekly_price)}
                                listing_id = {String(listing.id)}
                                bathroom_no = {String(listing.bathroom_no)}
                                bedroom_no = {String(listing.bedroom_no)}
                                listing_title = {listing.listing_title}
                                listing_subtitle = {listing.listing_subtitle}
                                agent_tel = {listing.agent_tel}
                                agent_email = {listing.agent_email}
                            />
                        )
                    })}
                    </div>
                </>
                 );
        }
    }catch{
        return(
            <div id="search_main_content" className="mid_70_layout">
                <a href="/">Go back home</a>
                <h2 id="no_result">Server Error.</h2>
            </div>
        )
    }

    console.log("search results", searchResults, searchResults.length);

    
    function FilterSection(){
        return(
        <div id="filter_section">
                <form onSubmit={applyFilter}>
                    <div className="filter_section_item">
                        <label for="location">Search: </label>
                        <input type="text" id="search_input" placeholder="Enter postcode or place to search..."  defaultValue   ={searchQuery} name="location"/><br />
                    </div>
                    <div className="filter_section_item">
                        <label for="Mprice">Maximum Monthly Price: </label>
                        <input type="int" placeholder="£ max pm"  name="Mprice" type="number" autoComplete="off"/><br />
                    </div>
                    <div className="filter_section_item">
                        <label for="Wprice">Maximum Weekly Price: </label>
                        <input type="int" placeholder="£ max pw"  name="Wprice" type="number" autoComplete="off"/> <br />
                    </div>
                    <div className="filter_section_item">
                        <label for="type">Property Type: </label>
                        <select name="type">
                            <option value="">Any</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Studio">Studio</option>
                            <option value="Mansion">Mansion</option>
                            <option value="Villa">Villa</option>
                            <option value="Loft">Loft</option>
                            <option value="Land">Land</option>
                            <option value="Other">Other</option>
                        </select><br />
                    </div>

                    <div className="filter_section_item">
                        <label for="Clength">Maximum Contract Length (Months): </label>
                        <input type="int" placeholder="Max. Contract Length"  name="Clength" type="number" autoComplete="off"/> <br />
                    </div>

                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

// Using memo as higher order function to prevent re-rendering of the component.
function shouldComponentUpdate(prevProps, nextProps){
    if (prevProps.searchQuery !== nextProps.searchQuery){
        // When return true, component will not be re-rendered.
        // React documentation say that we should use memo to prevent re-rendering of the component. But still going to use any way.
        // Its used for performance optimization, i.e memosation mentioned in Algorithm and Data Structures.
        return true;
    }
    return false;
}



export default React.memo(Search, shouldComponentUpdate);