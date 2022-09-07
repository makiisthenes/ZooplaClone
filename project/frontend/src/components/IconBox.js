import {memo} from 'react';

function IconBox(props) {
    const { icon, alt_title, title} = props;
    return ( 
        <div className="listing_full_props_key_subtable_flex_item">
            <span>
                <img src={icon} alt={alt_title} />
                {title}
            </span>
        </div>

     );
}

export default memo(IconBox);