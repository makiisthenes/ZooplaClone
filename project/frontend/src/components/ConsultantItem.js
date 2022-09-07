import axios from 'axios';

function ConsultantItem(props) {


    async function remove_consultant(e){
        e.preventDefault();
        let confirm = window.confirm("Are you sure you want to remove this consultant?");
        if (confirm){
            let id = props.id;
            let url = "http://localhost:3500/delcon?id="+id;
            const response = await axios.get(url);
            let result = await response.data;
            if (result.errors){
                alert("Server Error: " + response.data.error);
            }
            else{
                if (result.success === true){
                    props.remove_consultant(props.id);
                    alert("Consultant has been removed.");
                }else{
                    if (result.success === false){
                        alert("Consultant could not be removed.");
                        // put red border around element with the class "consultant_result_item_flex" for 3 seconds
                        document.getElementById("consultant_box"+props.id).style.borderColor = 'red';
                        setTimeout(function(){
                            document.getElementById("consultant_box"+props.id).style.borderColor = '';
                        }
                        , 3000);
                    }
                }
            }
        }
    }


    return ( 
            <div className="consultant_result_item">
                <div id={"consultant_box"+props.id}className="consultant_result_item_flex">
                    <div className="consultant_result_item_flex_left">
                        <h4>Name: {props.name}</h4>
                        <p>ID: {props.id}</p>
                    </div>
                    <div className="consultant_result_item_flex_right">
                        <button className="grey_btn whitefg" onClick={remove_consultant}>Remove Consultant</button>
                    </div>
                </div>
            </div>
     );
}

export default ConsultantItem;
